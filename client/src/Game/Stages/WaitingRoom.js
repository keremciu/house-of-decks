import React from "react";
import { StoreContext } from "Store";
import { changeStateAction } from "Game/actions";

import Button from "Components/Button";

function WaitingRoom() {
  const { dispatch } = React.useContext(StoreContext);
  return (
    <>
      <div>Test</div>
      <div>Your name:</div>
      <Button onClick={() => changeStateAction("join", dispatch)}>
        Go back
      </Button>
    </>
  );
}

export default WaitingRoom;
