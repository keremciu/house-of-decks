import React from "react";
import { StoreContext } from "Store";
import { changeStageAction } from "Game/actions";
import { GAME_STAGES } from "Game/mappings";

import Button from "Components/Button";

function WaitingRoom() {
  const {
    state: { game },
    dispatch
  } = React.useContext(StoreContext);
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
          <li>{player}</li>
        ))}
      </ul>
      <Button onClick={() => dispatch(changeStageAction(GAME_STAGES.landing))}>
        Start Game
      </Button>
      <Button onClick={() => dispatch(changeStageAction(GAME_STAGES.landing))}>
        End game
      </Button>
    </>
  );
}

export default WaitingRoom;
