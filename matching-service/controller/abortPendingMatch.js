import { ormFlushPendingMatchById } from "./../model/pendingMatch-orm.js"; 

export function abortPendingMatchFactory(socket) {
    return async () => {
        var existing_match = await ormFlushPendingMatchById(socket.id);
        if (existing_match) {
            clearTimeout(existing_match.timeout_id);
        }
    }
}