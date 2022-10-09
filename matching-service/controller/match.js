import { ormCreatePendingMatch, ormClaimFirstMatchByDifficulty, ormFlushPendingMatchById } from "./../model/pendingMatch-orm.js";
import { v4 as uuidv4 } from 'uuid';
import { addLeaveRoomCallback } from "./leaveRoomController.js";
import { abortPendingMatchFactory } from './abortPendingMatch.js';

function processMatchFound (io, socket, username, difficulty, avaliableMatch) {
    clearTimeout(avaliableMatch.timeout_id);
        
    const otherSocket = io.sockets.sockets.get(avaliableMatch.socket_id); // TODO: Detect if socket has already disconnected
    const room_id = uuidv4();
    
    //Handle other socket
    otherSocket.join(room_id); 
    addLeaveRoomCallback(io, otherSocket, avaliableMatch.username)
    socket.to(room_id).emit("matchSuccess","Found"); //TODO: Require ack, change eventName to match_result
    otherSocket.on("message", 
        (msg) => otherSocket.to(room_id).emit("message", msg)
    )
    socket.to(room_id).emit("match_user", username);

    //Handle this socket
    socket.join(room_id);
    addLeaveRoomCallback(io, socket, username)
    socket.emit("matchSuccess","Found"); //TODO: Require ack, change eventName to match_result
    socket.on("message", 
        (msg) => socket.to(room_id).emit("message", msg)
    )
    socket.emit("match_user", avaliableMatch.username);
}

async function createPendingMatchWithTimeout(io, socket, username, difficulty) {
    try {
        //Note: timeout_id doesn't work across worker threads
        const timeout_id = +setTimeout(async () => {//Note: we have the plus to force conversion to number
                await ormFlushPendingMatchById(socket.id);
                socket.emit("matchFail", "Timeout, try again");
                console.log("Timeout on socket " + socket.id)
            }, 1000 * 30);
        await ormCreatePendingMatch(username, socket.id, difficulty, timeout_id)
        console.log("Match in progress")
        socket.emit("match_result", "Match in progress");
    } catch (err) { //Catch block doesn't actually work. //TODO: Test this by submitting 2 names at the same time
        console.error(err);
        socket.emit("match_result", "Fail, try again");
    }
}

export function attemptMatchFactory (io, socket) {
    return async (username, difficulty) => {
        for (const room of socket.rooms) {
            if (room !== socket.id) {
                console.log("Match request receive while already in room from socket " + socket.id)
                return; //Already in room, ignore
            }
        }
        const abortPendingMatch = abortPendingMatchFactory(socket);
        await abortPendingMatch();
        
        console.log("Creating for: " + username + "; Difficulty: " + difficulty)
    
        var avaliableMatch = await ormClaimFirstMatchByDifficulty(difficulty)
        if (avaliableMatch) { 
            processMatchFound(io, socket, username, difficulty, avaliableMatch);
        } else {//Match not found immediately
            createPendingMatchWithTimeout(io, socket, username, difficulty);
        }
    }
};