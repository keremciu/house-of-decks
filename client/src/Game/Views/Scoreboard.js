import React from "react";

function Scoreboard({ czar = "", username, players = [], showScore = true }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 10,
        right: 20,
        width: 160,
      }}
    >
      {!showScore && <h4 style={{ margin: "0px 0px 8px" }}>Players</h4>}
      <div style={{ display: "grid" }}>
        {players.map((player, index) => (
          <React.Fragment key={index}>
            <div style={{ gridColumn: 1 }}>
              {czar === player.username && "🧑‍⚖️"}
              {player.username}
              {username === player.username && <small> (You)</small>}
            </div>
            <div
              style={{ gridColumn: 2, fontWeight: "bold", textAlign: "right" }}
            >
              {showScore && player.score}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default Scoreboard;
