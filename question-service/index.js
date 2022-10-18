import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { authorization } from './utils/middleware.js'
import {
  createQuestion,
  getAllQuestions,
  getRandomGroupedQuestion,
} from './controller/question-controller.js'

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors()) // config cors so that front-end can use
app.options('*', cors())
app.use(cookieParser())

const questionRouter = express.Router()

// Controller will contain all the User-defined Routes
questionRouter.get('/', authorization, getAllQuestions)
questionRouter.get('/randomGrouped', authorization, getRandomGroupedQuestion)

questionRouter.post('/', authorization, createQuestion)
app.use('/question-service/question', questionRouter).all((_, res) => {
  res.setHeader('content-type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
})

app.listen(8001, () => console.log('question-service listening on port 8001'))
