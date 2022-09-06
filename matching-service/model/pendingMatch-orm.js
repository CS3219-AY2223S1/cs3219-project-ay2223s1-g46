import { createPendingMatch, registerListener } from './repository.js';

//need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreatePendingMatch(username) {
    try {
        const newUser = await createPendingMatch({username});
        newUser.save();
        return true;
    } catch (err) {
        console.log('ERROR: Could not create new pending match');
        return { err };
    }
}
export async function ormRegisterAddListener(callback) {
    registerListener(callback);
}

