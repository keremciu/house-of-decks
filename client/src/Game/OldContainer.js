import React, { useRef, useEffect, useState, useContext } from "react";
import SocketContext from "SocketContext";
import { SoundContext } from "Sounds/Context";
import { AnimatePresence } from "framer-motion";

/** @jsx jsx */
import { jsx, css } from "@emotion/core";

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
  const socket = useContext(SocketContext);

  return (
    <StageRenderer
      stage={socket.data?.game.stage}
      errors={socket.data?.errors}
    />
  );
}

const StageRenderer = ({ stage, errors }) => {
  const stagesWithOnlyBody = [GAME_STAGES.active, GAME_STAGES.waiting];
  const showHeaderAndFooter = !stagesWithOnlyBody.includes(stage);

  const onClose = () => {
    console.log("no-error-react-state");
  };

  return (
    <Frame>
      {showHeaderAndFooter && <Frame.Header />}
      <Frame.Body>
        <ErrorBoundary>
          <Notifications errors={errors} onClose={onClose} />
          <ToggleSound />
          <div css={flexStyle}>
            <AnimatePresence
              exitBeforeEnter
              initial="exit"
              animate="enter"
              exit="exit"
            >
              {renderStage(stage)}
            </AnimatePresence>
          </div>
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
