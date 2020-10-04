import React, { useState, useEffect } from "react";
import ReconnectingWebSocket from "reconnecting-websocket";

const SocketContext = React.createContext();

export default SocketContext;

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [data, setData] = useState(null);
  const [errors, setErrors] = useState([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const username = sessionStorage.getItem("username");
    const gameID = sessionStorage.getItem("gameID");
    const socketURL = new URL(`ws://${location.host}`);
    if (gameID) {
      socketURL.searchParams.set("username", username);
      socketURL.searchParams.set("gameID", gameID);
    }
    setSocket(new ReconnectingWebSocket(socketURL.toString()));
  }, []);

  const onMessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.errors) {
      return setErrors(data.errors);
    }
    if (sessionStorage.getItem("gameID") && !data.game) {
      console.log("removesession", data);
      sessionStorage.removeItem("gameID");
      sessionStorage.removeItem("username");
      return;
    }
    setData(data);
    // if there is a new game data keep in session
    if (data.game && !sessionStorage.getItem("gameID")) {
      sessionStorage.setItem("gameID", data.game.id);
      sessionStorage.setItem("username", data.player.username);
    }
  };

  const onError = (error) => {
    console.log(error);
  };

  const onOpen = () => setConnected(true);
  const onClose = () => setConnected(false);

  useEffect(() => {
    socket?.addEventListener("open", onOpen);
    socket?.addEventListener("message", onMessage);
    socket?.addEventListener("error", onError);
    socket?.addEventListener("close", onClose);
    return () => {
      socket?.removeEventListener("open");
      socket?.removeEventListener("message");
      socket?.removeEventListener("error");
      socket?.removeEventListener("close");
    };
  }, [socket]);

  if (!connected) {
    return <div>reconnecting...</div>;
  }
  console.log(data);
  const sendServer = (object) => socket.send(JSON.stringify(object));

  return (
    <SocketContext.Provider
      value={{
        sendServer,
        data,
        errors,
        setErrors,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
