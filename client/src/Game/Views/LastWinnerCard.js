import React from "react";
import { BlackCard } from "Components/Cards";

function LastWinnerCard({ lastWinner }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 4,
        left: 4,
        padding: "0px 6px 8px",
        width: 140,
        background: "black",
        color: "white",
        borderRadius: "4px",
      }}
    >
      <h6 style={{ margin: "5px 0px" }}>
        Last Winner{" "}
        <strong
          style={{
            background: "blueviolet",
            borderRadius: "5px",
            padding: "2px 4px",
          }}
        >
          {lastWinner.player.username} 🥳
        </strong>
      </h6>
      <BlackCard
        style={{
          width: "100%",
          fontSize: 11,
          height: "auto",
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
