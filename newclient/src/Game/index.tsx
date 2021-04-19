import { useEffect, useContext } from 'react'
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import Landing from './Stages/Landing'
import Create from './Stages/Create'
import SocketContext from 'Contexts/socket'

const Game = () => {
  const history = useHistory()
  const { data } = useContext(SocketContext);

  useEffect(() => {
    if (data.game) {
      history.push(data.game.id);
    }
  }, [data, history]);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route path="/create">
          <Create />
        </Route>
      </Switch>
    </Router>
  );
};

export default Game;