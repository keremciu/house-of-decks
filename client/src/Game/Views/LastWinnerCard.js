import React from "react";
import { BlackCard } from "Components/Cards";
import { motion } from "framer-motion";

function LastWinnerCard({ winnerAnimation, lastWinner }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 4,
        left: 4,
        width: "100%",
        pointerEvents: "none",
      }}
    >
      <motion.div animate={winnerAnimation}>
        <div
          style={{
            width: 140,
            borderRadius: "4px",
            background: "black",
            padding: "0px 6px 8px",
            color: "white",
          }}
        >
          <h6
            style={{
              display: "flex",
              alignItems: "center",
              margin: 0,
              padding: "5px 0px",
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ fontStyle: "oblique", paddingRight: 6 }}>
              Last Winner
            </span>
            <strong
              style={{
                marginLeft: "auto",
                background: "blueviolet",
                borderRadius: "5px",
                padding: "2px 4px",
                whiteSpace: "nowrap",
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
            submittedCards={lastWinner.submittedCards}
          />
        </div>
      </motion.div>
    </div>
  );
}

export default LastWinnerCard;
