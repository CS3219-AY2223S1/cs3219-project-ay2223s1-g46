import { blackListToken, checkTokenBlacklisted } from "../repository.js";


export async function ormCheckTokenBlacklisted(token) {
    try {
        const res = await checkTokenBlacklisted(token)
        return res
    } catch (err) {
        console.log('ERROR: Could not check token blacklist status');
        return { err };
    }
}

export async function ormBlacklistToken(token) {
    try {
        const newBlackListToken = await blackListToken(token);
        newBlackListToken.save();
        return true;
    } catch (err) {
        console.log('ERROR: Could not blacklist token');
        return { err };
    }
}
