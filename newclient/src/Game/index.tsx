import { useEffect, useContext } from 'react'
import { Switch, Route, useHistory } from "react-router-dom";
import Landing from './Stages/Landing'
import Create from './Stages/Create'
// import Join from './Stages/Join'
// import Active from './Stages/Active'
import Waiting from './Stages/Waiting'
import SocketContext from 'Contexts/socket'

const Room = () => {
  // if (!data?.game) return <Join />
  // if (data.game.hasStarted) {
  //   return <Active />);
  // }
  return <Waiting />
};

const Game = () => {
  const history = useHistory()
  const { data } = useContext(SocketContext);

  useEffect(() => {
    if (data.game) {
      history.push(data.game.id);
    }
  }, [data, history]);

  return (
    <Switch>
      <Route exact path="/">
        <Landing />
      </Route>
      <Route path="/create">
        <Create />
      </Route>
      <Route path="/:gameid">
        <Room />
      </Route>
    </Switch>
  );
};

export default Game;