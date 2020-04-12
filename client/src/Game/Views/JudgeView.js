import React from "react";
import Cards, { WhiteCard, BlackCard } from "Components/Cards";

function JudgeView({
  isReadyToJudge,
  isCardCzar,
  blackCard,
  players,
  onSubmitWinner,
}) {
  return (
    <>
      <h4>Submissions:</h4>
      {Array(blackCard.pick)
        .fill(null)
        .map((blackCard, submissionIndex) => (
          <Cards key={submissionIndex}>
            {players
              .sort(() => Math.random() - 0.5)
              .map((player, index) => (
                <WhiteCard
                  key={index}
                  {...(isCardCzar
                    ? { onClick: () => onSubmitWinner(player) }
                    : {})}
                >
                  {isReadyToJudge
                    ? players.submittedCards[submissionIndex].text
                    : "Waiting to play"}
                </WhiteCard>
              ))}
          </Cards>
        ))}
    </>
  );
}

export default JudgeView;
