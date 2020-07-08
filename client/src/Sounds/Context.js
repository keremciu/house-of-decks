import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  createContext,
} from "react";
import useSound from "use-sound";

import cardSound from "./card.mp3";
import clickSound from "./click.mp3";
import judgeSound from "./judge.mp3";
import nudgeSound from "./nudge.mp3";
import checkSound from "./check.mp3";
import winnerSound from "./winner.mp3";

// copied from here: https://github.com/myagoo/amstangram/blob/4892c7543e04254b463b0a1c95ee416456ea9976/src/contexts/sound.js

export const SoundContext = createContext([true, () => {}]);

export const SoundProvider = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState(true);

  const [playButton] = useSound(clickSound, {
    soundEnabled,
  });
  const [playCard] = useSound(cardSound, {
    soundEnabled,
  });
  const [playJudge] = useSound(judgeSound, {
    soundEnabled,
  });
  const [playWinner] = useSound(winnerSound, {
    soundEnabled,
  });
  const [playNudge] = useSound(nudgeSound, {
    soundEnabled,
  });
  const [playCheck] = useSound(checkSound, {
    soundEnabled,
  });

  useEffect(() => {
    setSoundEnabled(
      window.localStorage.getItem("sound") === "off" ? false : true
    );
  }, []);

  const toggleSound = useCallback(() => {
    const newSoundsEnabled = !soundEnabled;
    setSoundEnabled(newSoundsEnabled);
    window.localStorage.setItem("sound", newSoundsEnabled ? "on" : "off");
  }, [soundEnabled]);

  const contextValue = useMemo(
    () => ({
      soundEnabled,
      toggleSound,
      playButton,
      playCard,
      playJudge,
      playWinner,
      playNudge,
      playCheck,
    }),
    [
      soundEnabled,
      toggleSound,
      playButton,
      playCard,
      playJudge,
      playWinner,
      playNudge,
      playCheck,
    ]
  );

  return (
    <SoundContext.Provider value={contextValue}>
      {children}
    </SoundContext.Provider>
  );
};
