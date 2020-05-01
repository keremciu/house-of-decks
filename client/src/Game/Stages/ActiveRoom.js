import React, { useEffect, useContext } from "react";
import useSound from "use-sound";

import SocketContext from "SocketContext";
import { StoreContext } from "Store";
import { changeStageAction } from "Game/actions";
import { GAME_STAGES } from "Game/mappings";

import { SoundContext } from "Sounds/Context";
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
  const { playCard, playJudge } = useContext(SoundContext);

  useEffect(() => {
    if (room.isReadyToJudge) {
      playJudge();
    }
  }, [room.isReadyToJudge]);

  const { cards, submittedCards, hasSubmitted } = room.players.find(
    (p) => p.username === username
  );
  const isCardCzar = room.czar === username;
  const blackCard = room.blackCard;

  function onSubmitCard(card) {
    playCard();
    socket.emit("submit_card", card);
  }

  function onSubmitWinner(player) {
    socket.emit("submit_winner", player);
  }

  function onLeave() {
    dispatch(changeStageAction(GAME_STAGES.landing));
    window.history.replaceState("", "", "/");
    socket.emit("leave_room");
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

  return (
    <>
      <Scoreboard username={username} czar={room.czar} players={room.players} />
      {room.lastWinner && <LastWinnerCard lastWinner={room.lastWinner} />}
      <div style={{ height: 160 }} />
      {renderContent()}
      <Button
        small
        onClick={onLeave}
        wrapperStyle={{ marginTop: "auto", marginBottom: 20 }}
      >
        {BackIcon}
      </Button>
    </>
  );
}

export default ActiveRoom;
