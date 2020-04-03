/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const style = css({
  boxSizing: "border-box",
  appearance: "none",
  display: "block",
  // height: 80,
  width: 330,
  color: "#808080",
  fontSize: 16,
  fontWeight: 500,
  boxShadow: "inset 3px 6px 10px #dccfcf, inset -3px -3px 7px #efeeee",
  padding: 0,
  margin: 0,
  border: "none",
  border: "1px solid rgba(255,255,255,0.6)",
  cursor: "pointer",
  outline: "none",
  transition: "all .1s cubic-bezier(0.165, 0.84, 0.44, 1)",
  borderRadius: 100,
  background: "linear-gradient(145deg, #e4dcdc, #efeeee)",
  "&:active,&:focus,&:focus-within": {
    boxShadow: "inset 1px 3px 6px #dccfcf",
    borderColor: "#efeeee"
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
  },
  "& + label": {
    marginTop: "20px"
  }
});

export default props => (
  <label css={style} htmlFor={props.name}>
    <span>{props.label}</span>
    <input id={props.name} {...props} />
  </label>
);

const helpBlockStyle = css({
  height: 30,
  paddingTop: 20,
  marginBottom: 10,
  color: "#ee5e00",
  fontWeight: "bold",
  fontFamily: "serif"
});

export const HelpBlock = ({ children }) => (
  <div css={helpBlockStyle}>{children}</div>
);
