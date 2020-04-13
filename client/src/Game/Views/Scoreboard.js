import React from "react";

function Scoreboard({ czar = "", username, players }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 10,
        right: 10,
        width: 140,
        paddingRight: 20,
      }}
    >
      <h4>Players</h4>
      {players.map((player, index) => (
        <div key={index}>
          {czar === player.username && "🧑‍⚖️"}
          {player.username}
          {username === player.username && <small> (You)</small>}:
          <strong style={{ float: "right" }}>{player.score}</strong>
        </div>
      ))}
    </div>
  );
}

export default Scoreboard;
