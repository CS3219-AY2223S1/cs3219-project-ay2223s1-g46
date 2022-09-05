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
    socket.on("match", (username) => {
        console.log("Creating for: " + username)
        var result = ormCreatePendingMatch(username)
        console.log(result)
    });
});


httpServer.listen(8001);
