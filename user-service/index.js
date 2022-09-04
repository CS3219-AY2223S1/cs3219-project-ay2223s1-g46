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
import { createUser, logoutUser } from './controller/user-controller.js';
import { loginUser } from './controller/user-controller.js';

const router = express.Router()

// Controller will contain all the User-defined Routes
router.get('/', (_, res) => res.send('Hello World from user-service'))
router.post('/', createUser)

app.use('/api/user', router).all((_, res) => {
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