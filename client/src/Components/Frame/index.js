import usePortal from "react-cool-portal";

import HowToModal from "./HowToModal";
import {
  Wrapper,
  BodyInner,
  StyledBody,
  StyledHeader,
  StyledFooter,
  HeroText,
} from "./styled";

// components
const Body = ({ children }) => (
  <StyledBody>
    <BodyInner>{children}</BodyInner>
  </StyledBody>
);
const Header = () => (
  <StyledHeader>
    <h1>
      house of decks<span>BETA</span>
    </h1>
    <HeroText>a party game for hilarious people.</HeroText>
  </StyledHeader>
);
const Footer = () => {
  const { Portal, show, hide } = usePortal({
    defaultShow: false,
  });
  return (
    <StyledFooter>
      <HowToModal Portal={Portal} hide={hide} />
      <div style={{ display: "flex", marginBottom: 16 }}>
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
        <a href="#guide" onClick={show} style={{ paddingRight: 4 }}>
          Guide
        </a>{" "}
      </div>
      <div style={{ display: "flex", marginBottom: 16 }}>
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
    </StyledFooter>
  );
};

const Frame = (c) => (
  <Wrapper>
    <Body>{c}</Body>
  </Wrapper>
);

Frame.withHeader = (c) => (
  <Wrapper>
    <Header />
    <Body>{c}</Body>
    <Footer />
  </Wrapper>
);

export default Frame;
