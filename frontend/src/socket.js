import React, { createContext } from "react";
import { io } from "socket.io-client";

const socket = io('http://localhost:8002/', {
    transports: ['websocket'],
  });

const SocketContext = createContext(socket);

  socket.on("connect", () => {
    console.log("someone connected: ", socket?.id);
  });

const SocketProvider = ({ children }) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
export { SocketContext, SocketProvider };