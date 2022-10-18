import {
  ormCreateQuestion as _createQuestion,
  ormCheckQuestionExist as _checkQuestionExists,
  ormGetAllQuestions as _getAllQuestions,
  ormGetGroupedQuestions as _getGroupedQuestions,
} from '../model/question-orm.js'
import topics from '../utils/topic.js'
import difficultyList from '../utils/difficulty.js'

export async function getAllQuestions(req, res) {
  try {
    const resp = await _getAllQuestions()

    if (resp.err) {
      return res
        .status(400)
        .json({ message: 'Could not create a new question!' })
    } else {
      console.log(`Got all questions successfully!`)
      return res.json({ questions: resp.questions })
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Database failure when getting questions!' })
  }
}

export async function createQuestion(req, res) {
  try {
    const { name, text, topic, difficulty } = req.body
    if (name && text && topic && difficulty) {
      let existState = (await _checkQuestionExists(name)).existState
      if (existState === true) {
        return res
          .status(409)
          .json({ message: 'This question name is already in use!' })
      }

      if (!(topic in topics)) {
        return res.status(401).json({
          title: 'Invalid topic',
          message: 'This topic does not exist!',
        })
      }

      if (!(difficulty in difficultyList)) {
        return res.status(401).json({
          title: 'Invalid difficulty',
          message: 'This difficulty does not exist!',
        })
      }

      let resp = await _createQuestion(name, text, difficulty, topic)
      if (resp.err) {
        return res
          .status(400)
          .json({ message: 'Could not create a new question!' })
      } else {
        console.log(`Created new question successfully!`)
        return res
          .status(201)
          .json({ message: `Created new question ${name} successfully!` })
      }
    } else {
      return res
        .status(400)
        .json({ message: 'There are empty fields when creating a question!' })
    }
  } catch (err) {
    console.log(err)
    return res
      .status(500)
      .json({ message: 'Database failure when creating new question!' })
  }
}

export async function getRandomGroupedQuestion(req, res) {
  try {
    const { topic, difficulty } = req.body

    if (topic && difficulty) {

      if (!(topic in topics)) {
        return res.status(401).json({
          title: 'Invalid topic',
          message: 'This topic does not exist!',
        })
      }

      if (!(difficulty in difficultyList)) {
        return res.status(401).json({
          title: 'Invalid difficulty',
          message: 'This difficulty does not exist!',
        })
      }

      let resp = await _getGroupedQuestions(difficulty, topic)
      if (resp.err) {
        return res
          .status(400)
          .json({ message: 'Could not get grouped questions!' })
      } else {
        // choose a random question out of the returned
        const questions = resp.questions
        // console.log(questions)
        if (questions.length == 0) {
          return res
          .status(400)
          .json({ message: 'No questions of this topic and difficulty!' })
        }
        const chosenQuestion = questions[Math.floor(Math.random()*questions.length)]
        console.log(`Chose a random question successfully!`)
        return res.json({ chosenQuestion: chosenQuestion })
      }
    } else {
      return res
      .status(400)
      .json({ message: 'Topic or difficulty is missing from the request body!' })
    }
  } catch (err) {
    console.log(err)
    return res
      .status(500)
      .json({ message: 'Database failure when getting grouped questions!' })
  }
}
