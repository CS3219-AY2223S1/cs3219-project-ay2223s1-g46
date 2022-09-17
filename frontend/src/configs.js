// const URI_USER_SVC = process.env.URI_USER_SVC || "http://localhost:8000"
const URI_USER_SVC = process.env.URI_USER_SVC || "" // bc using proxy

const PREFIX_USER_SVC = "/api/user"
const PREFIX_LOGIN_SVC = "/api/login"
const PREFIX_DELETE_SVC = "/api/user/delete"
const PREFIX_CHANGE_PW_SVC = "/api/user/password"
const PREFIX_LOGOUT_SVC = "/api/logout"

export const URL_USER_SVC = URI_USER_SVC + PREFIX_USER_SVC
export const URL_LOGIN_SVC = URI_USER_SVC + PREFIX_LOGIN_SVC
export const URL_DELETE_SVC = URI_USER_SVC + PREFIX_DELETE_SVC
export const URL_CHANGE_PW_SVC = URI_USER_SVC + PREFIX_CHANGE_PW_SVC
export const URL_LOGOUT_SVC = URI_USER_SVC + PREFIX_LOGOUT_SVC
