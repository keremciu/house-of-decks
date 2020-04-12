import React, { useContext } from "react";
import SocketContext from "SocketContext";
import { StoreContext } from "Store";
import { changeStageAction } from "Game/actions";
import { GAME_STAGES } from "Game/mappings";

import Cards, { WhiteCard, BlackCard } from "Components/Cards";
import Button, { BackIcon } from "Components/Button";

import JudgeView from "Game/Views/JudgeView";

function ActiveRoom() {
  const {
    state: {
      game: { room, username },
    },
    dispatch,
  } = React.useContext(StoreContext);
  const socket = useContext(SocketContext);

  const { cards, submittedCards, hasSubmitted } = room.players.find(
    (p) => p.username === username
  );
  const isCardCzar = room.czar === username;
  const blackCard = room.blackCard;

  function onSubmitCard(card) {
    socket.emit("submit_card", card);
  }

  function onSubmitWinner(player) {
    socket.emit("submit_winner", player);
  }

  let renderContent = () =>
    Array(blackCard.pick)
      .fill(null)
      .map((blackCard, submissionIndex) => (
        <Cards key={submissionIndex}>
          {submittedCards.length === 1 && submissionIndex === 0
            ? submittedCards.map((card, index) => (
                <WhiteCard key={index}>{card.text}</WhiteCard>
              ))
            : cards.map((card, index) => (
                <WhiteCard key={index} onClick={() => onSubmitCard(card)}>
                  {card.text}
                </WhiteCard>
              ))}
        </Cards>
      ));

  if (isCardCzar || hasSubmitted) {
    renderContent = () => (
      <JudgeView
        isCardCzar={isCardCzar}
        isReadyToJudge={room.isReadyToJudge}
        blackCard={blackCard}
        players={room.players}
        onSubmitWinner={onSubmitWinner}
      />
    );
  }

  // remove back button and put leave
  return (
    <>
      <div style={{ height: 160 }} />
      <BlackCard>{blackCard.text}</BlackCard>
      {renderContent()}
      <Button
        style={{ margin: "0 auto" }}
        small
        onClick={() => dispatch(changeStageAction(GAME_STAGES.landing))}
      >
        {BackIcon}
      </Button>
    </>
  );
}

export default ActiveRoom;
