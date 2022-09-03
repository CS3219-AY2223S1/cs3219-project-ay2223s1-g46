import { checkUserExist, createUser } from './repository.js';

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
        const existingUser =  await checkUserExist(username);
        if (existingUser) {
            return true;
        }
        else {
            return false;
        }
    } catch (err) {
        console.log('ERROR: Could not check whether user exists');
        return { err };
    }
}

