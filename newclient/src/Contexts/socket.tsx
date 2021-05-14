import { createContext, useState, useEffect, ReactNode } from "react";
import ReconnectingWebSocket from "reconnecting-websocket";

export type DataType = {
  game?: {
    id: string;
    players: [{ username: string }];
  };
};

type ContextProps = {
  sendServer(object: object): void;
  data: DataType;
};

const SocketContext = createContext<ContextProps>({
  sendServer: () => undefined,
  data: {
    game: undefined,
  },
} as ContextProps);

export default SocketContext;

interface IProps {
  children: ReactNode;
}

const socketURL = new URL(`ws://${window.location.hostname}:5000`);
const username: any = localStorage.getItem("username");
const gameID = localStorage.getItem("gameID");
if (gameID) {
  socketURL.searchParams.set("username", username);
  socketURL.searchParams.set("gameID", gameID);
}
const socket = new ReconnectingWebSocket(socketURL.toString());

export const SocketProvider = ({ children }: IProps) => {
  const [data, setData] = useState({});
  const [connected, setConnected] = useState(false);
  const onMessage = (event: { data: string }) => {
    const data = JSON.parse(event.data);
    if (data.errors) {
      console.log(data.errors);
      // return setErrors(data.errors);
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
      socket?.removeEventListener("open", onOpen);
      socket?.removeEventListener("message", onMessage);
      socket?.removeEventListener("close", onClose);
    };
  }, []);

  // const [socket, setSocket] = useState(null);

  // useEffect(() => {
  //   // const username = localStorage.getItem("username");
  //   // const gameID = localStorage.getItem("gameID");
  //   // TODO: find a better way for this connection

  //   // if (gameID) {
  //   //   socketURL.searchParams.set("username", username);
  //   //   socketURL.searchParams.set("gameID", gameID);
  //   // }
  //   // const socketInstance = new ReconnectingWebSocket(socketURL.toString())
  //   setSocket(socketInstance);
  //   return () => {
  //     setSocket(null)
  //   }
  // }, []);

  const sendServer = (object: object) => socket.send(JSON.stringify(object));

  if (!connected) {
    return <div>reconnecting...</div>;
  }

  return (
    <SocketContext.Provider
      value={{
        sendServer,
        data,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
