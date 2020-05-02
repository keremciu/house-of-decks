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
  background: "#ecf0f3",
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
  boxShadow: "inset -10px 0px 30px rgba(0,0,0,0.1)",
});

const itemStyle = css({
  cursor: "pointer",
  width: 300,
  padding: "20px",
  borderBottom: "2px solid #e3eaf1",
  display: "flex",
  alignItems: "center",
  fontWeight: 900,
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
      <div style={{ paddingRight: 10 }}>
        <Tick
          isChecked={selectedDecks[deck.key]}
          setIsChecked={() => toggleDeck(deck.key)}
        />
      </div>
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
        <Button small onClick={handleClose} wrapperStyle={{ paddingTop: 0 }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="16"
            viewBox="0 0 21 16"
            fill="currentColor"
          >
            <path d="M9.05133983,15.6474189 C8.81698683,15.8823728 8.50932342,15.9995493 8.20166,15.9995493 C7.89399658,15.9995493 7.58633317,15.8823728 7.35198017,15.6474189 C7.03910891,15.3345476 4.70577557,13.1358546 0.351980172,9.05133983 C-0.117326724,8.58203294 -0.117326724,7.82128707 0.351980172,7.35198017 C0.820686159,6.88267328 1.58263384,6.88267328 2.05133983,7.35198017 L7.99969953,13.3003399 L18.9486602,0.351980173 C19.4179671,-0.117326724 20.1787129,-0.117326724 20.6480198,0.351980173 C21.1173267,0.821287066 21.1173267,1.58203294 20.6480198,2.05133983 L9.05133983,15.6474189 Z" />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default DeckSelectField;
