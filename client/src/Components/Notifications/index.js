import React from "react";
import { motion, AnimatePresence } from "framer-motion";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="white"
    strokeLinecap="round"
    {...props}
  />
);

export default ({ errors, onClose }) => (
  <ul css={notificationListStyle}>
    <AnimatePresence initial={false}>
      {errors.map((error, index) => (
        <motion.li
          key={index}
          positionTransition
          initial={{ opacity: 0, y: 50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
        >
          <Notification text={error} close={onClose} />
        </motion.li>
      ))}
    </AnimatePresence>
  </ul>
);

const Notification = ({ text, close }) => (
  <div css={notificationStyle}>
    {text}
    <button css={buttonStyle} onClick={close}>
      <svg width="23" height="23" viewBox="0 0 23 23">
        <Path d="M 3 16.5 L 17 2.5" />
        <Path d="M 3 2.5 L 17 16.346" />
      </svg>
    </button>
  </div>
);

const notificationStyle = css({
  display: "flex",
  alignItems: "center",
  padding: "24px",
  paddingRight: "84px",
});

const buttonStyle = css({
  position: "absolute",
  top: 8,
  right: 0,
  border: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "28px",
  width: "60px",
  height: "60px",
  background: "none",
  cursor: "pointer",
  "&:focus": {
    outline: "none",
  },
});

const notificationListStyle = css({
  position: "fixed",
  bottom: 0,
  right: 0,
  zIndex: 5,
  display: "flex",
  flexDirection: "column",
  listStyle: "none",
  justifyContent: "flex-end",
  li: {
    background: "#f44336",
    color: "white",
    margin: 10,
    flex: "0 0 60px",
    position: "relative",
    borderRadius: "10px",
  },
});
