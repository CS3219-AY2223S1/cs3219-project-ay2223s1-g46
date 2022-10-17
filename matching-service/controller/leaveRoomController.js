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
                }
            }
        }
    };
    socket.on("disconnecting", (_) => {leaveRoomCallback();});
    socket.once("leave_room", leaveRoomCallback);
}