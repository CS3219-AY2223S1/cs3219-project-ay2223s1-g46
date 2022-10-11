import { checkQuestionExists, createQuestion, getAllQuestions } from "./repository.js";



export async function ormCreateQuestion(name, text, difficulty, topic) {
  try {
      const newQuestion = await createQuestion({name, text, difficulty, topic});
      newQuestion.save();
      return true;
  } catch (err) {
      console.log('ERROR: Could not create new question');
      return { err };
  }
}

export async function ormGetAllQuestions(){
  try {
      const questions = await getAllQuestions();
      return { questions };
  } catch (err) {
      console.log('ERROR: Could not get all questions');
      return { err };
  }
}

export async function ormCheckQuestionExist(name){
  try {
      const existState = await checkQuestionExists(name);
      return { existState }
  } catch (err) {
      console.log('ERROR: Could not check for question exists');
      return { err };
  }
}