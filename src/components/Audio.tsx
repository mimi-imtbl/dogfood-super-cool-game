import { useEffect, useRef } from "react";
import { useGameContext } from "../context/GameContext";
import { Icon } from "@biom3/react";

export const Audio = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { enabledAudio, toggleAudio } = useGameContext();

  useEffect(() => {
    const audio = audioRef.current;

    if (enabledAudio) {
      audio?.play();
    } else {
      audio?.pause();
    }
  }, [enabledAudio]);

  return (
    <>
      <Icon
        onClick={() => toggleAudio()}
        icon={enabledAudio ? "SoundOn" : "SoundOff"}
        sx={{
          w: "base.icon.size.500",
          cursor: "pointer",
          fill: enabledAudio
            ? "base.color.status.success.bright"
            : "base.color.status.fatal.bright",
        }}
      />
      <audio
        ref={audioRef}
        style={{ display: "none" }}
        id="myAudio"
        controls
        loop
      >
        <source
          src="https://ia803209.us.archive.org/35/items/GuileTheme/Guile%20Theme.mp3?cnt=0"
          type="audio/mp3"
        ></source>
      </audio>
    </>
  );
};
