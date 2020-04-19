import React from "react";
import Scoreboard from "Game/Views/Scoreboard";
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
      <p>
        {isCardCzar &&
          isReadyToJudge &&
          "You need to choose the funniest black card"}
      </p>
      <Cards>
        {submitters
          .sort(() => Math.random() - 0.5)
          .map((player, index) => (
            <BlackCard
              key={index}
              text={blackCard.text}
              isReadyToJudge={isReadyToJudge}
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
