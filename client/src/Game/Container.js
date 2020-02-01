import React, { useEffect, useState } from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import { StoreContext } from "Store";
import Frame from "Components/Frame";
import Button from "Components/Button";
import LandingStage from "Game/Stages/Landing";
import RoomStage from "Game/Stages/Room";
import CreateRoomStage from "Game/Stages/CreateRoom";
import JoinRoomStage from "Game/Stages/JoinRoom";
import WaitingRoomStage from "Game/Stages/WaitingRoom";

const flexStyle = css({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  "& > button": {
    margin: "50px 0"
  }
});

const renderStage = gameStage => {
  switch (gameStage) {
    case "create_room":
      return <CreateRoomStage />;
    case "join_room":
      return <JoinRoomStage />;
    case "waiting_room":
      return <WaitingRoomStage />;
    case "room":
      return <RoomStage />;
    default:
      return <LandingStage />;
  }
};

function Game() {
  const {
    state: { game }
  } = React.useContext(StoreContext);
  return (
    <Frame>
      <div css={flexStyle}>{renderStage(game.stage)}</div>
    </Frame>
  );
}

export default Game;
