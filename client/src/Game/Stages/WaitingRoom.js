import React, { useState, useContext } from "react";
import useClipboard from "react-use-clipboard";
import { motion } from "framer-motion";
import usePortal from "react-cool-portal";

import SocketContext from "SocketContext";
import { StoreContext } from "Store";
import { changeStageAction } from "Game/actions";
import { GAME_STAGES } from "Game/mappings";
import Button, { BackIcon } from "Components/Button";
import Scoreboard from "Game/Views/Scoreboard";
import DeckSelect from "Components/DeckSelect";

function WaitingRoom() {
  const {
    state: {
      game: { username, room },
    },
    dispatch,
  } = React.useContext(StoreContext);
  const socket = useContext(SocketContext);
  const { Portal, show, hide } = usePortal({
    defaultShow: false,
  });
  const [selectedDecks, setSelectedDecks] = useState({
    base: true,
  });

  const [isCopied, setCopied] = useClipboard(
    `${window.location.origin}/?room=${room.id}`,
    {
      successDuration: 1500,
    }
  );

  function onStart() {
    const decks = Object.keys(selectedDecks).filter(
      (deck) => selectedDecks[deck]
    );
    socket.emit("start_game", {
      decks,
    });
  }

  function onLeave() {
    dispatch(changeStageAction(GAME_STAGES.landing));
    window.history.replaceState("", "", "/");
    socket.emit("leave_room");
  }

  return (
    <>
      <Scoreboard
        username={username}
        players={room.players}
        showScore={false}
      />
      <div style={{ height: 180 }} />
      <div style={{ textAlign: "center" }}>
        <div
          onClick={setCopied}
          style={{
            cursor: "pointer",
          }}
        >
          <h1>{room.id}</h1>
          <p
            style={{
              color: "var(--color-gray)",
              fontFamily: "var(--serif-font)",
              marginBottom: 0,
            }}
          >
            Click to copy link and share with your friends.
          </p>
          <div style={{ height: 30 }}>{isCopied ? "Copied 👍" : ""}</div>
        </div>
        <motion.h2
          animate={{
            opacity: [1, 1, 0, 1],
          }}
          transition={{
            duration: 3,
            ease: [0.43, 0.13, 0.23, 0.96],
            loop: Infinity,
          }}
        >
          {room.host === username
            ? "Waiting for other players..."
            : "Waiting for host..."}
        </motion.h2>
      </div>
      <Portal style={{ width: "100%" }}>
        <DeckSelect
          handleClose={hide}
          selectedDecks={selectedDecks}
          setSelectedDecks={setSelectedDecks}
        />
      </Portal>
      {room.host === username && (
        <>
          <Button secondary onClick={show} wrapperStyle={{ paddingBottom: 0 }}>
            <svg
              width="36px"
              height="36px"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ paddingRight: 10 }}
            >
              <path d="M22.999765,8.02866909 C22.999765,7.93671667 22.999765,13.1522884 22.999765,13.1522884 C22.999765,13.1522884 23.0160687,13.8363884 22.7770576,14.1820251 C22.3143608,14.8511257 21.8532944,15.5215306 21.391902,16.1916094 C19.9969642,18.2168451 18.5743103,19.900357 17.2083929,21.9451571 C16.1114854,23.5869317 14.0370127,22.7655553 12.5093634,22.3693773 C7.35241956,21.0476971 4.67895187,20.3456632 4.48896034,20.2632756 C3.88681329,20.0019829 3.4586886,19.6496443 3.20458627,19.20626 L3.1138735,14.6756765 C3.08481697,14.0141661 3.18180546,13.5540689 3.40483899,13.2953848 C3.48603102,13.1949545 4.14267144,12.3853661 4.40352937,12.0899445 C3.90496465,11.9657109 3.40607386,11.8418034 2.90750915,11.7175698 C2.32742633,11.5731198 1.60941488,11.4834498 1.19921579,11.0086884 C0.668695974,10.3946941 1.32279723,9.81624161 1.71049733,9.3600663 C1.92853108,9.10355601 4.05515815,6.59707899 8.09037853,1.84063526 C8.97696511,1.06360555 9.62160482,0.899215068 10.8187671,1.05124707 C15.7260975,2.09652992 18.6651758,2.72590572 19.636002,2.93937446 C20.3341231,3.09295456 21.7290609,3.87585442 21.0635471,4.81168224 C20.6468265,5.39763436 20.230106,5.98358649 19.8133854,6.56953861 C20.3357534,6.67975108 20.8584475,6.78996356 21.3811416,6.90017603 C22.0094831,7.03256143 22.999765,7.20664054 22.999765,8.02866909 Z M14.8049132,16.1234603 C15.3008693,16.2405202 15.4671663,15.8997746 15.7130249,15.5740282 C17.6287003,13.0368588 19.5443757,10.4993633 21.4600511,7.96219388 C21.3038624,7.85915499 21.0645253,7.84317745 20.8861637,7.80502697 C20.5470484,7.7326389 20.2079331,7.66025082 19.8688177,7.58818882 C19.6461103,7.54058225 19.4234028,7.49330175 19.2006954,7.44569518 C19.1736314,7.43982587 19.1208076,7.54221261 19.1067865,7.56210303 C18.0666155,9.02551601 17.0264445,10.4895811 15.9865996,11.9533202 C15.6628097,12.4088433 15.3393459,12.8643665 15.015556,13.3198897 C14.3190653,14.3000633 12.8455441,14.1976766 11.8197203,13.9417097 C10.0374085,13.496947 8.25509669,13.0521842 6.47278489,12.6077475 C6.29148863,12.5624235 6.11051844,12.5174255 5.92922218,12.4721014 C5.84085656,12.4502545 5.28783775,13.2054382 5.21610182,13.2879346 C5.09480288,13.4274936 4.97350394,13.5673786 4.85187893,13.7069376 C4.81177203,13.753566 4.97709074,13.7972597 5.02274088,13.8080201 C5.18349458,13.8461705 5.34424828,13.8839949 5.50500197,13.9221454 C8.60497238,14.6558083 11.7049428,15.3897973 14.8049132,16.1234603 Z M9.83498814,2.14473599 C9.4961989,2.14473599 9.38696464,2.36581309 9.19458192,2.59667235 C8.8756831,2.97719886 8.55711036,3.35805143 8.23853761,3.73890401 C7.3014055,4.8583106 6.36459947,5.97771718 5.42779343,7.09744984 C4.51935569,8.18261883 3.61124403,9.26811388 2.70280629,10.3536089 C2.62389677,10.4478439 3.51146587,10.6474002 3.56983283,10.6617474 C4.38762244,10.8642383 5.20573812,11.0664032 6.02352773,11.2685681 C7.93952921,11.7423513 9.8555307,12.2161345 11.7715322,12.6902438 C12.1484719,12.7835005 12.5899739,12.9680575 12.9848476,12.9638186 C13.3220065,12.9638186 13.6102545,12.5161212 13.7938333,12.2624368 C13.8639388,12.1652673 13.9343705,12.0684237 14.0044761,11.9715802 C15.8526545,9.42104184 17.7008329,6.87017737 19.5486853,4.31963897 C19.5646628,4.30333535 19.1032703,4.18497107 19.0732717,4.17844962 C17.3450879,3.79466239 15.6165781,3.41087516 13.8883943,3.02708794 C12.9701744,2.82329268 10.2579041,2.14473599 9.83498814,2.14473599 Z" />
            </svg>{" "}
            Customize Cards
          </Button>
          {room.players.length > 1 && (
            <Button onClick={onStart}>Start the Game</Button>
          )}
        </>
      )}
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

export default WaitingRoom;
