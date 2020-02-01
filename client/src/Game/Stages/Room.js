import React from "react";
import { StoreContext } from "Store";
import { changeStateAction } from "Game/actions";

import Button from "Components/Button";

function Room() {
  const { dispatch } = React.useContext(StoreContext);
  return (
    <>
      <div>Test</div>
      <Button onClick={() => changeStateAction("join", dispatch)}>
        Go back
      </Button>
    </>
  );
}

export default Room;
