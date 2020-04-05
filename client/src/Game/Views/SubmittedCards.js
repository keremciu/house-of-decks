import React from "react";
import Cards, { WhiteCard, BlackCard } from "Components/Cards";

function SubmittedCards({
  blackCard,
  playedCards,
  playersSubmitted,
  readyToJudge,
  isCardCzar,
  onSubmitWinner
}) {
  console.log(playersSubmitted);
  console.log(playedCards);
  return (
    <>
      <BlackCard>{blackCard.text}</BlackCard>
      <h2>Submissions:</h2>
      {Array(blackCard.pick)
        .fill(null)
        .map((blackCard, submissionIndex) => (
          <Cards key={submissionIndex}>
            {Object.keys(playersSubmitted)
              .sort(() => Math.random() - 0.5)
              .map((player, index) => (
                <WhiteCard
                  key={index}
                  {...(isCardCzar
                    ? { onClick: () => onSubmitWinner(player) }
                    : {})}
                >
                  {readyToJudge
                    ? playedCards[player][submissionIndex].text
                    : "Waiting to play"}
                </WhiteCard>
              ))}
          </Cards>
        ))}
    </>
  );
}

export default SubmittedCards;
