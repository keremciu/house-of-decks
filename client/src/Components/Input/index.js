/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { motion } from "framer-motion";

const style = css({
  boxSizing: "border-box",
  appearance: "none",
  display: "block",
  width: 300,
  color: "var(--color-gray)",
  fontSize: 16,
  fontWeight: 500,
  boxShadow:
    "rgba(255, 255, 255, 0.2) -8px -8px 20px 0px inset, rgb(209, 217, 230) 8px 8px 20px 0px inset",
  padding: "16px 0px 16px 0px",
  margin: 0,
  border: "none",
  cursor: "pointer",
  outline: "none",
  borderRadius: 100,
  background: "linear-gradient(145deg, #DEE3EA, #F5F8FC)",
  "& > input": {
    appearance: "none",
    background: "none",
    border: 0,
    marginLeft: 30,
    height: 30,
    width: 270,
    outline: 0,
    fontSize: 20,
    fontWeight: 900,
  },
  "& > span": {
    display: "block",
    paddingLeft: 30,
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
      boxShadow:
        "rgba(255, 255, 255, 0.2) -8px -8px 20px 0px inset, rgb(209, 217, 230) 4px 4px 12px 0px inset",
    }}
  >
    <span>{props.label}</span>
    <input id={props.name} {...props.field} {...props} />
  </motion.label>
);

const formStyle = css({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
});

export const Form = ({ children, onSubmit }) => (
  <form onSubmit={onSubmit} css={formStyle}>
    {children}
  </form>
);
