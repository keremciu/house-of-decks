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

const blackCardStyle = css({
  fontWeight: "bold",
  background: "black",
  color: "white",
  borderRadius: 4,
  padding: 10,
  width: "8%",
  height: 260,
  "& span": {
    textDecoration: "underline",
  },
});

export const BlackCard = ({ text, submittedCards = [] }) => {
  let aggregatedText = text.replace(/_/g, "______");
  if (submittedCards.length) {
    if (text.indexOf(/_/g) > -1) {
      let index = 0;
      aggregatedText = text.replace(/_/g, function (match) {
        return submittedCards[index++].text;
      });
    } else {
      aggregatedText = text.replace(/\?/g, function (match) {
        return (
          <span>
            {match} {submittedCards[0].text}
          </span>
        );
      });
    }
  }
  return <div css={blackCardStyle}>{aggregatedText}</div>;
};
