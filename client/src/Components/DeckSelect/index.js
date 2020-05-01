/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { motion } from "framer-motion";
import { SoundContext } from "Sounds/Context";
import { useContext, useState } from "react";
import { useField } from "formik";
import Button from "Components/Button";
import Tick from "Components/Tick";

import decksObject from "./decks.json";

const style = css({
  position: "fixed",
  top: -260,
  left: 0,
  width: "100%",
  height: "100vh",
  background: "#efeeee",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  zIndex: 100,
  "@media only screen and (max-width: 600px)": {
    top: -300,
  },
});

const itemsWrapper = css({
  overflowY: "auto",
  width: "100%",
  height: "calc(100% - 112px)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const itemStyle = css({
  cursor: "pointer",
  width: 300,
  padding: "20px 0",
  borderBottom: "1px solid #dedede",
  display: "flex",
  alignItems: "center",
});

const footer = css({});

const DeckSelect = ({ items = decksObject.decks, handleClose }) => {
  const { playCheck } = useContext(SoundContext);
  const [field, meta, helpers] = useField("decks");

  const selectedDecks = meta.value;
  const setSelectedDecks = helpers.setValue;

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
    <div css={style}>
      <div css={itemsWrapper}>
        {items.map((deck) => (
          <div
            css={itemStyle}
            key={deck.key}
            onClick={() => toggleDeck(deck.key)}
          >
            <Tick
              isChecked={selectedDecks[deck.key]}
              setIsChecked={() => toggleDeck(deck.key)}
            />
            {deck.title}
          </div>
        ))}
      </div>
      <div css={footer}>
        <Button
          secondary
          onClick={handleClose}
          wrapperStyle={{ paddingTop: 0 }}
        >
          Save Selection
        </Button>
      </div>
    </div>
  );
};

export default DeckSelect;
