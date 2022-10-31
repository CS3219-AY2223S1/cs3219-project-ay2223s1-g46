import axios from "axios"

const HISTORY_URL = "http://localhost:8003/history-service/history"

export async function postHistory(history) {
    const res = await axios
      .post(HISTORY_URL, history)
    if (res && res.status === 201) {
      return
    } else {
        throw new Error("Failed to post history") //TODO: Add more elegant handling
    }
}