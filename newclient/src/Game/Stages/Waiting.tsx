import { useContext } from "react";

import SocketContext from "Contexts/socket";

function Waiting() {
  const { data } = useContext(SocketContext);

  return (
    <>
      <h1>{data.game?.id}</h1>
      <ul>
        {data.game?.players.map((player) => (
          <li key={player.username}>{player.username}</li>
        ))}
      </ul>
      <button onClick={() => null}>Start Game</button>
    </>
  );
}

export default Waiting;
