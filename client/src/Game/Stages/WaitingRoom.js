import React, { useContext } from "react";
import SocketContext from "SocketContext";
import { StoreContext } from "Store";
import { changeStageAction } from "Game/actions";
import { GAME_STAGES } from "Game/mappings";
import { motion } from "framer-motion";

import Button from "Components/Button";

function WaitingRoom() {
  const {
    state: { game },
    dispatch,
  } = React.useContext(StoreContext);
  const socket = useContext(SocketContext);

  function onStart() {
    socket.emit("start_game");
  }

  return (
    <>
      <motion.h2
        animate={{
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 1.5,
          ease: [0.43, 0.13, 0.23, 0.96],
          loop: Infinity,
        }}
      >
        Waiting for other players
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
      <h2>{game.room.id}</h2>
      Joined players
      <ul>
        {game?.room.players?.map((player) => (
          <li key={player}>
            {player} {player === game.username && "(You)"}
          </li>
        ))}
      </ul>
      <Button onClick={onStart}>Start the Game</Button>
      <Button
        style={{ margin: "0 auto" }}
        small
        onClick={() => dispatch(changeStageAction(GAME_STAGES.landing))}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </Button>
    </>
  );
}

export default WaitingRoom;
