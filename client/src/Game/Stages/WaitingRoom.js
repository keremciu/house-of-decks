import React, { useContext } from "react";
import SocketContext from "SocketContext";
import { StoreContext } from "Store";
import { changeStageAction } from "Game/actions";
import { GAME_STAGES } from "Game/mappings";
import { motion } from "framer-motion";

import Button, { BackIcon } from "Components/Button";
import Scoreboard from "Game/Views/Scoreboard";

function WaitingRoom() {
  const {
    state: {
      game: { username, room },
    },
    dispatch,
  } = React.useContext(StoreContext);
  const socket = useContext(SocketContext);

  function onStart() {
    socket.emit("start_game");
  }

  return (
    <>
      <Scoreboard username={username} players={room.players} />
      <div style={{ height: 260 }} />
      <motion.h2
        animate={{
          opacity: [1, 1, 0, 1],
        }}
        transition={{
          duration: 2,
          ease: [0.43, 0.13, 0.23, 0.96],
          loop: Infinity,
        }}
      >
        Waiting for other players...
      </motion.h2>
      <p
        style={{
          color: "#707070",
          textAlign: "center",
          marginBottom: 0,
          fontStyle: "italic",
        }}
      >
        Please ask your friends to enter this Room ID
      </p>
      <h2>{room.id}</h2>
      <Button onClick={onStart}>Start the Game</Button>
      <Button
        style={{ margin: "0 auto" }}
        small
        onClick={() => dispatch(changeStageAction(GAME_STAGES.landing))}
      >
        {BackIcon}
      </Button>
    </>
  );
}

export default WaitingRoom;
