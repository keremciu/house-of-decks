/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { motion } from "framer-motion";

const style = css({
  boxSizing: "border-box",
  appearance: "none",
  display: "block",
  // height: 80,
  width: 330,
  color: "var(--color-gray)",
  fontSize: 16,
  fontWeight: 500,
  boxShadow:
    "rgb(220, 207, 207) 3px 6px 10px 0px inset, rgb(239, 238, 238) -3px -3px 7px 0px inset",
  padding: 0,
  margin: 0,
  border: "none",
  border: "1px solid rgba(255,255,255,0.6)",
  cursor: "pointer",
  outline: "none",
  borderRadius: 100,
  background: "linear-gradient(145deg, #e4dcdc, #efeeee)",
  "& > input": {
    appearance: "none",
    background: "none",
    border: 0,
    marginLeft: 30,
    height: 40,
    width: 270,
    outline: 0,
    fontSize: 16,
    fontWeight: 500,
  },
  "& > span": {
    display: "block",
    padding: "16px 0px 0px 30px",
  },
  "& + label": {
    marginTop: "20px",
  },
});

export default (props) => (
  <motion.label
    css={style}
    htmlFor={props.name}
    whileHover={{
      y: "-3",
      borderColor: "#efeeee",
      boxShadow:
        "rgb(220, 207, 207) 1px 3px 6px 0px inset, rgb(239, 238, 238) 0px 0px 7px 0px inset",
    }}
  >
    <span>{props.label}</span>
    <input id={props.name} {...props} />
  </motion.label>
);

const formStyle = css({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
});

export const Form = ({ children }) => <div css={formStyle}>{children}</div>;
