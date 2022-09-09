import { checkUserExist, compareHash, createJWT, createUser, getUser, deleteUser} from './repository.js';

//need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreateUser(username, password) {
    try {
        const newUser = await createUser({username, password});
        newUser.save();
        return true;
    } catch (err) {
        console.log('ERROR: Could not create new user');
        return { err };
    }
}

export async function ormCheckUserExist(username) {
    try {
        const res = await checkUserExist(username);
        return res
    } catch (err) {
        console.log('ERROR: Could not check whether user exists');
        return { err };
    }
}

export async function ormGetUser(username) {
    try {
        const existingUser = await getUser(username);
        return existingUser
    } catch (err) {
        console.log('ERROR: Could not get user');
        return { err };
    }
}

export async function ormCompareHash(username, password) {
    try {
        const res = compareHash(username, password)
        return res
    } catch (err) {
        console.log('ERROR: Could not compare hash');
        return { err };
    }
}

export async function ormCreateJWT(user) {
    try {
        const token = createJWT(user)
        return token
    } catch (err) {
        console.log('ERROR: Could not create JWT');
        return { err };
    }
}

export async function ormDeleteUser(username) {
    try {
        await deleteUser(username)
        return
    } catch (err) {
        console.log('ERROR: Could not delete User');
        return { err };
    }
}