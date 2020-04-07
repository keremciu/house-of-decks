import React, { useRef, useEffect, useState, useContext } from "react";
import SocketContext from "SocketContext";
import { motion, AnimatePresence } from "framer-motion";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import { StoreContext } from "Store";
import Frame from "Components/Frame";
import Button from "Components/Button";
import Notification, { notificationListStyle } from "Components/Notification";
import LandingStage from "Game/Stages/Landing";
import ActiveRoomStage from "Game/Stages/ActiveRoom";
import CreateRoomStage from "Game/Stages/CreateRoom";
import JoinRoomStage from "Game/Stages/JoinRoom";
import WaitingRoomStage from "Game/Stages/WaitingRoom";

import { GAME_STAGES } from "./mappings";

const flexStyle = css({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  "& > button": {
    margin: "50px 0",
  },
});

const renderStage = (gameStage) => {
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
    dispatch,
  } = React.useContext(StoreContext);
  const socket = useContext(SocketContext);

  useEffect(() => {
    try {
      socket.open();
      socket.on("game_action", (action) => {
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

  const onClose = () => {
    dispatch({
      type: "NAH_SERVER_RESPONSE",
      payload: {
        error: "",
      },
    });
  };

  return (
    <Frame stage={game.stage}>
      <div css={flexStyle}>
        <ul css={notificationListStyle}>
          <AnimatePresence initial={false}>
            {game.error && (
              <motion.li
                key={"test"}
                positionTransition
                initial={{ opacity: 0, y: 50, scale: 0.3 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
              >
                <Notification text={game.error} close={onClose} />
              </motion.li>
            )}
          </AnimatePresence>
        </ul>
        {renderStage(game.stage)}
      </div>
    </Frame>
  );
}

export default Game;
