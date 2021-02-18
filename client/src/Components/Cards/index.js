import React, { Fragment } from "react";
import styled from "@emotion/styled";
import { m as motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

const Wrapper = styled.div({
  width: "100%",
  marginTop: 10,
  marginBottom: 20,
  display: "flex",
  justifyContent: "space-around",
  "@media only screen and (max-width: 900px)": {
    flexWrap: "wrap",
  },
});

const Cards = ({ children }) => <Wrapper role="list">{children}</Wrapper>;

export default Cards;

const StyledWhiteCard = styled(motion.div)((props) => ({
  fontWeight: "bold",
  background: "white",
  borderRadius: 4,
  padding: 10,
  width: "10%",
  "@media only screen and (max-width: 900px)": {
    width: "40%",
    height: "auto",
    marginBottom: 10,
  },
  height: 260,
  ...(props.onClick
    ? {
        cursor: "pointer",
      }
    : {}),
}));

export const WhiteCard = ({ children, ...props }) => {
  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 });
  return (
    <StyledWhiteCard
      role="listitem"
      {...props}
      {...(props.onClick
        ? {
            ...(isDesktopOrLaptop && {
              whileHover: {
                scale: 1.05,
              },
            }: {}),
            whileTap: { scale: isDesktopOrLaptop ? 1.12 : 1.05 },
          }
        : {})}
    >
      {children}
    </StyledWhiteCard>
  );
};

const StyledBlackCard = styled(motion.div)((props) => ({
  fontWeight: "bold",
  background: "black",
  color: "white",
  borderRadius: 4,
  padding: 10,
  width: "10%",
  "@media only screen and (max-width: 900px)": {
    width: "40%",
    marginBottom: 10,
  },
  height: 260,
  ...(props.showAlways
    ? {
        "@media only screen and (max-width: 900px)": {
          position: "sticky",
          top: 0,
          width: "90%",
          zIndex: 50,
          height: "auto",
        },
      }
    : {}),
  ...(props.onClick
    ? {
        cursor: "pointer",
      }
    : {}),
  "& span": {
    textDecoration: "underline",
  },
}));

export const BlackCard = ({ text, submittedCards = [], ...props }) => {
  let aggregatedText = text.replace(/_/g, "______");
  if (submittedCards.length) {
    if (text.indexOf("_") > -1) {
      const parts = text.split("_");
      aggregatedText = parts.map((part, index) => {
        return (
          <Fragment key={index}>
            {part}
            <span>
              {submittedCards[index] || index === parts.length - 1
                ? submittedCards[index]?.text.replace(/\./g, "")
                : "______"}
            </span>
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
    <StyledBlackCard
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
      {aggregatedText}
    </StyledBlackCard>
  );
};
