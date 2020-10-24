import styled from "@emotion/styled";
import { m as motion } from "framer-motion";

export const StyledButton = styled(motion.button)(
  {
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
      "rgb(255,255,255) -20px -20px 40px 0px, #D1D9E6 20px 20px 40px 0px",
    background: "linear-gradient(145deg, #ffffff, #DAE0E4)",
    "@media (hover: hover)": {
      "&:hover > span": {
        boxShadow: "rgb(255,255,255) inset 2px 2px 0px 0px",
      },
    },
    "&:active": {
      "& > span": {
        background: "linear-gradient(135deg, #DEE3EA 0%, #F5F8FC 100%)",
        boxShadow: "inset 3px 3px 7px rgba(136, 165, 191, 0.48)",
      },
    },
  },
  ({ disabled, secondary, small }) => ({
    ...(disabled
      ? {
          pointerEvents: "none",
          opacity: "0.4",
        }
      : {}),
    ...(small
      ? {
          height: 60,
          width: 60,
          background: "#ecf0f3",
          color: "var(--color-gray)",
          fontWeight: 500,
          boxShadow:
            "rgb(245,245,245) -10px -10px 20px 0px, #D1D9E6 10px 10px 20px 0px",
          "@media (hover: hover)": {
            "&:hover > span ": {
              boxShadow: "none",
            },
          },
        }
      : {
          height: 100,
        }),
    ...(secondary
      ? {
          height: 72,
          background: "#ecf0f3",
          color: "var(--color-gray)",
          fontSize: 16,
          boxShadow: "none !important",
          "&:active": {
            "& > span": {
              background: "#ecf0f3",
              boxShadow: "none",
            },
          },
          "@media (hover: hover)": {
            "&:hover > span": {
              boxShadow: "none",
            },
          },
        }
      : {}),
  })
);

export const StyledInnerSpan = styled.span({
  borderRadius: 100,
  display: "flex",
  flex: "1",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
});
