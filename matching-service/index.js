import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from "socket.io";
import { ormFlushPendingMatchById } from "./model/pendingMatch-orm.js"
import { abortPendingMatchFactory } from './controller/abortPendingMatch.js';
import { attemptMatchFactory } from './controller/match.js';

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
    socket.on("abort_match", abortPendingMatchFactory(socket));
    socket.on("match", attemptMatchFactory(io, socket));
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