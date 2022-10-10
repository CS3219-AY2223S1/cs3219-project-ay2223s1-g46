import jwt from 'jsonwebtoken';
import 'dotenv/config'
import { ormCheckTokenBlacklisted } from '../model/token/token-orm.js';

export async function authorization(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(403).json({message: 'No cookie found!'});
    }

    const blacklistedToken = await ormCheckTokenBlacklisted(token)

    if (blacklistedToken) {
        return res.status(403).json({message: 'Token has been blacklisted!'});
    }

    try {
        const data = jwt.verify(token, process.env.SECRET);
        console.log(data)
        req.username = data.username;
        req.role = data.role
        return next();
    } catch {
        return res.status(403).json({message: 'No cookie found!'});
    }
};

export async function verifyTokenString(req, res, next) {
    const {token} = req.body
    // console.log('verifytokenstring', token)

    if (!token) {
        return res.status(403).json({message: 'No token found!'});
    }

    const blacklistedToken = await ormCheckTokenBlacklisted(token)

    if (blacklistedToken) {
        return res.status(403).json({message: 'Token has been blacklisted!'});
    }

    try {
        const data = jwt.verify(token, process.env.SECRET);
        console.log(data)
        req.username = data.username;
        req.role = data.role
        return next();
    } catch {
        return res.status(403).json({message: 'Error with token found!'});
    }
}