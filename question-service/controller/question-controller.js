import {
  ormCreateQuestion as _createQuestion,
  ormCheckQuestionExist as _checkQuestionExists,
  ormGetAllQuestions as _getAllQuestions
} from '../model/question-orm.js'
import topics from '../utils/topic.js'
import difficultyList from '../utils/difficulty.js'


export async function getAllQuestions(req, res) {
  try {
    const resp = await _getAllQuestions();

    if (resp.err) {
      return res.status(400).json({ message: 'Could not create a new question!' })
    } else {
      console.log(`Got all questions successfully!`)
      return res.json({ questions: resp.questions})
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

      let resp = await _createQuestion(name, text, topic, difficulty);
      if (resp.err) {
        return res.status(400).json({ message: 'Could not create a new question!' })
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