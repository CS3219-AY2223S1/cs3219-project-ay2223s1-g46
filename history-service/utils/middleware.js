import 'dotenv/config'
import axios from 'axios'

// verify if user is valid
export async function authorization(req, res, next) {
  const token = req.cookies.token
  const verifyURL = 'http://localhost:8000/user-service/verify'

  if (!token) {
    return res.status(403).json({ message: 'No cookie found!' })
  }
  try {
    const tokenObject = {
      token: token,
    }
    const resp = await axios.post(verifyURL, tokenObject)
    const data = resp.data.user
    req.username = data.username
    return next();
  } catch (err) {
    console.log(err.response.data.message)
    return res.status(403).json({ message: 'Error with cookie found!' })
  }
}
