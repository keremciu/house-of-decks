import React from "react";
import { motion } from "framer-motion";
import Scoreboard from "Game/Views/Scoreboard";
import Cards, { WhiteCard, BlackCard } from "Components/Cards";

function Judgement({
  isReadyToJudge,
  isCardCzar,
  blackCard,
  submitters,
  onSubmitWinner,
}) {
  if (isReadyToJudge) {
    return (
      <>
        <h4>Submissions</h4>
        {isCardCzar && <p>Time to choose the funniest combination</p>}
        <Cards>
          {submitters
            .sort(() => Math.random() - 0.5)
            .map((player, index) => (
              <BlackCard
                key={index}
                text={blackCard.text}
                submittedCards={player.submittedCards}
                {...(isCardCzar && isReadyToJudge
                  ? { onClick: () => onSubmitWinner(player.username) }
                  : {})}
              />
            ))}
        </Cards>
      </>
    );
  }

  return (
    <>
      {isCardCzar && (
        <p>
          As <strong>JUDGE</strong> you read the black card
        </p>
      )}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1, 1, 1, 0],
        }}
        transition={{
          duration: 5,
          ease: [0.43, 0.13, 0.23, 0.96],
          loop: Infinity,
          delay: 5,
        }}
      >
        {isCardCzar
          ? "Waiting for horrible combinations..."
          : "Waiting for other horrible ones..."}
      </motion.h2>
    </>
  );
}

export default Judgement;
