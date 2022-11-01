import { LRANGE, RPUSH, GET, SET, DEL } from './redis.js';

function getChatHistoryKey(room_id) {
    return room_id + "_chatHistory"
}

function getCodeHistoryKey(room_id) {
    return room_id + "_codeHistory"
}

function getUsersKey(room_id) {
    return room_id + "_users"
}

function getQuestionKey(room_id) {
    return room_id + "_questions"
}

export async function getAndDeleteMatchHistory(room_id) {
    const chat_key = getChatHistoryKey(room_id)
    const chat_history = (await LRANGE(chat_key, 0, -1)) ?? []
    await DEL(chat_key)
    
    const code_key = getCodeHistoryKey(room_id)
    const code_history = (await GET(code_key)) ?? ""
    await DEL(code_key)

    const question_key = getQuestionKey(room_id)
    const question_history = await GET(question_key)
    await DEL(question_key)

    const users_key = getUsersKey(room_id)
    const [userA, userB] = await LRANGE(users_key, 0, -1)
    await DEL(users_key)
    
    if (!question_history) {
        throw new Error("Question history is missing")
    }
    if (!userA) {
        throw new Error("Both users are missing")
    }
    if (!userB) {
        throw new Error(`Only user '${userA}' is present`)
    }

    return {
        "username" : userA,
        "partnerUsername" : userB,
        "question" : question_history,
        "chatHistory" : JSON.stringify(chat_history), 
        "codeHistory" : code_history
    }
}

export async function appendChatHistory(room_id, new_chat) {
    const chat_key = getChatHistoryKey(room_id)
    await RPUSH(chat_key, new_chat)
}

export async function writeCodeHistory(room_id, code) {
    const code_key = getCodeHistoryKey(room_id)
    await SET(code_key, code);
}

export async function startHistory(room_id, userA, userB, question) {
    const users_key = getUsersKey(room_id)
    await RPUSH(users_key, userA)
    await RPUSH(users_key, userB)

    const question_key = getQuestionKey(room_id)
    await SET(question_key, question)
}