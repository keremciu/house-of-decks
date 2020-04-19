import React, { useContext } from "react";
import SocketContext from "SocketContext";
import { StoreContext } from "Store";
import { changeStageAction } from "Game/actions";
import { GAME_STAGES } from "Game/mappings";

import Cards, { WhiteCard, BlackCard } from "Components/Cards";
import Button, { BackIcon } from "Components/Button";

import Judgement from "Game/Views/Judgement";
import Scoreboard from "Game/Views/Scoreboard";
import LastWinnerCard from "Game/Views/LastWinnerCard";

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

  let renderContent = () => (
    <>
      <BlackCard
        showAlways={true}
        isReadyToJudge={true}
        text={blackCard.text}
      />
      {Array(blackCard.pick)
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
        ))}
    </>
  );

  if (isCardCzar || hasSubmitted) {
    renderContent = () => (
      <Judgement
        isCardCzar={isCardCzar}
        isReadyToJudge={room.isReadyToJudge}
        blackCard={blackCard}
        submitters={room.submitters}
        onSubmitWinner={onSubmitWinner}
      />
    );
  }

  // remove back button and put leave
  return (
    <>
      <Scoreboard username={username} czar={room.czar} players={room.players} />
      {room.lastWinner && <LastWinnerCard lastWinner={room.lastWinner} />}
      <div style={{ height: 160 }} />
      {renderContent()}
      <Button
        wrapperStyle={{ marginTop: "auto" }}
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
