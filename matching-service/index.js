import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from "socket.io";
import { ormCreatePendingMatch, ormAtomicFindFirstPendingMatchAndDelete, ormRegisterAddListener } from "./model/pendingMatch-orm.js"

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

const io = new Server(httpServer, { /* options */ });
io.on("connection", (socket) => {
    console.log("Logging socket connection")
    socket.on("match", async (username, difficulty) => {
        console.log("Creating for: " + username + "; Difficulty: " + difficulty)
        var avaliableMatch = await ormAtomicFindFirstPendingMatchAndDelete(
            { difficulty: {$eq: difficulty} } //explict $eq to prevent injection attack
        );
        console.log(avaliableMatch)
        if (avaliableMatch) {
            //TODO: Create room and message other socket
            //TODO: Make sure other socket acks
        } else {//Match not found
            try {
                await ormCreatePendingMatch(username, socket.id, difficulty)
                socket.removeAllListeners("match");
                console.log("Match in progress")
                socket.emit("match_result", "Match in progress");
                //TODO: Add timer to expire and take back database record
            } catch (err) { //Catch block doesn't actually work. //TODO: Test this by submitting 2 names at the same time
                console.error(err);
                socket.emit("match_result", "Fail, try again");
            }
        }
    });
});

/*
//TODO: Get back to this in a future refactoring, to prevent race condition.
//Either get this on a listener, or a repeated timer of about 10s. 
//Race condition in question is "write skew", needs "SERIALIZABLE ISOLATION" to prevent
//  See: https://www.cockroachlabs.com/blog/what-write-skew-looks-like/

//TODO: Add listener to, on finding potential match, messages the socket that can be matched
ormRegisterAddListener(change => { //This requires replica sets? //TODO: Fix this
    if (change.operationType = "create") {//TODO: check if this condition is correct
        //TODO: Add function to find first pair, based on who got added
    }
})

*/

httpServer.listen(8001);
console.log("Startup complete")