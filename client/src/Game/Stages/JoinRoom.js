import React from "react";
import { StoreContext } from "Store";
import { changeStateAction } from "Game/actions";

import Button from "Components/Button";

function JoinRoom() {
  const { dispatch } = React.useContext(StoreContext);
  return (
    <>
      <div>Join Room</div>
      <div>Room ID</div>
      <Button onClick={() => changeStateAction("join", dispatch)}>
        Go back
      </Button>
    </>
  );
}

export default JoinRoom;
