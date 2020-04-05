import React, { useContext } from "react";
import SocketContext from "SocketContext";
import { StoreContext } from "Store";
import { changeStageAction } from "Game/actions";
import { GAME_STAGES } from "Game/mappings";

import Cards, { WhiteCard, BlackCard } from "Components/Cards";
import Button from "Components/Button";

import SubmittedCards from "Game/Views/SubmittedCards";

function ActiveRoom() {
  const {
    state: { game },
    dispatch
  } = React.useContext(StoreContext);
  const socket = useContext(SocketContext);

  const cards = game.room.playerCards[game.username];
  const isCardCzar = game.room.czar === game.username;
  const blackCard = game.room.blackCard;
  const isPlayed = game.room.playersSubmitted[game.username];

  function onSubmitCard(card) {
    socket.emit("submit_card", card);
  }

  function onSubmitWinner(player) {
    socket.emit("submit_winner", player);
  }

  if (isCardCzar || isPlayed) {
    return (
      <SubmittedCards
        isCardCzar={isCardCzar}
        onSubmitWinner={onSubmitWinner}
        blackCard={blackCard}
        readyToJudge={game.room.readyToJudge}
        playedCards={game.room.playedCards}
        playersSubmitted={game.room.playersSubmitted}
      />
    );
  }

  return (
    <>
      <BlackCard>{blackCard.text}</BlackCard>
      {Array(blackCard.pick)
        .fill(null)
        .map((blackCard, submissionIndex) => (
          <Cards key={submissionIndex}>
            {cards.map((card, index) => (
              <WhiteCard key={index} onClick={() => onSubmitCard(card)}>
                {card.text}
              </WhiteCard>
            ))}
          </Cards>
        ))}
    </>
  );
}

export default ActiveRoom;
