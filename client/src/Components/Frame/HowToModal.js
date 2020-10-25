import Modal from "Components/Modal";

import firstsvg from "./first.svg";
import secondsvg from "./second.svg";
import thirdsvg from "./third.svg";

const HowToModal = ({ Portal, hide }) => (
  <Portal style={{ width: "100%" }}>
    <Modal handleClose={hide}>
      <h1>About</h1>
      <div style={{ padding: "0px 10px" }}>
        <p>
          <strong>house of decks</strong> is an online game that you can play
          with horrible people.
        </p>
        <p>Online video call is recommended while playing.</p>
        <p>
          This game is based on{" "}
          <a
            href="https://cardsagainsthumanity.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cards Against Humanity
          </a>
          . If you like this game, you can buy printed versions to contribute
          their creativity.
        </p>
        <p>
          If you'd like to learn more about development of this game, there is a{" "}
          <a
            href="https://www.notion.so/keremciu/house-of-decks-a688fc6e6d8e48bd98984f1bbcfe52fb"
            target="_blank"
            rel="noopener noreferrer"
          >
            WIKI.
          </a>
        </p>
        <h2>How to play?</h2>
        <p>
          <strong>Requirement:</strong> At least there needs to be 3 horrible
          people to start a game.
        </p>
        <img src={firstsvg} width="96%" alt="First sketch of game intro" />
        <p>
          <small>
            <em>FIG. 1. above</em>
          </small>
        </p>
        <p>
          In the game, every player starts with <strong>8 white cards</strong>.
        </p>
        <p>
          First <strong>JUDGE</strong> reads the black card by outlining it's a
          question or fill-in-the-blank.
        </p>
        <p>
          Players try to make <strong>a funny combination</strong> with the
          black card by using their white cards.
        </p>
        <img src={secondsvg} width="96%" alt="Second sketch of game intro" />
        <p>
          <small>
            <em>FIG. 2. above</em>
          </small>
        </p>
        <p>
          <strong>JUDGE</strong> reads all the submissions then selects the
          funniest combination.
        </p>
        <img src={thirdsvg} width="96%" alt="Third sketch of game intro" />
        <p>
          <small>
            <em>FIG. 3. above</em>
          </small>
        </p>
        <p>Winner got the point then new round starts immediately!</p>
        <hr />
        <hr />
        <h2>Last Words</h2>
        <p>
          This game is still in BETA version. If you've any problem or feedback
          please share on Discord.
        </p>
      </div>
    </Modal>
  </Portal>
);

export default HowToModal;
