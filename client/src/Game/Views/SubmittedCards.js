import React from "react";
import Cards, { WhiteCard, BlackCard } from "Components/Cards";

function SubmittedCards({ blackCard, playedCards, playersSubmitted }) {
  return (
    <>
      <BlackCard>{blackCard.text}</BlackCard>
      <h2>Submissions:</h2>
      {Array(blackCard.pick)
        .fill(null)
        .map((blackCard, index) => (
          <Cards>
            {Object.keys(playersSubmitted).map((player, index) => (
              <WhiteCard key="index">
                {playersSubmitted[player]
                  ? playedCards[player][index].text
                  : "Waiting to play"}
              </WhiteCard>
            ))}
          </Cards>
        ))}
    </>
  );
}

export default SubmittedCards;
