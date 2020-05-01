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
  top: 0,
  left: 0,
  width: "100%",
  height: "100vh",
  background: "#efeeee",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  zIndex: 100,
});

const itemsWrapper = css({
  overflowY: "auto",
  width: "100%",
  height: "calc(100vh - 112px)",
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

const footer = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const DeckSelect = ({ items }) => {
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

  return items.map((deck) => (
    <div css={itemStyle} key={deck.key} onClick={() => toggleDeck(deck.key)}>
      <Tick
        isChecked={selectedDecks[deck.key]}
        setIsChecked={() => toggleDeck(deck.key)}
      />
      {deck.title}
    </div>
  ));
};

const DeckSelectField = ({ items = decksObject.decks, handleClose }) => {
  return (
    <div css={style}>
      <div css={itemsWrapper}>
        <DeckSelect items={items} />
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

export default DeckSelectField;
