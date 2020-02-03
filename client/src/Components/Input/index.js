/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const style = css({
  boxSizing: "border-box",
  appearance: "none",
  display: "block",
  height: 80,
  width: 330,
  color: "#808080",
  fontSize: 16,
  fontWeight: 500,
  boxShadow: "inset 10px 10px 20px #cbcaca",
  padding: 0,
  margin: 0,
  border: "none",
  cursor: "pointer",
  outline: "none",
  transition: "all .1s cubic-bezier(0.165, 0.84, 0.44, 1)",
  borderRadius: 100,
  background: "linear-gradient(145deg, #d7d6d6, #ffffff)",
  "&:active,&:focus,&:focus-within": {
    boxShadow: "inset 5px 5px 10px #cbcaca"
    // boxShadow:
    //   "10px 15px 30px white, -10px -15px 30px rgba(171, 164, 155, 0.5),1px 2px 0px 0px white, inset 1px 1px 36px rgba(255,255,255,0.3)"
  },
  "& > input": {
    appearance: "none",
    background: "none",
    border: 0,
    marginLeft: 30,
    height: 40,
    width: 160,
    outline: 0,
    fontSize: 16,
    fontWeight: 500
  },
  "& > span": {
    display: "block",
    padding: "16px 0px 0px 30px"
  }
});

export default props => (
  <label css={style} htmlFor={props.name}>
    <span>{props.label}</span>
    <input id={props.name} {...props} />
  </label>
);