import React, { useRef, useEffect, useState, useContext } from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import SocketContext from "SocketContext";

import { StoreContext } from "Store";
import Frame from "Components/Frame";
import Button from "Components/Button";
import LandingStage from "Game/Stages/Landing";
import ActiveRoomStage from "Game/Stages/ActiveRoom";
import CreateRoomStage from "Game/Stages/CreateRoom";
import JoinRoomStage from "Game/Stages/JoinRoom";
import WaitingRoomStage from "Game/Stages/WaitingRoom";

import { HelpBlock } from "Components/Input";

import { GAME_STAGES } from "./mappings";

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
    case GAME_STAGES.create:
      return <CreateRoomStage />;
    case GAME_STAGES.join:
      return <JoinRoomStage />;
    case GAME_STAGES.waiting:
      return <WaitingRoomStage />;
    case GAME_STAGES.active:
      return <ActiveRoomStage />;
    default:
      return <LandingStage />;
  }
};

function Game() {
  const {
    state: { game },
    dispatch
  } = React.useContext(StoreContext);
  const socket = useContext(SocketContext);
  useEffect(() => {
    try {
      socket.open();
      socket.on("game_action", action => {
        dispatch(action);
      });
    } catch (error) {
      console.log(error);
    }
    // Return a callback to be run before unmount-ing.
    return () => {
      socket.close();
    };
  }, []); // Pass in an empty array to only run on mount.

  return (
    <Frame>
      <div css={flexStyle}>
        <HelpBlock>{game.error}</HelpBlock>
        {renderStage(game.stage)}
      </div>
    </Frame>
  );
}

export default Game;
