import React from "react";
import { BlackCard } from "Components/Cards";
import { motion } from "framer-motion";

const transition = {
  duration: 1,
  ease: [0.43, 0.13, 0.23, 0.96],
};

const stageVariants = {
  exit: { x: "50%", opacity: 0, transition },
  enter: {
    x: "0%",
    opacity: 1,
    transition,
  },
};

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
          <h6 style={{ margin: "5px 0px" }}>
            Last Winner{" "}
            <strong
              style={{
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
