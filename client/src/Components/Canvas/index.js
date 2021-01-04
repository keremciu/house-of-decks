import { forwardRef } from "react";
import styled from "@emotion/styled";

const StyledCanvas = styled.canvas({
  position: "absolute",
  top: 0,
  left: 0,
  height: "100%",
  width: "100%",
  zIndex: 10,
  pointerEvents: "none",
});

const Canvas = forwardRef((props, ref) => (
  <StyledCanvas ref={ref} {...props} />
));

export default Canvas;
