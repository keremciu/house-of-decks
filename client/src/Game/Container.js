import React, { useContext, useEffect } from "react";
import { useRoutes, useNavigate } from "react-router-dom";

import SocketContext from "SocketContext";
import Landing from "Game/Stages/Landing";
import CreateRoom from "Game/Stages/CreateRoom";
import WaitingRoom from "Game/Stages/WaitingRoom";
import JoinRoom from "Game/Stages/JoinRoom";
import ActiveRoom from "Game/Stages/ActiveRoom";

import Frame from "Components/Frame";

const DataRequired = ({ data }) => {
  if (!data) return Frame.withHeader(<JoinRoom />);
  // join room failure when roomid doesnt work
  if (data.game.hasStarted) {
    return Frame(<ActiveRoom />);
  }
  return Frame(<WaitingRoom />);
};

function Game() {
  const navigate = useNavigate();
  const { data } = useContext(SocketContext);

  useEffect(() => {
    if (data?.game) {
      navigate(data.game.id);
      // if (!data.game.hasStarted) {
      //   navigate(data.game.id);
      // }
    }
  }, [data]);

  let element = useRoutes([
    { path: "/", element: Frame.withHeader(<Landing />) },
    { path: "create", element: Frame.withHeader(<CreateRoom />) },
    { path: "join", element: Frame.withHeader(<JoinRoom />) },
    {
      path: ":gameid",
      element: <DataRequired data={data} />,
    },
  ]);

  return element;
}

export default Game;
