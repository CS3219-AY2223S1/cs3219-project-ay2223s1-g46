import axios from "axios"
import { getToken } from "../utils/getToken.js"

const HISTORY_URL = "http://localhost:8003/history-service/history"

export async function postHistory(history) {
    const cookie = await getToken()
    const res = await axios
      .post(HISTORY_URL, history, 
        {headers: {
            Cookie: `token=${cookie};`
        }})
    if (res && res.status === 201) {
      return
    } else {
        throw new Error("Failed to post history") //TODO: Add more elegant handling
    }
}