/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { motion } from "framer-motion";
import { SoundContext } from "Sounds/Context";
import { useContext, useState } from "react";
import Tick from "Components/Tick";
import Modal from "Components/Modal";

import decksObject from "./decks.json";

const itemStyle = css({
  cursor: "pointer",
  width: 360,
  padding: "20px",
  borderBottom: "2px solid #e3eaf1",
  display: "flex",
  alignItems: "center",
  fontSize: 15,
  fontWeight: 900,
});

const miniCardsWrapper = css({
  display: "flex",
  marginLeft: "auto",
  fontSize: 13,
  width: 106,
  justifyContent: "space-between",
});

const miniCardStyle = css({
  border: "2px solid black",
  background: "white",
  width: 14,
  height: 18,
  borderRadius: 2,
  marginRight: 4,
});

export default ({
  items = decksObject.decks,
  selectedDecks,
  setSelectedDecks,
  handleClose,
}) => {
  const { playCheck } = useContext(SoundContext);

  function toggleDeck(key) {
    if (
      Object.values(selectedDecks).filter(Boolean).length === 1 &&
      selectedDecks[key]
    ) {
      console.log("show error to user about there should be one deck");
      return;
    }
    setSelectedDecks({
      ...selectedDecks,
      [key]: !selectedDecks[key],
    });
    playCheck();
  }

  return (
    <Modal handleClose={handleClose}>
      {items.map((deck) => (
        <div
          css={itemStyle}
          key={deck.key}
          onClick={() => toggleDeck(deck.key)}
        >
          <div style={{ paddingRight: 10, height: 28 }}>
            <Tick
              isChecked={selectedDecks[deck.key]}
              setIsChecked={() => toggleDeck(deck.key)}
            />
          </div>
          <div style={{ width: 210 }}>{deck.title}</div>
          <div css={miniCardsWrapper} title="black and white card counts">
            <div style={{ display: "flex", width: 53, alignItems: "center" }}>
              <div
                css={miniCardStyle}
                style={{
                  background: "black",
                }}
              />
              {deck.blackCardCount}
            </div>
            <div style={{ display: "flex", width: 53, alignItems: "center" }}>
              <div css={miniCardStyle} />
              {deck.whiteCardCount}
            </div>
          </div>
        </div>
      ))}
    </Modal>
  );
};
