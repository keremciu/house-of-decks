/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import React from "react";

const style = css({
  position: "absolute",
  top: 0,
  left: 0,
  height: "100%",
  width: "100%",
  zIndex: 10,
  pointerEvents: "none",
});

const Canvas = React.forwardRef((props, ref) => (
  <canvas css={style} ref={ref} {...props} />
));

export default Canvas;
