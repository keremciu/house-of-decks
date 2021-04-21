import { useContext } from "react";
import SocketContext from 'Contexts/socket'

function WaitingRoom() {
  const { data } = useContext(SocketContext);

  return (
    <>
      <h1>{data.game?.id}</h1>
    </>
  );
}

export default WaitingRoom;