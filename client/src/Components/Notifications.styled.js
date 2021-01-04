import styled from "@emotion/styled";

export const StyledNotification = styled.div({
  display: "flex",
  alignItems: "center",
  padding: "24px",
  paddingRight: "84px",
});

export const StyledButton = styled.button({
  position: "absolute",
  top: 8,
  right: 0,
  border: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "28px",
  width: "60px",
  height: "60px",
  background: "none",
  cursor: "pointer",
  "&:focus": {
    outline: "none",
  },
});

export const StyledNotificationList = styled.ul({
  position: "fixed",
  margin: 0,
  padding: 0,
  bottom: 0,
  right: 0,
  zIndex: 40,
  display: "flex",
  flexDirection: "column",
  listStyle: "none",
  justifyContent: "flex-end",
  li: {
    background: "#f44336",
    color: "white",
    margin: 10,
    flex: "0 0 60px",
    position: "relative",
    borderRadius: "10px",
  },
});
