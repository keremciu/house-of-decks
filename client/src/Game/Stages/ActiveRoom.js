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
    dispatch,
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

  function animateHere(e) {
    console.log(e);
  }

  return (
    <>
      <div
        style={{
          position: "relative",
          width: "100%",
          background: "#333",
          height: "200",
        }}
      >
        <BlackCard>{blackCard.text}</BlackCard>
        <div style={{ position: "absolute", bottom: -54, width: "100%" }}>
          <svg width="800" height="60" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M 175 0 Q 255 105 350 15 C 395 20 480 20 665 10 A 100 0 0 0 0 800 0 L 5 0 Z"
              fill="#333"
              fillRule="evenodd"
            />
          </svg>
        </div>
      </div>
      {Array(blackCard.pick)
        .fill(null)
        .map((blackCard, submissionIndex) => (
          <Cards key={submissionIndex}>
            {cards.map((card, index) => (
              <WhiteCard
                key={index}
                onClick={() => onSubmitCard(card)}
                onMouseEnter={animateHere}
              >
                {card.text}
              </WhiteCard>
            ))}
          </Cards>
        ))}
    </>
  );
}

export default ActiveRoom;
