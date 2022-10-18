import axios from "axios"

//TODO: Create and use dedicated credentials
const MATCHING_USER     = "hazel-admin"
const MATCHING_PASSWORD = "hazel-admin"
const URL_LOGIN_SVC = "http://localhost:8000/user-service/login"
const STATUS_CODE_SUCCESS = 200

//TODO: Add caching
export async function getToken() {
    const res = await axios
        .post(URL_LOGIN_SVC, { "username" : MATCHING_USER, "password" : MATCHING_PASSWORD })
        .catch((err) => {/*console.log("err.response :>> ", err.response)*/})
    if (res && res.status === STATUS_CODE_SUCCESS) {
        //TODO: See if this cookie is already set in some variable somewhere or if I need to explictly include it later
        const cookie = res.data.token
        return cookie
    }
    else {
        throw new Error('Could not get cookie'); //TODO: Be more graceful with error handling
    }
}