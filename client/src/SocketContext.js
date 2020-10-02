import React, { useState, useEffect } from "react";
import ReconnectingWebSocket from "reconnecting-websocket";

const SocketContext = React.createContext();

export default SocketContext;

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const username = sessionStorage.getItem("username");
    const gameID = sessionStorage.getItem("gameID");
    const socketURL = new URL(`ws://${location.host}`);
    if (gameID) {
      socketURL.searchParams.set("username", username);
      socketURL.searchParams.set("gameID", gameID);
    }

    setSocket(() => {
      const reconnect = new ReconnectingWebSocket(socketURL.toString());
      reconnect.sendServer = (object) => reconnect.send(JSON.stringify(object));
      reconnect.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.action === "removesession") {
          sessionStorage.removeItem("gameID");
          sessionStorage.removeItem("username");
          return;
        }

        setData(data);
        // if there is a new data
        if (data.game && !sessionStorage.getItem("gameID")) {
          sessionStorage.setItem("gameID", data.game.id);
          sessionStorage.setItem("username", data.player.username);
        }
      };
      return reconnect;
    });
  }, []);

  if (!socket) {
    return <div>reconnecting...</div>;
  }

  return (
    <SocketContext.Provider
      value={{
        sendServer: socket.sendServer,
        data,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
