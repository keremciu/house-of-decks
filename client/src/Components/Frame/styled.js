import styled from "@emotion/styled";

export const Wrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  overflow: "hidden",
});

export const StyledHeader = styled.header({
  paddingTop: 100,
  height: 260,
  boxSizing: "border-box",
  width: "100%",
  textAlign: "center",
  h1: {
    fontSize: "2.4rem",
    display: "flex",
    justifyContent: "center",
  },
  "h1 span": {
    marginLeft: 10,
    fontSize: 9,
    border: "1px solid var(--color-gray)",
    padding: "2px 0px",
    color: "var(--color-gray)",
    fontWeight: 700,
    height: "100%",
    width: 36,
    marginRight: -36,
    textAlign: "center",
    letterSpacing: 1,
  },
  "@media only screen and (max-width: 600px)": {
    paddingTop: 40,
    h1: {
      padding: "0px 16px",
      flexDirection: "column",
      alignItems: "center",
      span: {
        display: "none",
      },
    },
  },
});

export const StyledFooter = styled.footer({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
  alignItems: "flex-end",
  fontSize: 15,
  color: "var(--color-gray)",
  fontFamily: "var(--serif-font)",
  a: {
    marginLeft: 4,
    height: 16,
  },
  span: {
    height: 16,
    margin: "0px 4px",
  },
  "@media only screen and (max-width: 600px)": {
    flexDirection: "column",
    alignItems: "center",
    "a span": {
      marginLeft: 0,
    },
    fontSize: 13,
  },
});

export const StyledBody = styled.div({
  height: "100%",
  width: "100%",
  display: "flex",
  flex: "1 1 auto",
  fontSize: 18,
  flexDirection: "column",
  justifyContent: "center",
});

export const HeroText = styled.p({
  fontFamily: "var(--serif-font)",
  color: "var(--color-gray)",
  fontSize: 20,
  fontWeight: 500,
});

export const BodyInner = styled.div({
  width: "100%",
  display: "flex",
  flex: "1",
  flexDirection: "column",
  alignItems: "center",
  "& > button": {
    margin: "50px 0",
  },
});
