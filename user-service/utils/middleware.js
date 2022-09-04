import jwt from 'jsonwebtoken';
import 'dotenv/config'

export async function authorization(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(403).json({message: 'No cookie found!'});
    }
    try {
        const data = jwt.verify(token, process.env.SECRET);
        req.username = data.username;
        return next();
    } catch {
        return res.status(403).json({message: 'No cookie found!'});
    }
};