import {
  createContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import ReconnectingWebSocket from "reconnecting-websocket";

type Card = {
  text: string;
};

export type DataType = {
  game?:
    | {
        id: string;
        czar: string;
        players: {
          username: string;
        }[];
        blackCard: {
          text: string;
          pick: number;
        };
      }
    | undefined;
  player?: {
    username: string;
    submittedCards: Card[];
    cards: Card[];
  };
};

type ContextProps = {
  data: DataType;
  errors: Array<string>;
  sendServer(object: object): void;
  setErrors(errors: Array<string>): void;
};

const SocketContext = createContext<ContextProps>({
  data: {
    game: undefined,
    player: undefined,
  },
  errors: [],
  setErrors: () => undefined,
  sendServer: () => undefined,
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
  // if gameID in URL bar is different than localStorage gameID, don't show
  if (window.location.pathname.replace("/", "") === gameID) {
    socketURL.searchParams.set("gameID", gameID);
  }
}
const socket = new ReconnectingWebSocket(socketURL.toString());

export const SocketProvider = ({ children }: IProps) => {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState<string[]>([]);
  const [connected, setConnected] = useState(false);
  const onMessage = useCallback((event: { data: string }) => {
    const serverData = JSON.parse(event.data);
    if (serverData.errors) {
      return setErrors(serverData.errors);
    }
    if (localStorage.getItem("gameID") && !serverData.game) {
      console.log("removesession", serverData);
      localStorage.removeItem("gameID");
      localStorage.removeItem("username");
      return;
    }
    setData(serverData);
    // if there is a new game data keep in session
    if (serverData.game && !localStorage.getItem("gameID")) {
      localStorage.setItem("gameID", serverData.game.id);
      localStorage.setItem("username", serverData.player.username);
    }
  }, []);

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
  }, [onMessage]);

  const sendServer = (object: object) => socket.send(JSON.stringify(object));

  if (!connected) {
    return <div>reconnecting...</div>;
  }

  return (
    <SocketContext.Provider
      value={{
        data,
        errors,
        sendServer,
        setErrors,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
