import { createPendingMatch, findOnePendingMatchAndDelete, registerListener } from './repository.js';

//need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreatePendingMatch(username, socket_id, difficulty, timeout_id) {
    try {
        const newUser = await createPendingMatch({
            username: username, 
            socket_id: socket_id, 
            difficulty: difficulty,
            timeout_id: timeout_id
        });
        newUser.save();
        return true;
    } catch (err) {
        console.log('ERROR: Could not create new pending match');
        return { err };
    }
}export async function ormAtomicFindFirstPendingMatchAndDelete(searchParams) {
    return await findOnePendingMatchAndDelete(searchParams);
  }
export async function ormRegisterAddListener(callback) {
    registerListener(callback);
}

