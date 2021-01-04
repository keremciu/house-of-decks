import { useNavigate } from "react-router-dom";

import Button from "Components/Button";

function Landing() {
  const navigate = useNavigate();
  return (
    <>
      <Button onClick={() => navigate("create")}>Start Game</Button>
      <Button onClick={() => navigate("join")}>Join Game</Button>
    </>
  );
}

export default Landing;
