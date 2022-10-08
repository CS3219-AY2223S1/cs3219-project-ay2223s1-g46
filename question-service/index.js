import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { authorization } from './utils/middleware.js';

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors()) // config cors so that front-end can use
app.options('*', cors())
app.use(cookieParser());


const questionRouter = express.Router()


// Controller will contain all the User-defined Routes
questionRouter.get('/', authorization, (req, res) => {
    return res.json({user: {username: req.username, role: req.role}});
});
// questionRouter.get('/', authorization)
app.use('/', questionRouter).all((_, res) => {
    res.setHeader('content-type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')
})



// userRouter.post('/', createUser)
// // need to check if works
// userRouter.put('/password', authorization, updatePassword)
// userRouter.delete('/delete', authorization, deleteUser)

app.listen(8001, () => console.log('question-service listening on port 8001'));