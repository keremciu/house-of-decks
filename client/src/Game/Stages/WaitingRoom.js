import React, { useContext } from "react";
import SocketContext from "SocketContext";
import { StoreContext } from "Store";
import { changeStageAction } from "Game/actions";
import { GAME_STAGES } from "Game/mappings";

import Button from "Components/Button";

function WaitingRoom() {
  const {
    state: { game },
    dispatch
  } = React.useContext(StoreContext);
  const socket = useContext(SocketContext);

  function onStart() {
    socket.emit("start_game");
  }

  return (
    <>
      <h2>Waiting for other players</h2>
      <p>
        Hi, {game.username}!<br />
        Please ask your friends to enter Room ID:
        <br />
        <strong>{game.room.id}</strong>
      </p>
      Joined players:
      <ul>
        {game?.room.players?.map(player => (
          <li key={player}>{player}</li>
        ))}
      </ul>
      <Button onClick={onStart}>Start the Game</Button>
    </>
  );
}

export default WaitingRoom;
