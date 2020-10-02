import React from "react";
import ReconnectingWebSocket from "reconnecting-websocket";

const SocketContext = React.createContext();

export default SocketContext;

export const SocketProvider = ({ children }) => {
  const playerID = "blabla";

  const socketURL = new URL(`ws://${location.host}`);
  socketURL.searchParams.set("playerID", playerID);

  const socket = new ReconnectingWebSocket(socketURL.toString());
  socket.sendServer = (object) => socket.send(JSON.stringify(object));

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
