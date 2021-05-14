import { useContext } from "react";

import SocketContext from "Contexts/socket";

function Waiting() {
  const { data, sendServer } = useContext(SocketContext);

  const onStart = () => {
    sendServer({
      action: "start",
      payload: { decks: ["base"] },
    });
  };

  return (
    <>
      <h1>{data.game?.id}</h1>
      <ul>
        {data.game?.players.map((player) => (
          <li key={player.username}>{player.username}</li>
        ))}
      </ul>
      <button onClick={onStart}>Start Game</button>
    </>
  );
}

export default Waiting;
