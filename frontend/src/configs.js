// const URI_USER_SVC = process.env.URI_USER_SVC || "http://localhost:8000"
const URI_USER_SVC = process.env.URI_USER_SVC || "" // bc using proxy
const URI_QUESTION_SVC = process.env.URI_QUESTION_SVC || ""
const URI_HISTORY_SVC = process.env.URI_HISTORY_SVC || ""

const PREFIX_USER_SVC = "/user-service/user"
const PREFIX_LOGIN_SVC = "/user-service/login"
const PREFIX_DELETE_SVC = "/user-service/user/delete"
const PREFIX_CHANGE_PW_SVC = "/user-service/user/password"
const PREFIX_LOGOUT_SVC = "/user-service/logout"
const PREFIX_QUESTION_SVC = "/question-service/question"
const PREFIX_HISTORY_SVC = "/history-service/history"

export const URL_USER_SVC = URI_USER_SVC + PREFIX_USER_SVC
export const URL_LOGIN_SVC = URI_USER_SVC + PREFIX_LOGIN_SVC
export const URL_DELETE_SVC = URI_USER_SVC + PREFIX_DELETE_SVC
export const URL_CHANGE_PW_SVC = URI_USER_SVC + PREFIX_CHANGE_PW_SVC
export const URL_LOGOUT_SVC = URI_USER_SVC + PREFIX_LOGOUT_SVC
export const URL_QUESTION_SVC = URI_QUESTION_SVC + PREFIX_QUESTION_SVC
export const URL_HISTORY_SVC = URI_HISTORY_SVC + PREFIX_HISTORY_SVC
