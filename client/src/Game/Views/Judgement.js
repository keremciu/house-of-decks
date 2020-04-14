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
      <Cards>
        {submitters
          .sort(() => Math.random() - 0.5)
          .map((player, index) => (
            <BlackCard
              key={index}
              text={isReadyToJudge ? blackCard.text : "Waiting to play"}
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

export default Judgement;
