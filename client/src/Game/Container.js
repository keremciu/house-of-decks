import React, { useRef, useEffect, useState, useContext } from "react";
import SocketContext from "SocketContext";
import { motion, AnimatePresence } from "framer-motion";

/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import { StoreContext } from "Store";
import Frame from "Components/Frame";
import Button from "Components/Button";
import Notifications from "Components/Notifications";
import LandingStage from "Game/Stages/Landing";
import ActiveRoomStage from "Game/Stages/ActiveRoom";
import CreateRoomStage from "Game/Stages/CreateRoom";
import JoinRoomStage from "Game/Stages/JoinRoom";
import WaitingRoomStage from "Game/Stages/WaitingRoom";

import ErrorBoundary from "./ErrorBoundary";
import { GAME_STAGES } from "./mappings";

function Game() {
  const {
    state: { game },
    dispatch,
  } = useContext(StoreContext);
  const socket = useContext(SocketContext);

  const search = window.location.search;
  const params = new URLSearchParams(search);
  const roomID = params.get("room");

  useEffect(() => {
    try {
      socket.open();
      socket.on("game_action", (action) => {
        dispatch(action);
        if (
          game.room.host === game.username &&
          game.room.players.length === 1
        ) {
          window.history.replaceState(
            "",
            "",
            `?room=${action.payload.room.id}`
          );
        }
      });
    } catch (error) {
      console.log(error);
    }
    // Return a callback to be run before unmount-ing.
    return () => {
      // think about reconnecting parts here
      // socket.close();
    };
  }, []); // Pass in an empty array to only run on mount.

  useEffect(() => {
    if (!game.roomID && !!roomID) {
      dispatch({
        type: "NAH_SERVER_RESPONSE",
        payload: {
          room: {
            stage: GAME_STAGES.join,
          },
          serverValues: {
            roomID,
          },
        },
      });
    }
  }, [window.location.search]);

  return (
    <StageRenderer
      stage={game.room.stage}
      errors={game.errors}
      dispatch={dispatch}
    />
  );
}

const StageRenderer = ({ stage, errors, dispatch }) => {
  const stagesWithOnlyBody = [GAME_STAGES.active, GAME_STAGES.waiting];
  const showHeaderAndFooter = !stagesWithOnlyBody.includes(stage);

  const onClose = () => {
    dispatch({
      type: "NAH_SERVER_RESPONSE",
      payload: {
        errors: [],
      },
    });
  };

  return (
    <Frame>
      {showHeaderAndFooter && <Frame.Header />}
      <Frame.Body>
        <ErrorBoundary dispatch={dispatch}>
          <Notifications errors={errors} onClose={onClose} />
          <AnimatePresence
            exitBeforeEnter
            initial="exit"
            animate="enter"
            exit="exit"
          >
            {renderStage(stage)}
          </AnimatePresence>
        </ErrorBoundary>
      </Frame.Body>
      {showHeaderAndFooter && <Frame.Footer />}
    </Frame>
  );
};

const renderStage = (gameStage) => {
  const wrap = (stageContent) => (
    <motion.div
      key={gameStage}
      initial="exit"
      animate="enter"
      exit="exit"
      style={{ display: "contents" }}
    >
      <motion.div variants={stageVariants} css={flexStyle}>
        {stageContent}
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

const transition = {
  duration: 0.3,
  ease: [0.43, 0.13, 0.23, 0.96],
};

const stageVariants = {
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

export default Game;
