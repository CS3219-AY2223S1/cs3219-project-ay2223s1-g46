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
import { createUser, deleteUser, logoutUser, updatePassword, loginUser } from './controller/user-controller.js';

const userRouter = express.Router()

// Controller will contain all the User-defined Routes
userRouter.get('/', (_, res) => res.send('Hello World from user-service'))
userRouter.post('/', createUser)
// need to check if works
userRouter.put('/password', authorization, updatePassword)
userRouter.delete('/delete', authorization, deleteUser)

app.use('/api/user', userRouter).all((_, res) => {
    res.setHeader('content-type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')
})

const loginRouter = express.Router()
loginRouter.post('/', loginUser)
app.use('/api/login', loginRouter).all((_, res) => {
    res.setHeader('content-type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')
})

const logoutRouter = express.Router()
logoutRouter.get('/', authorization, logoutUser)
app.use('/api/logout', logoutRouter).all((_, res) => {
    res.setHeader('content-type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')
})

// for testing authorization
const protectedRouter = express.Router()
protectedRouter.get('/', authorization, (req, res) => {
    return res.json({user: {username: req.username}});
});
app.use('/api/protected', protectedRouter).all((_, res) => {
    res.setHeader('content-type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')
})




app.listen(8000, () => console.log('user-service listening on port 8000'));