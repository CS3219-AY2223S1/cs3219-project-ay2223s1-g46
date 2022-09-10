// const URI_USER_SVC = process.env.URI_USER_SVC || "http://localhost:8000"
const URI_USER_SVC = process.env.URI_USER_SVC || "" // bc using proxy

const PREFIX_USER_SVC = "/api/user"
const PREFIX_LOGIN_SVC = "/api/login"

export const URL_USER_SVC = URI_USER_SVC + PREFIX_USER_SVC
export const URL_LOGIN_SVC = URI_USER_SVC + PREFIX_LOGIN_SVC
