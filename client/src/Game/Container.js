import React, { useContext } from "react";
import { useRoutes } from "react-router-dom";

import SocketContext from "SocketContext";
import Landing from "Game/Stages/Landing";
import CreateRoom from "Game/Stages/CreateRoom";
import Frame from "Components/Frame";
// import JoinRoom from "Game/Stages/JoinRoom";

function Game() {
  const socket = useContext(SocketContext);

  let element = useRoutes([
    { path: "/", element: Frame.withHeader(<Landing />) },
    { path: "create", element: Frame.withHeader(<CreateRoom />) },
    // { path: "join", element: <JoinRoom /> },
  ]);

  return element;
}

export default Game;
