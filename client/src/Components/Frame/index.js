/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { GAME_STAGES } from "Game/mappings";

const style = css({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
});

const headerStyle = css({
  paddingTop: 100,
  paddingBottom: 40,
  height: 260,
  boxSizing: "border-box",
  width: "100%",
  textAlign: "center",
  "h1 span": {
    marginLeft: 10,
    fontSize: 12,
    border: "2px solid #808080",
    padding: "2px 6px",
    color: "#808080",
    fontWeight: 700,
  },
});

const footerStyle = css({
  width: "100%",
  textAlign: "center",
  fontSize: 15,
  color: "var(--color-gray)",
  fontFamily: "serif",
});

const bodyStyle = css({
  width: "100%",
  flex: "1 1 auto",
  fontSize: 18,
});

const heroText = css({
  fontFamily: "serif",
  color: "var(--color-gray)",
  fontSize: 20,
  fontWeight: 600,
});

// components
const Wrapper = ({ children }) => <div css={style}>{children}</div>;
const Body = ({ children }) => <div css={bodyStyle}>{children}</div>;
const Header = () => (
  <header css={headerStyle}>
    <h1>
      CARDS AGAINST HUMANITY<span>ALPHA</span>
    </h1>
    <p css={heroText}>a party game for horrible people.</p>
  </header>
);
const Footer = () => (
  <footer css={footerStyle}>
    <p>
      Made in Berlin with{" "}
      <span role="img" aria-label="heart">
        🧡
      </span>
    </p>
  </footer>
);

const Frame = (props) => <Wrapper {...props} />;

Frame.Header = Header;
Frame.Header.displayName = "FrameHeader";

Frame.Body = Body;
Frame.Body.displayName = "FrameBody";

Frame.Footer = Footer;
Frame.Footer.displayName = "FrameFooter";

export default Frame;
