import React from "react";
import Cards, { WhiteCard, BlackCard } from "Components/Cards";

function Judgement({
  isReadyToJudge,
  isCardCzar,
  blackCard,
  submitters,
  onSubmitWinner,
}) {
  return (
    <>
      <h4>Submissions:</h4>
      {Array(blackCard.pick)
        .fill(null)
        .map((blackCard, submissionIndex) => (
          <Cards key={submissionIndex}>
            {submitters
              .sort(() => Math.random() - 0.5)
              .map((player, index) => (
                <WhiteCard
                  key={index}
                  {...(isCardCzar
                    ? { onClick: () => onSubmitWinner(player.username) }
                    : {})}
                >
                  {isReadyToJudge
                    ? player.submittedCards[submissionIndex].text
                    : "Waiting to play"}
                </WhiteCard>
              ))}
          </Cards>
        ))}
    </>
  );
}

export default Judgement;
