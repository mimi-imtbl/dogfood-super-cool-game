import React, { useEffect, useRef } from "react";

export const Audio = ({ playAudio }: { playAudio?: boolean }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;

    if (playAudio) {
      audio?.play();
    } else {
      audio?.pause();
    }
  }, [playAudio]);

  return (
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
  );
};
