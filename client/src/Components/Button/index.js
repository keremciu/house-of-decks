/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const style = (props) =>
  css({
    boxSizing: "border-box",
    appearance: "none",
    display: "block",
    width: 240,
    fontSize: 20,
    fontWeight: 700,
    // boxShadow: "-6px -6px 16px white, 6px 6px 16px #cbcaca",
    boxShadow: "-20px -20px 40px white, 20px 20px 40px #cbcaca",
    padding: 0,
    margin: 0,
    border: "none",
    cursor: "pointer",
    outline: "none",
    transition: "all .1s cubic-bezier(0.165, 0.84, 0.44, 1)",
    borderRadius: 100,
    background: "linear-gradient(145deg, #ffffff, #d7d6d6)",
    "&:focus,&:hover": {
      // transform: "perspective(500px) translate3d(0, 0, 20px)",
      transform: "scale(1.05)",
      boxShadow:
        "-10px -15px 30px white, 10px 15px 30px rgba(171, 164, 155, 0.5),-1px -2px 0px 0px white, inset -1px -1px 36px rgba(255,255,255,0.3)",
    },
    "&:active": {
      background: "#e8e7e7",
      transform: "translateY(-3px) scale(0.98)",
      boxShadow:
        "1px 1px 2px rgba(255,255,255,0.9), 0px 0px 16px rgba(171, 164, 155, 0)",
      "& > span": {
        background: "linear-gradient(145deg, #d7d6d6, #ffffff)",
        // boxShadow: "30px 30px 60px #cbcaca, -30px -30px 60px #ffffff"
        boxShadow:
          "inset 14px 16px 24px rgba(191, 171, 136, 0.48), inset -10px -10px 16px #e8e7e7, inset -3px -3px 18px #FFFFFF, inset -3px -3px 20px #FFFFFF",
      },
    },
    ...(props.small
      ? {
          height: 56,
          width: 56,
          background: "linear-gradient(120deg, #d7d6d6, #ffffff)",
          color: "#908a84",
          fontWeight: 500,
          boxShadow:
            "3px 3px 3px rgba(0,0,0,0.05), -8px -8px 16px rgba(255, 255, 255, 1)",
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
  transition: "all .1s cubic-bezier(0.165, 0.84, 0.44, 1)",
});

export default ({ children, ...props }) => (
  <button css={style(props)} style={props.style} onClick={props.onClick}>
    <span css={innerStyle}>{children}</span>
  </button>
);
