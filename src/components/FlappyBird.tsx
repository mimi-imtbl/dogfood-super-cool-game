import { useEffect } from "react";
import { init } from "../flappy-bird";
import { BoxProps, Box } from "@biom3/react";
import { useGameContext } from "../context/GameContext";

export type FlappyBirdProps = {
  playerAsset?: string;
} & BoxProps;

export const FlappyBird = ({ playerAsset, ...props }: FlappyBirdProps) => {
  const { setScore } = useGameContext();

  useEffect(() => {
    init({ playerAsset });
  }, [playerAsset]);

  useEffect(
    () => {
      window.addEventListener("flappy-bird.game-ended", (event: Event) => {
        const data = (event as CustomEvent).detail;
        const { score } = data;
        setScore(score);
        console.log("🚀 ~ flappy-bird.game-ended:", { score });
      });

      return () => {
        window.removeEventListener("flappy-bird.game-ended", () => {});
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <Box className="flappy-bird" {...props}>
      <div className="score">
        <span></span>
      </div>
      <canvas id="flappyBird"></canvas>
    </Box>
  );
};
