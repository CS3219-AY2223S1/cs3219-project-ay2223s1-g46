import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from "socket.io";
import { ormCreatePendingMatch, ormClaimFirstMatchByDifficulty, ormFlushPendingMatchById } from "./model/pendingMatch-orm.js"
import { v4 as uuidv4 } from 'uuid';

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors()) // config cors so that front-end can use
app.options('*', cors())

app.get('/', (req, res) => {
    res.send('Hello World from matching-service');
    console.log("Hello world")
});

const httpServer = createServer(app)

//TODO: Refactor architecture. See the following:
// https://socket.io/docs/v4/server-application-structure/
// https://aleemisiaka.com/blog/socketio-app-structure/
const io = new Server(httpServer, { /* options */ });
io.on("connection", (socket) => {
    console.log("Logging socket connection")
    const abortPendingMatch = async () => {
        var existing_match = await ormFlushPendingMatchById(socket.id);
        if (existing_match) {
            clearTimeout(existing_match.timeout_id);
        }
        //Prune leaveRoomCallback created in the 'match' listener
        socket.removeAllListeners("disconnecting");
        socket.removeAllListeners("leave_room");
    }
    socket.on("abort_match", abortPendingMatch);
    socket.on("match", async (username, difficulty) => {
        for (const room of socket.rooms) {
            if (room !== socket.id) {
                console.log("Match request receive while already in room from socket " + socket.id)
                return; //Already in room, ignore
            }
        }
        await abortPendingMatch();
        const leaveRoomCallback = () => {
            for (const room of socket.rooms) {
                if (room !== socket.id) {
                    socket.to(room).emit("user_leaves", username);
                    socket.leave(room);
                    //Future proof for rooms with more than 2 people
                    const room_contents = io.sockets.adapter.rooms.get(room);
                    const room_occupancy = room_contents.size;
                    if (room_occupancy < 2) { 
                        const lonely_socket_id = room_contents.values().next().value;
                        const lonely_socket = io.sockets.sockets.get(lonely_socket_id);
                        lonely_socket.leave(room);
                        lonely_socket.emit("room_info", "Room has been torn down")
                    }
                }
            }
        };
        socket.on("disconnecting", (_) => {leaveRoomCallback();});
        socket.once("leave_room", leaveRoomCallback);
        
        console.log("Creating for: " + username + "; Difficulty: " + difficulty)
        var avaliableMatch = await ormClaimFirstMatchByDifficulty(difficulty)
        if (avaliableMatch) { 
            clearTimeout(avaliableMatch.timeout_id);
            
            const otherSocket = io.sockets.sockets.get(avaliableMatch.socket_id); // TODO: Detect if socket has already disconnected
            const room_id = uuidv4();
            
            //Handle other socket
            otherSocket.join(room_id); 
            socket.to(room_id).emit("matchSuccess","Found"); //TODO: Require ack, change eventName to match_result
            otherSocket.on("message", 
                (msg) => otherSocket.to(room_id).emit("message", msg)
            )
            socket.to(room_id).emit("match_user", username);

            //Handle this socket
            socket.join(room_id);
            socket.emit("matchSuccess","Found"); //TODO: Require ack, change eventName to match_result
            socket.on("message", 
                (msg) => socket.to(room_id).emit("message", msg)
            )
            socket.emit("match_user", avaliableMatch.username);
        } else {//Match not found
            try {
                //Note: timeout_id doesn't work across worker threads
                const timeout_id = +setTimeout(async () => {//Note: we have the plus to force conversion to number
                        await ormFlushPendingMatchById(socket.id);
                        socket.emit("match_result", "Timeout, try again");
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
    });
    socket.on("disconnect", async (_) => {await ormFlushPendingMatchById(socket.id);});
});

/*
//TODO: Get back to this in a future refactoring, to prevent race condition.
//Either get this on a listener, or a repeated timer of about 10s. 
//Race condition in question is "write skew", needs "SERIALIZABLE ISOLATION" to prevent
//  See: https://www.cockroachlabs.com/blog/what-write-skew-looks-like/

//TODO: Add repeatingTimer to check database for dangling pairs of pendingMatches with matching difficulty
*/

httpServer.listen(8001);
console.log("Startup complete")