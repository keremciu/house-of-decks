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

const renderStage = (gameStage) => {
  const wrap = (children) => (
    <motion.div
      key={gameStage}
      className="single"
      initial="exit"
      animate="enter"
      exit="exit"
    >
      <motion.div variants={formVariants} css={flexStyle}>
        {children}
      </motion.div>
    </motion.div>
  );
  switch (gameStage) {
    case GAME_STAGES.create:
      return wrap(<CreateRoomStage />);
    case GAME_STAGES.join:
      return wrap(<JoinRoomStage />);
    case GAME_STAGES.waiting:
      return wrap(<WaitingRoomStage />);
    case GAME_STAGES.active:
      return wrap(<ActiveRoomStage />);
    default:
      return wrap(<LandingStage />);
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
      <AnimatePresence exitBeforeEnter initial={false}>
        {renderStage(game.stage)}
      </AnimatePresence>
    </Frame>
  );
}

export default Game;

const transition = {
  duration: 0.3,
  ease: [0.43, 0.13, 0.23, 0.96],
};

const formVariants = {
  exit: { y: "10%", opacity: 0, transition },
  enter: {
    y: "0%",
    opacity: 1,
    transition,
  },
};

const flexStyle = css({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  "& > button": {
    margin: "50px 0",
  },
});
