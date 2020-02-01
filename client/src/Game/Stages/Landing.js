import React from "react";
import { StoreContext } from "Store";
import { changeStateAction } from "Game/actions";

import Button from "Components/Button";

function Join() {
  const { dispatch } = React.useContext(StoreContext);
  return (
    <>
      <Button onClick={() => changeStateAction("create_room", dispatch)}>
        Create a room
      </Button>
      <span>or</span>
      <Button onClick={() => changeStateAction("join_room", dispatch)}>
        Join a room
      </Button>
    </>
  );
}

export default Join;
