import React, { useRef, useEffect, useContext } from "react";
import useSound from "use-sound";
import canvasConfetti from "canvas-confetti";
import { useAnimation } from "framer-motion";

import SocketContext from "SocketContext";
import { StoreContext } from "Store";
import { changeStageAction } from "Game/actions";
import { GAME_STAGES } from "Game/mappings";

import { SoundContext } from "Sounds/Context";
import Cards, { WhiteCard, BlackCard } from "Components/Cards";
import Button, { BackIcon } from "Components/Button";
import Canvas from "Components/Canvas";

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
  // {stage === GAME_STAGES.active && (
  //   <NudgeButton disabled={!isNudgeReady} />
  // )}
  const socket = useContext(SocketContext);
  const { playCard, playJudge, playWinner } = useContext(SoundContext);
  const winnerCanvas = useRef(null);
  const winnerAnimation = useAnimation();
  let confetti;

  useEffect(() => {
    if (room.isReadyToJudge) {
      playJudge();
    }
  }, [room.isReadyToJudge]);

  useEffect(() => {
    if (!confetti) {
      confetti = canvasConfetti.create(winnerCanvas.current, {
        resize: true,
        useWorker: true,
      });
    }
    if (!!room.lastWinner) {
      setTimeout(() => {
        confetti({
          particleCount: 100,
          angle: 60,
          spread: 70,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 100,
          angle: 120,
          spread: 70,
          origin: { x: 1 },
        });
        playWinner();
      }, 200);
      async function runWinnerAnimation() {
        await winnerAnimation.start({
          x: "100%",
          y: "-200%",
          scale: 2.2,
          transition: {
            duration: 0,
          },
        });
        await winnerAnimation.start({
          x: "100%",
          y: "200%",
          scale: 2.2,
          transition: {
            duration: 0.6,
          },
        });
        winnerAnimation.start({
          x: "0%",
          y: "0%",
          scale: 1,
          transition: {
            delay: 2.8,
            duration: 0.4,
          },
        });
      }
      runWinnerAnimation();
    }
  }, [room.lastWinner?.blackCard.text]);

  const { cards, submittedCards, hasSubmitted, isWaiting } = room.players.find(
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

  const submissionIndex = submittedCards.length + 1;
  let renderContent = () => (
    <>
      {blackCard.pick > 1 && (
        <p>
          {submissionIndex} pick of {blackCard.pick}
        </p>
      )}
      <Cards>
        {cards.map((card, index) => (
          <WhiteCard key={index} onClick={() => onSubmitCard(card)}>
            {card.text}
          </WhiteCard>
        ))}
      </Cards>
    </>
  );

  if (isCardCzar || hasSubmitted || isWaiting) {
    renderContent = () => (
      <Judgement
        isWaiting={isWaiting}
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
      <Canvas ref={winnerCanvas} />
      <Scoreboard username={username} czar={room.czar} players={room.players} />
      {room.lastWinner && (
        <LastWinnerCard
          winnerAnimation={winnerAnimation}
          lastWinner={room.lastWinner}
        />
      )}
      <div style={{ height: 160 }} />
      {!room.isReadyToJudge && (
        <BlackCard
          showAlways={true}
          text={blackCard.text}
          submittedCards={submittedCards}
        />
      )}
      {renderContent()}
      <Button
        small
        onClick={onLeave}
        wrapperStyle={{ paddingBottom: 16, marginTop: "auto" }}
      >
        {BackIcon}
      </Button>
    </>
  );
}

export default ActiveRoom;
