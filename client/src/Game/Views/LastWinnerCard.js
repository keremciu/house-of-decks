import React from "react";
import { BlackCard } from "Components/Cards";

function LastWinnerCard({ lastWinner }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 140,
        border: "1px solid #808080",
        background: "black",
        color: "white",
      }}
    >
      <h6 style={{ margin: "5px 0px" }}>
        Last Winner: {lastWinner.player.username} 🥳
      </h6>
      <BlackCard
        style={{
          width: "100%",
          fontSize: 11,
          height: 140,
          boxSizing: "border-box",
          padding: 0,
        }}
        text={lastWinner.blackCard.text}
        isReadyToJudge={true}
        submittedCards={lastWinner.submittedCards}
      />
    </div>
  );
}

export default LastWinnerCard;
