import React, { useRef, useEffect, useContext } from "react";
import canvasConfetti from "canvas-confetti";
import { useAnimation } from "framer-motion";
import { useNavigate } from "react-router-dom";

import SocketContext from "SocketContext";

import { SoundContext } from "Sounds/Context";
import Cards, { WhiteCard, BlackCard } from "Components/Cards";
import Button, { BackIcon } from "Components/Button";
import Canvas from "Components/Canvas";

import Judgement from "Game/Views/Judgement";
import Scoreboard from "Game/Views/Scoreboard";
import LastWinnerCard from "Game/Views/LastWinnerCard";

function ActiveRoom() {
  // {stage === GAME_STAGES.active && (
  //   <NudgeButton disabled={!isNudgeReady} />
  // )}
  const navigate = useNavigate();
  const socket = useContext(SocketContext);
  const {
    data: { game, player },
  } = socket;
  const { playCard, playJudge, playWinner } = useContext(SoundContext);
  const winnerCanvas = useRef(null);
  const winnerAnimation = useAnimation();

  useEffect(() => {
    if (game.isReadyToJudge) {
      playJudge();
    }
  }, [game.isReadyToJudge, playJudge]);

  // winner animation should be part of LastWinner components
  // TODO: This is buggy right now
  useEffect(() => {
    let confetti;
    if (!confetti) {
      confetti = canvasConfetti.create(winnerCanvas.current, {
        resize: true,
        useWorker: true,
      });
    }
    if (!!game.lastWinner && game.lastWinner?.blackCard.text) {
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
  }, [game.lastWinner?.blackCard.text, playWinner, winnerAnimation, game.lastWinner]);
  // }, [game.lastWinner, playWinner, winnerAnimation]);
  // you need to find a good thing to focus for winnerAnimation

  const { cards, submittedCards, hasSubmitted, isWaiting } = game.players.find(
    (p) => p.username === player.username
  );
  const isCardCzar = game.czar === player.username;
  const blackCard = game.blackCard;

  function onSubmitCard(card) {
    playCard();
    socket.sendServer({
      action: "submit_card",
      payload: {
        username: player.username,
        card,
      },
    });
  }

  function onSubmitWinner(winner) {
    socket.sendServer({
      action: "submit_winner",
      payload: winner,
    });
  }

  function onLeave() {
    navigate("/");
    socket.sendServer({
      action: "leave_room",
    });
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
          <WhiteCard aria-setsize={cards.length} aria-posinset={index} key={index} onClick={() => onSubmitCard(card)}>
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
        czar={game.czar}
        isCardCzar={isCardCzar}
        isReadyToJudge={game.isReadyToJudge}
        blackCard={blackCard}
        submitters={game.submitters}
        onSubmitWinner={onSubmitWinner}
      />
    );
  }

  return (
    <>
      <Canvas ref={winnerCanvas} />
      <Scoreboard
        username={player.username}
        czar={game.czar}
        players={game.players}
      />
      {game.lastWinner && (
        <LastWinnerCard
          winnerAnimation={winnerAnimation}
          lastWinner={game.lastWinner}
        />
      )}
      <div style={{ height: 160 }} />
      {!game.isReadyToJudge && (
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
