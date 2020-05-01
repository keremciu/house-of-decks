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
  h1: {
    display: "flex",
    justifyContent: "center",
  },
  "h1 span": {
    marginLeft: 10,
    fontSize: 9,
    border: "1px solid var(--color-gray)",
    padding: "2px 6px",
    color: "var(--color-gray)",
    fontWeight: 700,
    height: "100%",
  },
  "@media only screen and (max-width: 600px)": {
    height: 300,
    h1: {
      flexDirection: "column",
      alignItems: "center",
      span: {
        marginTop: 6,
        width: 36,
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
  marginBottom: 16,
  a: {
    marginLeft: 4,
    height: 16,
    color: "var(--color-gray)",
  },
  span: {
    height: 16,
    margin: "0px 4px",
  },
  "@media only screen and (max-width: 600px)": {
    flexDirection: "column",
    alignItems: "center",
    span: {
      margin: "4px 0px",
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
const Footer = () => (
  <footer css={footerStyle}>
    <div>
      Made in Berlin with{" "}
      <span role="img" aria-label="heart">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16px"
          height="14px"
          viewBox="0 0 26 24"
        >
          <defs>
            <linearGradient
              x1="50%"
              y1="4%"
              x2="50%"
              y2="97%"
              id="linearGradient"
            >
              <stop stopColor="#FFFFFF" offset="0%"></stop>
              <stop stopColor="#FFC056" offset="13%"></stop>
              <stop stopColor="#FF8500" offset="33%"></stop>
              <stop stopColor="#FF8700" offset="64%"></stop>
              <stop stopColor="#DD4B00" offset="100%"></stop>
            </linearGradient>
          </defs>
          <g>
            <path
              d="M12.2344652,22.7272727 C12.7016699,23.0909091 13.2623157,23.0909091 13.7295204,22.7272727 C16.0655442,21 23.4473793,15.3636364 24.6621117,10.4545455 C26.1571669,4.54545455 22.4195289,1 18.7753318,1 C16.1589851,1 14.2901661,2.81818182 13.4491976,3.81818182 C13.1688747,4.09090909 12.7016699,4.09090909 12.514788,3.81818182 C11.6738195,2.81818182 9.80500046,1 7.18865382,1 C3.63789768,1 -0.0997403715,4.63636364 1.3018739,10.4545455 C2.51660626,15.3636364 9.89844141,21 12.2344652,22.7272727 Z"
              fill="url(#linearGradient)"
            />
            <path
              d="M12.9839382,23.0139064 C19.9600079,17.9165621 23.852981,13.7294574 24.6628575,10.4525925 C26.1580142,4.53603069 22.4201225,0.986093627 18.7756782,0.986093627 C17.0313287,0.986093627 15.0885819,2.29835661 12.9474379,4.92288259 C10.8523047,2.29835661 8.93256342,0.986093627 7.18821397,0.986093627 C3.63721688,0.986093627 -0.100674795,4.62705471 1.30103458,10.4525925 C2.11091111,13.7294574 6.00521233,17.9165621 12.9839382,23.0139064 Z M12.9552849,3.37706439 C14.9744716,1.15061567 16.8960323,-1.09478385e-16 18.7756782,0 C23.6545545,0 27.1517183,4.72937895 25.6470839,10.6833914 C24.7651663,14.2517438 20.7449249,18.5757325 13.5914195,23.8027273 C13.2314991,24.0657175 12.7365747,24.0657616 12.3766049,23.8028354 C5.22036089,18.5758297 1.19875051,14.2518439 0.315398335,10.6776105 C-1.09855138,4.8012016 2.42706738,0 7.18821397,0 C9.06945517,0 10.9738676,1.15141052 12.9552849,3.37706439 Z"
              fill="#E75700"
            />
          </g>
        </svg>
      </span>
    </div>
    <div>
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
            width="17px"
            height="21px"
            viewBox="0 0 20 24"
          >
            <g>
              <path d="M8.57557118,10.5 C7.9745167,10.5 7.5,11.1756757 7.5,12 C7.5,12.8243243 7.98506151,13.5 8.57557118,13.5 C9.17662566,13.5 9.65114236,12.8243243 9.65114236,12 C9.66168717,11.1756757 9.17662566,10.5 8.57557118,10.5 Z M12.4244288,10.5 C11.8233743,10.5 11.3488576,11.1756757 11.3488576,12 C11.3488576,12.8243243 11.8339192,13.5 12.4244288,13.5 C13.0254833,13.5 13.5,12.8243243 13.5,12 C13.5,11.1756757 13.0254833,10.5 12.4244288,10.5 Z" />
              <path d="M17.2157143,0 L2.28428571,0 C1.02514286,0 0,1.104 0,2.472 L0,18.696 C0,20.064 1.02514286,21.168 2.28428571,21.168 L14.9202857,21.168 L14.3297143,18.948 L15.756,20.376 L17.1042857,21.72 L19.5,24 L19.5,2.472 C19.5,1.104 18.4748571,0 17.2157143,0 Z M12.9145714,15.672 C12.9145714,15.672 12.5134286,15.156 12.1791429,14.7 C13.6388571,14.256 14.196,13.272 14.196,13.272 C13.7391429,13.596 13.3045714,13.824 12.9145714,13.98 C12.3574286,14.232 11.8225714,14.4 11.2988571,14.496 C10.2291429,14.712 9.24857143,14.652 8.41285714,14.484 C7.77771429,14.352 7.23171429,14.16 6.77485714,13.968 C6.51857143,13.86 6.24,13.728 5.96142857,13.56 C5.928,13.536 5.89457143,13.524 5.86114286,13.5 C5.83885714,13.488 5.82771429,13.476 5.81657143,13.464 C5.616,13.344 5.50457143,13.26 5.50457143,13.26 C5.50457143,13.26 6.03942857,14.22 7.45457143,14.676 C7.12028571,15.132 6.708,15.672 6.708,15.672 C4.24542857,15.588 3.30942857,13.848 3.30942857,13.848 C3.30942857,9.984 4.914,6.852 4.914,6.852 C6.51857143,5.556 8.04514286,5.592 8.04514286,5.592 L8.15657143,5.736 C6.15085714,6.36 5.226,7.308 5.226,7.308 C5.226,7.308 5.47114286,7.164 5.88342857,6.96 C7.07571429,6.396 8.02285714,6.24 8.41285714,6.204 C8.47971429,6.192 8.53542857,6.18 8.60228571,6.18 C9.282,6.084 10.0508571,6.06 10.8531429,6.156 C11.9117143,6.288 13.0482857,6.624 14.2071429,7.308 C14.2071429,7.308 13.3268571,6.408 11.4325714,5.784 L11.5885714,5.592 C11.5885714,5.592 13.1151429,5.556 14.7197143,6.852 C14.7197143,6.852 16.3242857,9.984 16.3242857,13.848 C16.3242857,13.848 15.3771429,15.588 12.9145714,15.672 Z" />
            </g>
          </svg>
        </span>
      </a>
    </div>
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
