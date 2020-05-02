/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { motion } from "framer-motion";
import { SoundContext } from "Sounds/Context";
import { useContext, useState } from "react";
import { useField } from "formik";
import Tick from "Components/Tick";
import Modal from "Components/Modal";

import decksObject from "./decks.json";

const itemStyle = css({
  cursor: "pointer",
  width: 300,
  padding: "20px",
  borderBottom: "2px solid #e3eaf1",
  display: "flex",
  alignItems: "center",
  fontWeight: 900,
});

export default ({ items = decksObject.decks, handleClose }) => {
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
    <Modal handleClose={handleClose}>
      {items.map((deck) => (
        <div
          css={itemStyle}
          key={deck.key}
          onClick={() => toggleDeck(deck.key)}
        >
          <div style={{ paddingRight: 10 }}>
            <Tick
              isChecked={selectedDecks[deck.key]}
              setIsChecked={() => toggleDeck(deck.key)}
            />
          </div>
          {deck.title}
        </div>
      ))}
    </Modal>
  );
};
