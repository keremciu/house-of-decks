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
        <div style={{ position: "absolute", bottom: -25, width: "100%" }}>
          <svg width="1000" height="21" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 .041c56.996 12.607 114.661 19.256 172.996 19.947C260.497 21.025 301.458 6.492 398.13 4.76c96.674-1.733 158.794 6.607 331.231 5.256C844.32 9.113 934.533 5.789 1000 .04H0z"
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
