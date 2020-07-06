import React, { useRef, useEffect, useState, useContext } from "react";
import SocketContext from "SocketContext";
import { SoundContext } from "Sounds/Context";
import { motion, useAnimation, AnimatePresence } from "framer-motion";

/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import { StoreContext } from "Store";
import Frame from "Components/Frame";
import Button from "Components/Button";
import Notifications from "Components/Notifications";
import ToggleSound from "Components/ToggleSound";
import NudgeButton from "Components/NudgeButton";
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
  const { playNudge } = useContext(SoundContext);
  const nudgeControls = useAnimation();

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
          game.room?.players.length === 1 &&
          action.payload.room
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
    if (
      [GAME_STAGES.landing, GAME_STAGES.join].includes(game.room.stage) &&
      !!roomID
    ) {
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

  useEffect(() => {
    const { hasSubmitted } = game.room.players.find(
      (p) => p.username === game.username
    );
    if (game.runNudge && !hasSubmitted) {
      playNudge();
      nudgeControls.start({
        opacity: [0.8, 0.4, 0.9, 1, 1],
        x: [-8, 20, -12, 25, 0],
        y: [8, -16, 20, 5, 30, -12, 0],
        transition: {
          duration: 0.4,
          type: "spring",
          mass: 0.5,
          restDelta: 0,
          damping: 300,
        },
      });
      dispatch({
        type: "NAH_SERVER_RESPONSE",
        payload: {
          runNudge: false,
        },
      });
      setTimeout(() => {
        dispatch({
          type: "NAH_SERVER_RESPONSE",
          payload: {
            isNudgeReady: true,
          },
        });
      }, 3000);
    }
  }, [game.runNudge]);

  return (
    <StageRenderer
      isNudgeReady={game.isNudgeReady}
      nudgeControls={nudgeControls}
      stage={game.room.stage}
      errors={game.errors}
      dispatch={dispatch}
    />
  );
}

const StageRenderer = ({
  stage,
  isNudgeReady,
  nudgeControls,
  errors,
  dispatch,
}) => {
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
          <ToggleSound />
          {stage === GAME_STAGES.active && (
            <NudgeButton disabled={!isNudgeReady} />
          )}
          <motion.div animate={nudgeControls} css={flexStyle}>
            <AnimatePresence
              exitBeforeEnter
              initial="exit"
              animate="enter"
              exit="exit"
            >
              {renderStage(stage)}
            </AnimatePresence>
          </motion.div>
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
  exit: { y: "-10%", opacity: 0, transition },
  enter: {
    y: "0%",
    opacity: 1,
    transition,
  },
};

const flexStyle = css({
  width: "100%",
  display: "flex",
  flex: "1",
  flexDirection: "column",
  alignItems: "center",
  "& > button": {
    margin: "50px 0",
  },
});

export default Game;
