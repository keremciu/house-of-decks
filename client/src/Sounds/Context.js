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

// copied from here: https://github.com/myagoo/amstangram/blob/4892c7543e04254b463b0a1c95ee416456ea9976/src/contexts/sound.js

export const SoundContext = createContext([true, () => {}]);

export const SoundProvider = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState(true);

  const [playButton] = useSound(clickSound, {
    soundEnabled,
  });
  // change to toggle
  const [playToggle] = useSound(clickSound, {
    soundEnabled,
  });
  const [playCard] = useSound(cardSound, {
    soundEnabled,
  });
  const [playJudge] = useSound(judgeSound, {
    soundEnabled,
  });
  const [playNudge, exposedData] = useSound(nudgeSound, {
    soundEnabled,
  });
  const isNudgePlaying = exposedData.isPlaying;

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
      playToggle,
      playCard,
      playJudge,
      playNudge,
      isNudgePlaying,
    }),
    [
      soundEnabled,
      toggleSound,
      playButton,
      playToggle,
      playCard,
      playJudge,
      playNudge,
      isNudgePlaying,
    ]
  );

  return (
    <SoundContext.Provider value={contextValue}>
      {children}
    </SoundContext.Provider>
  );
};
