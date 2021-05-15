type PlayersType = {
  username: string;
}[];

type ScoreboardProps = { username: string; czar: string; players: PlayersType };

function Scoreboard({ username, players }: ScoreboardProps) {
  return (
    <div className="scoreboard">
      <ul>
        {players.map((player) => (
          <li key={player.username}>
            {player.username}
            {username === player.username && <small> (You)</small>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Scoreboard;
