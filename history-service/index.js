import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { authorization, adminAuthorization } from './utils/middleware.js'

import {
  createHistory,
  getUserHistory
} from './controller/history-controller.js'

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors()) // config cors so that front-end can use
app.options('*', cors())
app.use(cookieParser())

const historyRouter = express.Router()

// Controller will contain all the User-defined Routes
historyRouter.get('/', authorization, getUserHistory)
historyRouter.post('/', adminAuthorization, createHistory)

app.use('/history-service/history', historyRouter).all((_, res) => {
  res.setHeader('content-type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
})

app.listen(8003, () => console.log('history-service listening on port 8003'))
