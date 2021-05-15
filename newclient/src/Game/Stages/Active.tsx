import { useContext } from "react";

import SocketContext from "Contexts/socket";

function Active() {
  const { data } = useContext(SocketContext);

  return (
    <>
      <h1>{data.game?.id}</h1>
      <ul>
        {data.game?.players.map((player) => (
          <li key={player.username}>{player.username}</li>
        ))}
      </ul>
      Game Started
    </>
  );
}

export default Active;
