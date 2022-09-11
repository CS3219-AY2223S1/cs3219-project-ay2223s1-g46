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
        req.username = data.username;
        return next();
    } catch {
        return res.status(403).json({message: 'No cookie found!'});
    }
};