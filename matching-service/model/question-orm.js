import axios from "axios"
import { getToken } from "../utils/getToken.js"

const QUESTION_URL = "http://localhost:8001/question-service/question/randomGrouped"

export async function getQuestion(topic, difficulty) {
    const cookie = await getToken()
    const res = await axios.get(
        QUESTION_URL, 
        {headers: {
            Cookie: `token=${cookie};`
        },
        data: {topic, difficulty}
    });
    return res.data.chosenQuestion
}