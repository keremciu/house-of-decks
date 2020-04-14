import React, { Fragment } from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { motion } from "framer-motion";

const style = css({
  width: "100%",
  marginTop: 10,
  marginBottom: 20,
  display: "flex",
  justifyContent: "space-around",
});

export default ({ children }) => <div css={style}>{children}</div>;

const whiteCardStyle = (props) =>
  css({
    fontWeight: "bold",
    background: "white",
    borderRadius: 4,
    padding: 10,
    width: "8%",
    height: 260,
    ...(props.onClick
      ? {
          cursor: "pointer",
        }
      : {}),
  });

export const WhiteCard = ({ children, ...props }) => (
  <motion.div
    css={whiteCardStyle(props)}
    {...props}
    {...(props.onClick
      ? {
          whileHover: {
            scale: 1.05,
          },
          whileTap: { scale: 1.12 },
        }
      : {})}
  >
    {children}
  </motion.div>
);

const blackCardStyle = (props) =>
  css({
    fontWeight: "bold",
    background: "black",
    color: "white",
    borderRadius: 4,
    padding: 10,
    width: "8%",
    height: 260,
    ...(props.onClick
      ? {
          cursor: "pointer",
        }
      : {}),
    "& span": {
      textDecoration: "underline",
    },
  });

export const BlackCard = ({ text, submittedCards = [], ...props }) => {
  let aggregatedText = text.replace(/_/g, "______");
  if (submittedCards.length) {
    if (text.indexOf("_") > -1) {
      const parts = text.split("_");
      aggregatedText = parts.map((part, index) => {
        return (
          <Fragment key={index}>
            {part}
            <span>{submittedCards[index]?.text.replace(/\./g, "")}</span>
          </Fragment>
        );
      });
    } else {
      aggregatedText = (
        <Fragment>
          {text}
          <br />
          <span>{submittedCards[0].text}</span>
        </Fragment>
      );
    }
  }
  return (
    <div css={blackCardStyle(props)} {...props}>
      {aggregatedText}
    </div>
  );
};
