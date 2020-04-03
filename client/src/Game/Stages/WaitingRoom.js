import React from "react";
import { StoreContext } from "Store";
import { changeStageAction } from "Game/actions";
import { GAME_STAGES } from "Game/mappings";

import Button from "Components/Button";

function WaitingRoom() {
  const { dispatch } = React.useContext(StoreContext);
  return (
    <>
      <div>Test</div>
      <div>Your name:</div>
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

export default WaitingRoom;
