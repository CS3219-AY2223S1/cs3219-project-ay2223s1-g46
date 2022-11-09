import jwt from 'jsonwebtoken'
import 'dotenv/config'
import axios from 'axios'

// verify if role is Admin or Teacher
export async function authorization(req, res, next) {
  const token = req.cookies.token
  const verifyURL = 'http://localhost:8000/user-service/verify'

  if (!token) {
    return res.status(403).json({ message: 'No cookie found!' })
  }
  try {
    // if the user has a cookie with jsonwebtoken varify the cookie using verify with user service
    // maybe jsut send token string to verify to check again
    const tokenObject = {
      token: token,
    }
    const resp = await axios.post(verifyURL, tokenObject)
    const data = resp.data.user
    console.log(data)
    req.username = data.username
    if (data.role === 'Admin' || data.role === 'Teacher') {
      req.role = data.role
    } else {
      return res
        .status(401)
        .json({
          message: 'You are not allowed to access the question service!',
        })
    }
    return next()
  } catch (err) {
    console.log(err.response.data.message)
    return res.status(403).json({ message: 'Error with cookie found!' })
  }
}
