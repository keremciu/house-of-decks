import React, { useContext, useEffect } from "react";
import { useRoutes, useNavigate } from "react-router-dom";

import SocketContext from "SocketContext";
import Landing from "Game/Stages/Landing";
import CreateRoom from "Game/Stages/CreateRoom";
import WaitingRoom from "Game/Stages/WaitingRoom";
import Frame from "Components/Frame";
// import JoinRoom from "Game/Stages/JoinRoom";

function Game() {
  const navigate = useNavigate();
  const { data } = useContext(SocketContext);

  useEffect(() => {
    if (!data) {
      navigate("/");
    }
    if (data?.game) {
      if (!data.game.hasStarted) {
        navigate("waiting");
      }
    }
  }, [data]);

  let element = useRoutes([
    { path: "/", element: Frame.withHeader(<Landing />) },
    { path: "create", element: Frame.withHeader(<CreateRoom />) },
    { path: "waiting", element: Frame(<WaitingRoom />) },
    // { path: "join", element: <JoinRoom /> },
  ]);

  return element;
}

export default Game;
