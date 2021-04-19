import { useHistory } from "react-router-dom";

function Landing() {
  const history = useHistory();
  return (
    <>
      <button onClick={() => history.push("/create")}>Start Game</button>
      <button onClick={() => history.push("/join")}>Join Game</button>
    </>
  );
}

export default Landing;
