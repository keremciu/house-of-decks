/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { motion } from "framer-motion";

const style = (props) =>
  css({
    boxSizing: "border-box",
    appearance: "none",
    display: "block",
    width: 240,
    fontSize: 20,
    fontWeight: 700,
    padding: 0,
    margin: 0,
    marginTop: 20,
    border: "none",
    cursor: "pointer",
    outline: "none",
    borderRadius: 100,
    boxShadow:
      "rgb(255,255,255) -20px -20px 40px 0px, #cbcaca 20px 20px 40px 0px",
    background: "linear-gradient(145deg, #ffffff, #d7d6d6)",
    "@media (hover: hover)": {
      "&:hover > span": {
        boxShadow: "rgb(255,255,255) inset 2px 2px 0px 0px",
      },
    },
    "&:active": {
      "& > span": {
        background: "rgb(236, 232, 227)",
        boxShadow:
          "inset 0px 6px 4px rgba(191, 171, 136, 0.48),inset 14px 14px 36px rgba(191, 171, 136, 0.48)",
      },
    },
    ...(props.small
      ? {
          height: 60,
          width: 60,
          background: "#efeeee",
          color: "var(--color-gray)",
          fontWeight: 500,
          boxShadow:
            "rgb(245,245,245) -10px -10px 20px 0px, rgb(224, 224, 224) 10px 10px 20px 0px",
          "@media (hover: hover)": {
            "&:hover > span ": {
              boxShadow: "none",
            },
          },
        }
      : {
          height: 100,
        }),
  });

const innerStyle = css({
  borderRadius: 100,
  display: "flex",
  flex: "1",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
});

export default ({ children, ...props }) => (
  <div style={{ padding: 20, borderRadius: 100 }}>
    <motion.button
      type="button"
      css={style(props)}
      style={props.style}
      whileHover={{
        boxShadow:
          "rgb(255,255,255) -10px -15px 30px 0px, #cbcaca 10px 15px 20px 0px",
        scale: 1.05,
      }}
      whileTap={{
        y: "-3",
        scale: 0.9,
        boxShadow:
          "rgb(239, 238, 238) -10px -15px 30px 0px, rgb(239, 238, 238) 10px 15px 20px 0px",
      }}
      onClick={props.onClick}
    >
      <span css={innerStyle}>{children}</span>
    </motion.button>
  </div>
);

export const BackIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);
