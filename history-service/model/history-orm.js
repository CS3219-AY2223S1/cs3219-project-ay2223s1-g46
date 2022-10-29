import { createHistory, getUserHistory } from "./repository.js";


export async function ormCreateHistory(username,partnerUsername, question, chatHistory, codeHistory, finishDate) {
  try {
      const newHistory = await createHistory({username,partnerUsername, question, chatHistory, codeHistory, finishDate});
      newHistory.save();
      return true;
  } catch (err) {
      console.log('ERROR: Could not create new history');
      return { err };
  }
}

export async function ormGetUserHistory(username){
  try {
      const userHistory = await getUserHistory({username});
      return { userHistory };
  } catch (err) {
      console.log('ERROR: Could not get all history');
      console.log(err)
      return { err };
  }
}