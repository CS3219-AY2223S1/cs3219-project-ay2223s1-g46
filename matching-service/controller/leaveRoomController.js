import { getAndDeleteMatchHistory } from '../model/matchHistory-orm.js'
import { postHistory } from '../model/history-orm.js'

async function flushHistory(room_id) {
    const history = await getAndDeleteMatchHistory(room_id)
    const currentTimeInSGT = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Singapore',
        hour12: false
    })
    const date_nz = new Date(currentTimeInSGT);

    const year = date_nz.getFullYear();
    const month = ("0" + (date_nz.getMonth() + 1)).slice(-2);
    const date = ("0" + date_nz.getDate()).slice(-2);

    // date as YYYY-MM-DD format
    history.finishDate = year + "-" + month + "-" + date;
    await postHistory(history)
}

export function addLeaveRoomCallback (io, socket, username) {
    const leaveRoomCallback = () => {

        socket.removeAllListeners("disconnecting");
        socket.removeAllListeners("leave_room");

        for (const room of socket.rooms) {
            if (room !== socket.id) {
                socket.to(room).emit("user_leaves", username);
                socket.leave(room);
                //Future proof for rooms with more than 2 people
                const room_contents = io.sockets.adapter.rooms.get(room);
                const room_occupancy = room_contents.size;
                if (room_occupancy < 2) { 
                    const lonely_socket_id = room_contents.values().next().value;
                    const lonely_socket = io.sockets.sockets.get(lonely_socket_id);

                    lonely_socket.removeAllListeners("disconnecting");
                    lonely_socket.removeAllListeners("leave_room");

                    lonely_socket.leave(room);
                    lonely_socket.emit("room_info", "Room has been torn down")
                    
                    flushHistory(room)
                }
            }
        }
    };
    socket.on("disconnecting", (_) => {leaveRoomCallback();});
    socket.once("leave_room", leaveRoomCallback);
}