import React, { useContext, useEffect } from "react";
import { useRoutes, useNavigate } from "react-router-dom";

import SocketContext from "SocketContext";
import Landing from "Game/Stages/Landing";
import CreateRoom from "Game/Stages/CreateRoom";
import WaitingRoom from "Game/Stages/WaitingRoom";
import JoinRoom from "Game/Stages/JoinRoom";
import ActiveRoom from "Game/Stages/ActiveRoom";

import Notifications from "Components/Notifications";
import ToggleSound from "Components/ToggleSound";
import Frame from "Components/Frame";

import ErrorBoundary from "./ErrorBoundary";

const DataRequired = ({ data }) => {
  if (!data?.game) return Frame.withHeader(<JoinRoom />);
  // join room failure when roomid doesnt work
  if (data.game.hasStarted) {
    return Frame(<ActiveRoom />);
  }
  return Frame(<WaitingRoom />);
};

function Game() {
  const navigate = useNavigate();
  const { data, errors, setErrors } = useContext(SocketContext);

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

  const onClose = () => setErrors([]);

  return (
    <ErrorBoundary>
      <Notifications errors={errors} onClose={onClose} />
      <ToggleSound />
      {element}
    </ErrorBoundary>
  );
}

export default Game;
