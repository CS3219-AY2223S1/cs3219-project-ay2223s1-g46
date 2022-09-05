import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from "socket.io";
import { ormCreatePendingMatch } from "./model/pendingMatch-orm.js"

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
    socket.on("match", async (username) => {
        console.log("Creating for: " + username)
        try {
            await ormCreatePendingMatch(username)
            socket.removeAllListeners("match");
            console.log("Match in progress")
            socket.emit("match_result", "Match in progress"); //TODO: Figure out why emit doesn't work
        } catch (err) { //Catch block doesn't actually work. //TODO: Test this by submitting 2 names at the same time
            console.error(err);
            socket.emit("match_result", "Fail, try again"); //TODO: Figure out why emit doesn't work
        }
    });
});


httpServer.listen(8001);
