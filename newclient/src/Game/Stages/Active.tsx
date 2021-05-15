import { useContext } from "react";

import SocketContext from "Contexts/socket";
import Scoreboard from "Components/Scoreboard";

function Active() {
  const { data } = useContext(SocketContext);

  return (
    <>
      <h1>{data.game?.id}</h1>
      {data.game && data.player && (
        <Scoreboard
          username={data.player.username}
          czar={data.game.czar}
          players={data.game.players}
        />
      )}
      Game Started
    </>
  );
}

export default Active;
