import { createPendingMatch, findOnePendingMatchAndDelete } from './repository.js';

//need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreatePendingMatch(username, socket_id, difficulty, topic, timeout_id) {
    try {
        const newUser = await createPendingMatch({
            username: username, 
            socket_id: socket_id, 
            difficulty: difficulty,
            topic: topic,
            timeout_id: timeout_id,
        });
        newUser.save();
        return true;
    } catch (err) {
        console.log('ERROR: Could not create new pending match');
        return { err };
    }
}
export async function ormClaimFirstMatch(difficulty, topic) {
    return await findOnePendingMatchAndDelete(
        {$and: [ //explict $eq to prevent injection attack
            { difficulty: {$eq: difficulty} },
            { topic: {$eq: topic} }
        ]}
    );
}
export async function ormFlushPendingMatchById(socket_id) {
    return await findOnePendingMatchAndDelete(
        { socket_id: {$eq: socket_id} } //explict $eq to prevent injection attack
    );
}

