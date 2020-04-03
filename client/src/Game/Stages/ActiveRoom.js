import React from "react";
import { StoreContext } from "Store";
import { changeStageAction } from "Game/actions";
import { GAME_STAGES } from "Game/mappings";

import Button from "Components/Button";

function Room() {
  const { dispatch } = React.useContext(StoreContext);
  return (
    <>
      <div>Room Test</div>
      <Button
        onClick={() =>
          changeStageAction({ stage: GAME_STAGES.landing }, dispatch)
        }
      >
        Go back
      </Button>
    </>
  );
}

export default Room;
