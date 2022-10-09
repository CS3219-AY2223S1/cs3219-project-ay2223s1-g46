export async function abortPendingMatch() {
    var existing_match = await ormFlushPendingMatchById(socket.id);
    if (existing_match) {
        clearTimeout(existing_match.timeout_id);
    }
}