import { createContext, useState, useEffect } from "react";
import ReconnectingWebSocket from "reconnecting-websocket";

const SocketContext = createContext();

export default SocketContext;

// how we consume socket data is important
// put this performant way to divide components better
// https://github.com/dai-shi/use-context-selector
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [data, setData] = useState(null);
  const [errors, setErrors] = useState([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem("username");
    const gameID = localStorage.getItem("gameID");
    // TODO: find a better way for this connection
    const socketURL = new URL(`ws://${window.location.hostname}:5000`);
    if (gameID) {
      socketURL.searchParams.set("username", username);
      socketURL.searchParams.set("gameID", gameID);
    }
    setSocket(new ReconnectingWebSocket(socketURL.toString()));
    return () => {
      setSocket(null)
    }
  }, []);

  const onMessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.errors) {
      return setErrors(data.errors);
    }
    if (localStorage.getItem("gameID") && !data.game) {
      console.log("removesession", data);
      localStorage.removeItem("gameID");
      localStorage.removeItem("username");
      return;
    }
    setData(data);
    // if there is a new game data keep in session
    if (data.game && !localStorage.getItem("gameID")) {
      localStorage.setItem("gameID", data.game.id);
      localStorage.setItem("username", data.player.username);
    }
  };


  useEffect(() => {
    const onOpen = () => socket && setConnected(true);
    const onClose = () => socket && setConnected(false);
    
    socket?.addEventListener("open", onOpen);
    socket?.addEventListener("message", onMessage);
    socket?.addEventListener("close", onClose);
    return () => {
      socket?.removeEventListener("open");
      socket?.removeEventListener("message");
      socket?.removeEventListener("close");
    };
  }, [socket]);

  if (!connected) {
    return <div>reconnecting...</div>;
  }
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
