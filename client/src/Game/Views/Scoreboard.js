import React from "react";

function Scoreboard({ czar = "", username, players = [] }) {
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
      <h4 style={{ margin: 0 }}>Players</h4>
      <div style={{ display: "grid" }}>
        {players.map((player, index) => (
          <React.Fragment key={index}>
            <div style={{ gridColumn: 1 }}>
              {czar === player.username && "🧑‍⚖️"}
              {player.username}
              {username === player.username && <small> (You)</small>}:
            </div>
            <div style={{ gridColumn: 2, fontWeight: "bold" }}>
              {player.score}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default Scoreboard;
