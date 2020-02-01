/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const style = css({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh"
});

const headerStyle = css({
  paddingTop: 100,
  width: "100%",
  textAlign: "center"
});

const footerStyle = css({
  width: "100%",
  textAlign: "center",
  fontSize: 14,
  color: "#808080"
});

const mainStyle = css({
  width: "100%",
  flex: "1 1 auto"
});

// components
const Wrapper = ({ children }) => <div css={style}>{children}</div>;
const Main = ({ children }) => <div css={mainStyle}>{children}</div>;
const Header = () => (
  <header css={headerStyle}>
    <h1>CARDS AGAINST HUMANITY</h1>
    <p>a game for horrible people</p>
  </header>
);
const Footer = () => (
  <footer css={footerStyle}>
    <p>
      © 2020 Kerem Sevencan. Made in Berlin with{" "}
      <span role="img" aria-label="heart">
        💖
      </span>
    </p>
  </footer>
);

export default ({ children }) => (
  <Wrapper>
    <Header />
    <Main>{children}</Main>
    <Footer />
  </Wrapper>
);
