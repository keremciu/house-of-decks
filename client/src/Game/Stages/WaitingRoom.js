import React, { useContext } from "react";
import useClipboard from "react-use-clipboard";
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
  const [isCopied, setCopied] = useClipboard(
    `${window.location.origin}/?room=${room.id}`,
    {
      successDuration: 1500,
    }
  );

  function onStart() {
    socket.emit("start_game");
  }

  function onLeave() {
    dispatch(changeStageAction(GAME_STAGES.landing));
    window.history.replaceState("", "", "/");
    socket.emit("leave_room");
  }

  return (
    <>
      <Scoreboard username={username} players={room.players} />
      <div style={{ height: 260 }} />
      <div style={{ textAlign: "center" }}>
        <div
          onClick={setCopied}
          style={{
            cursor: "pointer",
          }}
        >
          <h1>{room.id}</h1>
          <p
            style={{
              color: "var(--color-gray)",
              fontFamily: "var(--serif-font)",
              marginBottom: 0,
            }}
          >
            Click to copy link and share with your friends.
          </p>
          <div style={{ height: 30 }}>{isCopied ? "Copied 👍" : ""}</div>
        </div>
        <motion.h2
          animate={{
            opacity: [1, 1, 0, 1],
          }}
          transition={{
            duration: 3,
            ease: [0.43, 0.13, 0.23, 0.96],
            loop: Infinity,
          }}
        >
          {room.host === username
            ? "Waiting for other players..."
            : "Waiting for host..."}
        </motion.h2>
      </div>
      {room.host === username && room.players.length > 1 && (
        <Button onClick={onStart}>Start the Game</Button>
      )}
      <Button small onClick={onLeave} wrapperStyle={{ marginTop: "auto" }}>
        {BackIcon}
      </Button>
    </>
  );
}

export default WaitingRoom;
