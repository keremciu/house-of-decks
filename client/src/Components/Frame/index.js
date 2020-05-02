/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import usePortal from "react-cool-portal";
import Modal from "Components/Modal";
import { GAME_STAGES } from "Game/mappings";

import firstsvg from "./first.svg";
import secondsvg from "./second.svg";
import thirdsvg from "./third.svg";

const style = css({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  overflow: "hidden",
});

const headerStyle = css({
  paddingTop: 100,
  height: 260,
  boxSizing: "border-box",
  width: "100%",
  textAlign: "center",
  h1: {
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
    textAlign: "center",
    letterSpacing: 1,
  },
  "@media only screen and (max-width: 600px)": {
    paddingTop: 40,
    h1: {
      flexDirection: "column",
      alignItems: "center",
      span: {
        display: "none",
      },
    },
  },
});

const footerStyle = css({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
  alignItems: "flex-end",
  fontSize: 15,
  color: "var(--color-gray)",
  fontFamily: "var(--serif-font)",
  marginBottom: 4,
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

const bodyStyle = css({
  height: "100%",
  width: "100%",
  display: "flex",
  flex: "1 1 auto",
  fontSize: 18,
  flexDirection: "column",
  justifyContent: "center",
});

const heroText = css({
  fontFamily: "var(--serif-font)",
  color: "var(--color-gray)",
  fontSize: 20,
  fontWeight: 500,
});

// components
const Wrapper = ({ children }) => <div css={style}>{children}</div>;
const Body = ({ children }) => <div css={bodyStyle}>{children}</div>;
const Header = () => (
  <header css={headerStyle}>
    <h1>
      NODE AGAINST HUMANITY<span>BETA</span>
    </h1>
    <p css={heroText}>a party game for horrible people.</p>
  </header>
);
const Footer = () => {
  const { Portal, show, hide } = usePortal({
    defaultShow: false,
  });

  return (
    <footer css={footerStyle}>
      <Portal style={{ width: "100%" }}>
        <Modal handleClose={hide}>
          <h1>About</h1>
          <div style={{ padding: "0px 10px" }}>
            <p>
              Node Against Humanity is an online game that you can play with
              horrible people.
            </p>
            <p>
              This game is based on{" "}
              <a
                href="https://cardsagainsthumanity.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Cards Against Humanity
              </a>
              . If you like this game, you can buy printed versions to
              contribute their creativity.
            </p>
            <p>
              If you'd like to learn more about this game, there is a{" "}
              <a
                href="https://www.notion.so/Node-Against-Humanity-Wiki-647566a34f2045bcbd37960c9cb2fdbc"
                target="_blank"
                rel="noopener noreferrer"
              >
                WIKI.
              </a>
            </p>
            <h2>How to play?</h2>
            <p>At least there needs to be 3 horrible people to start a game.</p>
            <img src={firstsvg} width="96%" />
            <p>
              In the game, every player starts with{" "}
              <strong>8 white cards</strong>.
            </p>
            <p>
              First <strong>JUDGE</strong> reads the blackcard by outlining it's
              a question or fill-in-the-blank.
            </p>
            <p>
              Players try to make <strong>a funny combination</strong> with the
              black card by using their white cards.
            </p>
            <img src={secondsvg} width="96%" />
            <p>
              <strong>JUDGE</strong> reads all the submissions then selects the
              funniest combination.
            </p>
            <img src={thirdsvg} width="96%" />
            <p>Winner got the point then new round starts immediately!</p>
            <hr />
            <hr />
            <h2>Last Words</h2>
            <p>
              This game is still in BETA version. If you've any problem or
              feedback please share on Discord.
            </p>
          </div>
        </Modal>
      </Portal>
      <div style={{ display: "flex", marginBottom: 12 }}>
        Made in Berlin with{" "}
        <span role="img" aria-label="heart">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16px"
            height="16px"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M11.1264415,22.2714558 C11.5891538,22.6274635 12.1444088,22.6274635 12.6071212,22.2714558 C14.9206832,20.5804196 22.2315391,15.0623014 23.4345914,10.2561984 C24.9152711,4.47107438 21.2135719,1 17.6044151,1 C15.0132256,1 13.162376,2.78003815 12.3294938,3.75905912 C12.0518663,4.02606484 11.5891538,4.02606484 11.4040689,3.75905912 C10.5711866,2.78003815 8.72033699,1 6.12914753,1 C2.61253328,1 -1.08916595,4.56007629 0.298971264,10.2561984 C1.50202351,15.0623014 8.81287947,20.5804196 11.1264415,22.2714558 Z" />
          </svg>
        </span>
        How to play?
        <a href="#" onClick={show} style={{ paddingRight: 4 }}>
          Guide
        </a>{" "}
      </div>
      <div style={{ display: "flex", marginBottom: 12 }}>
        Need someone to play?{" "}
        <a
          href="https://discord.gg/GjPqmtJ"
          target="_blank"
          rel="noopener noreferrer"
        >
          Join our Discord
        </a>
        <a
          href="https://discord.gg/GjPqmtJ"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span role="img" aria-label="discord">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <g>
                <path d="M10.076 11C9.475 11 9 11.676 9 12.5s.485 1.5 1.076 1.5c.6 0 1.075-.676 1.075-1.5.01-.824-.474-1.5-1.075-1.5zm3.848 0c-.6 0-1.075.676-1.075 1.5s.485 1.5 1.075 1.5c.601 0 1.076-.676 1.076-1.5s-.475-1.5-1.076-1.5z" />
                <path d="M19.657 1C20.95 1 22 2.058 22 3.369V24l-2.457-2.185-1.383-1.288-1.463-1.369.606 2.128H4.343C3.05 21.286 2 20.228 2 18.917V3.369C2 2.058 3.051 1 4.343 1h15.314zm-4.411 15.019c2.525-.08 3.497-1.748 3.497-1.748 0-3.703-1.646-6.705-1.646-6.705-1.646-1.242-3.211-1.207-3.211-1.207l-.16.184c1.943.598 2.845 1.46 2.845 1.46a9.275 9.275 0 00-5.748-1.08c-.069 0-.126.011-.194.022-.4.035-1.372.184-2.595.725-.423.195-.674.333-.674.333s.949-.908 3.006-1.506l-.115-.138S8.686 6.324 7.04 7.566c0 0-1.646 3.002-1.646 6.705 0 0 .96 1.667 3.486 1.748 0 0 .423-.518.766-.954-1.452-.438-2-1.358-2-1.358s.114.081.32.196a.158.158 0 00.045.034c.035.023.069.035.103.058.286.161.572.287.835.391a9.549 9.549 0 001.68.494 7.957 7.957 0 002.96.012 7.487 7.487 0 001.657-.495c.4-.149.845-.368 1.314-.678 0 0-.571.943-2.069 1.368.343.437.755.932.755.932z" />
              </g>
            </svg>
          </span>
        </a>
      </div>
    </footer>
  );
};

const Frame = (props) => <Wrapper {...props} />;

Frame.Header = Header;
Frame.Header.displayName = "FrameHeader";

Frame.Body = Body;
Frame.Body.displayName = "FrameBody";

Frame.Footer = Footer;
Frame.Footer.displayName = "FrameFooter";

export default Frame;
