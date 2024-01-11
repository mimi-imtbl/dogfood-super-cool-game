import { useEffect, useRef } from "react";
import { useGameContext } from "../context/GameContext";
import { Icon } from "@biom3/react";

export const Audio = () => {
  const audioRef = useRef<HTMLAudioElement[]>([]);
  const { enabledAudio, toggleAudio } = useGameContext();

  useEffect(() => {
    const bgAudio = audioRef.current[0];

    if (enabledAudio) {
      bgAudio?.play();
    } else {
      bgAudio?.pause();
    }
  }, [enabledAudio]);

  useEffect(() => {
    const jumpSound = audioRef.current[1];
    const loseSound = audioRef.current[2];

    window.addEventListener("flappy-bird.game-ended", () => {
      loseSound?.play();
    });

    window.addEventListener("flappy-bird.player-jump", () => {
      try {
        jumpSound.currentTime = 0;
        jumpSound?.play();
      } catch {}
    });

    return () => {
      window.removeEventListener("flappy-bird.game-ended", () => {});
      window.removeEventListener("flappy-bird.player-jump", () => {});
    };
  }, []);

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
        ref={(r) => audioRef.current.push(r as HTMLAudioElement)}
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

      <audio
        ref={(r) => audioRef.current.push(r as HTMLAudioElement)}
        id="jumpSound"
        style={{ display: "none" }}
        preload="auto"
      >
        <source src="/assets/audio/jump.mp3" type="audio/mp3"></source>
      </audio>

      <audio
        ref={(r) => audioRef.current.push(r as HTMLAudioElement)}
        id="loseSound"
        style={{ display: "none" }}
        preload="auto"
      >
        <source src="/assets/audio/lose.mp3" type="audio/mp3"></source>
      </audio>
    </>
  );
};
