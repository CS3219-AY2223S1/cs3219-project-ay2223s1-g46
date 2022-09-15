import { createPendingMatch, findOnePendingMatchAndDelete } from './repository.js';

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
}
export async function ormClaimFirstMatchByDifficulty(difficulty) {
    return await findOnePendingMatchAndDelete(
        { difficulty: {$eq: difficulty} } //explict $eq to prevent injection attack
    );
}
export async function ormFlushPendingMatchById(socket_id) {
    return await findOnePendingMatchAndDelete(
        { socket_id: {$eq: socket_id} } //explict $eq to prevent injection attack
    );
}

