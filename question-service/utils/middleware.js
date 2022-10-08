import jwt from 'jsonwebtoken';
import 'dotenv/config';
import axios from 'axios';

// verify if role is Admin or Teacher
export async function authorization(req, res, next) {
    const token = req.cookies.token;
    const verifyURL = 'http://localhost:8000/api/verify'
    console.log('auth')
    if (!token) {
        return res.status(403).json({message: 'No cookie found!'});
    }
    try {
        const data = jwt.verify(token, process.env.SECRET);
        // if the user has a cookie with jsonwebtoken varify the cookie using verify with user service
        // maybe jsut send token string to verify to check again
        const res = await axios.get(verifyURL).catch((err) => {
            console.log(err.response)
            return res.status(404)
        })



        console.log(data)
        req.username = data.username;
        if (data.role === 'Admin' || data.role === 'Teacher') {
            req.role = data.role
        } 
        else {
            return res.status(401).json({message: 'You are not allowed to access the question service!'});
        }

        return next();
    } catch {
        return res.status(403).json({message: 'Error with cookie found!'});
    }
};