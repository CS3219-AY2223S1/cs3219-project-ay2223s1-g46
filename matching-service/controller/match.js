import { ormCreatePendingMatch, ormClaimFirstMatch, ormFlushPendingMatchById } from "./../model/pendingMatch-orm.js";
import { v4 as uuidv4 } from 'uuid';
import { addLeaveRoomCallback } from "./leaveRoomController.js";
import { abortPendingMatchFactory } from './abortPendingMatch.js';
import { getQuestion } from '../model/question-orm.js';
import { appendChatHistory, writeCodeHistory, startHistory } from '../model/matchHistory-orm.js'


async function processMatchFound(io, socket, username, difficulty, topic, avaliableMatch) {
    clearTimeout(avaliableMatch.timeout_id);
        
    const otherSocket = io.sockets.sockets.get(avaliableMatch.socket_id); // TODO: Detect if socket has already disconnected
    const room_id = uuidv4();
    const questionPromise = getQuestion(topic, difficulty);
    
    function processHalfSocket(firstSocket, firstUsername, secondSocket, secondUsername) {
        firstSocket.join(room_id); 
        addLeaveRoomCallback(io, firstSocket, firstUsername)
        secondSocket.to(room_id).emit("matchSuccess","Found"); //TODO: Require ack, change eventName to match_result
        
        //Chat service
        firstSocket.on('message', async ({ name, message }) => {
            console.log("Message sent")
            io.to(room_id).emit('message', { name, message })
            const message_log = name + " : " + message //TODO: Check if this is fine, with team members
            await appendChatHistory(room_id, message_log)
        })
    
        //Colab service
        firstSocket.on('code', async (code) => {
            console.log("Code changed")
            secondSocket.emit('code', { code })
            await writeCodeHistory(room_id, code)
        })

        firstSocket.emit("match_user", secondUsername);
    }
    const question = await questionPromise; //TODO: Also return id

    startHistory(room_id, username, avaliableMatch.username, question)
    
    //Handle other socket
    processHalfSocket(otherSocket, avaliableMatch.username, socket, username)

    //Handle this socket
    processHalfSocket(socket, username, otherSocket, avaliableMatch.username)

    io.emit('question', question)
}

async function createPendingMatchWithTimeout(io, socket, username, difficulty, topic) {
    try {
        //Note: timeout_id doesn't work across worker threads
        const timeout_id = +setTimeout(async () => {//Note: we have the plus to force conversion to number
                await ormFlushPendingMatchById(socket.id);
                socket.emit("matchFail", "Timeout, try again");
                console.log("Timeout on socket " + socket.id)
            }, 1000 * 30);
        await ormCreatePendingMatch(username, socket.id, difficulty, topic, timeout_id)
        console.log("Match in progress")
        socket.emit("match_result", "Match in progress");
    } catch (err) { //Catch block doesn't actually work. //TODO: Test this by submitting 2 names at the same time
        console.error(err);
        socket.emit("match_result", "Fail, try again");
    }
}

export function attemptMatchFactory (io, socket) {
    return async (username, difficulty, topic) => {
        for (const room of socket.rooms) {
            if (room !== socket.id) {
                console.log("Match request receive while already in room from socket " + socket.id)
                return; //Already in room, ignore
            }
        }
        const abortPendingMatch = abortPendingMatchFactory(socket);
        await abortPendingMatch();
        
        console.log(`Creating for: ${username}; Difficulty: ${difficulty}, Topic: ${topic}`)
    
        var avaliableMatch = await ormClaimFirstMatch(difficulty, topic)
        if (avaliableMatch) { 
            await processMatchFound(io, socket, username, difficulty, topic, avaliableMatch);
        } else {//Match not found immediately
            await createPendingMatchWithTimeout(io, socket, username, difficulty, topic);
        }
    }
};