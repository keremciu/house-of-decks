import React from "react";
import { StoreContext } from "Store";
import { changeStageAction } from "Game/actions";
import { GAME_STAGES } from "Game/mappings";

import Button from "Components/Button";

function Join() {
  const { dispatch } = React.useContext(StoreContext);
  return (
    <>
      <Button onClick={() => dispatch(changeStageAction(GAME_STAGES.create))}>
        Create a room
      </Button>
      <span>or</span>
      <Button onClick={() => dispatch(changeStageAction(GAME_STAGES.join))}>
        Join a room
      </Button>
    </>
  );
}

export default Join;
