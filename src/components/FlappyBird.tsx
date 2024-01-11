import { useEffect } from "react";
import { init } from "../flappy-bird";
import { BoxProps, Box } from "@biom3/react";

export type FlappyBirdProps = {
  playerAsset?: string;
} & BoxProps;

export const FlappyBird = ({ playerAsset, ...props }: FlappyBirdProps) => {
  useEffect(() => {
    init({ playerAsset });
  }, [playerAsset]);
  console.count("🚀 ~ FlappyBird:");
  console.log({ playerAsset, ...props });

  return (
    <Box className="flappy-bird" {...props}>
      <div className="score">
        <span></span>
      </div>
      <canvas id="flappyBird"></canvas>
    </Box>
  );
};
