import { m as motion } from "framer-motion";
import Scoreboard from "Game/Views/Scoreboard";
import Cards, { WhiteCard, BlackCard } from "Components/Cards";

function Judgement({
  isReadyToJudge,
  isWaiting,
  isCardCzar,
  blackCard,
  submitters,
  onSubmitWinner,
}) {
  if (isReadyToJudge) {
    return (
      <>
        <h4>Submissions</h4>
        {isCardCzar ? (
          <p>Time to pick the darkest combination</p>
        ) : (
          <p>Judge is gonna pick the darkest combination</p>
        )}
        <Cards>
          {submitters
            .sort(() => Math.random() - 0.5)
            .map((player, index) => (
              <BlackCard
                key={index}
                text={blackCard.text}
                submittedCards={player.submittedCards}
                {...(isCardCzar && isReadyToJudge
                  ? { onClick: () => onSubmitWinner(player.username) }
                  : {})}
              />
            ))}
        </Cards>
      </>
    );
  }

  let text;

  if (isCardCzar) {
    text = "Waiting for horrible combinations...";
  } else if (isWaiting) {
    text = "Waiting for the next round to play...";
  } else {
    text = "Waiting for other horrible ones...";
  }

  return (
    <>
      {isCardCzar && (
        <p>
          As <strong>JUDGE</strong> you read the black card
        </p>
      )}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1, 1, 1, 0],
        }}
        transition={{
          duration: 5,
          ease: [0.43, 0.13, 0.23, 0.96],
          loop: Infinity,
          delay: isWaiting ? 0 : 5,
        }}
      >
        {text}
      </motion.h2>
    </>
  );
}

export default Judgement;
