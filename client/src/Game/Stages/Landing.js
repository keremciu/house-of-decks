import React from "react";
import { StoreContext } from "Store";
import { changeStageAction } from "Game/actions";
import { GAME_STAGES } from "Game/mappings";

import Button from "Components/Button";

function Join() {
  const { dispatch } = React.useContext(StoreContext);
  return (
    <>
      <Button
        onClick={() =>
          changeStageAction({ stage: GAME_STAGES.create }, dispatch)
        }
      >
        Create a room
      </Button>
      <span>or</span>
      <Button
        onClick={() => changeStageAction({ stage: GAME_STAGES.join }, dispatch)}
      >
        Join a room
      </Button>
    </>
  );
}

export default Join;
