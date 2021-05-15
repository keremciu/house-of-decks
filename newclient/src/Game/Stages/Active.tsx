import { useContext } from "react";

import SocketContext from "Contexts/socket";
import Scoreboard from "Components/Scoreboard";

function Active() {
  const { data, sendServer } = useContext(SocketContext);

  const submissionIndex = (data.player?.submittedCards.length || 0) + 1;

  function onSubmitCard(card: any) {
    sendServer({
      action: "submit_card",
      payload: {
        username: data.player?.username,
        card,
      },
    });
  }

  return (
    <>
      <h1>{data.game?.id}</h1>
      {data.game && data.player && (
        <>
          <Scoreboard
            username={data.player.username}
            czar={data.game.czar}
            players={data.game.players}
          />
          <div className="card blackCard">{data.game.blackCard.text}</div>
          {data.game.blackCard.pick > 1 && (
            <p>
              {submissionIndex} pick of {data.game.blackCard.pick}
            </p>
          )}
          <div className="cardsWrapper">
            {data.player.cards.map((card, index: number) => (
              <div
                className="card whiteCard"
                aria-setsize={data.player?.cards.length || 0}
                aria-posinset={index}
                key={index}
                onClick={() => onSubmitCard(card)}
              >
                {card.text}
              </div>
            ))}
          </div>
        </>
      )}
      Game Started
    </>
  );
}

export default Active;
