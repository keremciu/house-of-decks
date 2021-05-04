import { forwardRef } from "react";
import styled from "@emotion/styled";
import { m as motion } from "framer-motion";

const StyledLabel = styled(motion.label)({
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

export default forwardRef(({ label, ...props}, ref) => (
  <StyledLabel
    htmlFor={props.name}
    whileHover={{
      y: "-3",
      boxShadow:
        "rgba(255, 255, 255, 0.2) -8px -8px 20px 0px inset, rgb(209, 217, 230) 4px 4px 12px 0px inset",
    }}
  >
    <span>{label}</span>
    <input id={props.name} ref={ref} {...props.field} {...props} />
  </StyledLabel>
));

const StyledForm = styled.form({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
});

export const Form = ({ children, onSubmit }) => (
  <StyledForm onSubmit={onSubmit}>{children}</StyledForm>
);
