import styled from "@emotion/styled";
import { m as motion } from "framer-motion";

export const StyledModal = styled(motion.div)({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100vh",
  zIndex: 100,
});

export const StyledWrapper = styled.div({
  background: "#ecf0f3",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const StyledBody = styled.div({
  overflowY: "auto",
  width: "100%",
  height: "calc(100vh - 100px)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  boxShadow: "inset -10px 0px 30px rgba(0,0,0,0.1)",
});

export const StyledFooter = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
