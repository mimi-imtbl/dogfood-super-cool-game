import React, { useEffect, useRef, useState } from "react";
import { FlappyBird } from "../components/FlappyBird";
import { Layout } from "../components/Layout";
import { Box, Button, Heading, Icon } from "@biom3/react";
import { useGameContext } from "../context/GameContext";
import { useNavigate } from "react-router-dom";

const imageUrl =
  "https://dogfooding2024.s3.amazonaws.com/images/character-image-__TOKEN__ID-1.png";

const getImageUrl = (tokenId: string) =>
  tokenId ? imageUrl.replace("__TOKEN__ID", tokenId.toString()) : undefined;

interface GamePageProps {}
const GamePage: React.FC<GamePageProps> = () => {
  const { isConnecting, tokenId, setScore } = useGameContext();
  const [canLevelUp, setCanLevelUp] = useState(false);
  const startingScore = useRef(0);
  console.log("🚀 ~ startingScore:", startingScore);

  const isGameDisabled = isConnecting || canLevelUp;

  const playerAsset = getImageUrl(tokenId);
  const navigate = useNavigate();

  const onGameStart = (event: Event) => {
    const score = (event as CustomEvent).detail.score;
    startingScore.current = score;
    setCanLevelUp(false);
  };

  const onGameEnd = (event: Event) => {
    const data = (event as CustomEvent).detail;
    const latestScore = data.score;

    if (
      Number(latestScore) !== 0 &&
      Number(latestScore) > Number(startingScore.current)
    ) {
      setScore(latestScore);
      setCanLevelUp(true);
    }
  };

  useEffect(
    () => {
      window.addEventListener("flappy-bird.game-started", onGameStart);
      window.addEventListener("flappy-bird.game-ended", onGameEnd);

      return () => {
        window.removeEventListener("flappy-bird.game-started", onGameStart);
        window.removeEventListener("flappy-bird.game-ended", onGameEnd);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <Layout
      nav={{
        title: "Lets Play!",
      }}
    >
      <Box sx={{ position: "relative" }}>
        <FlappyBird
          sx={{
            filter: isGameDisabled ? "blur(10px)" : "none",
            transition: "filter 0.5s ease",
            opacity: isGameDisabled ? 0.5 : 1,
            pointerEvents: isGameDisabled ? "none" : "all",
          }}
          playerAsset={playerAsset}
        />
        {canLevelUp && (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "50%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Heading
              sx={{
                my: "base.spacing.x4",
                color: "base.color.accent.1",
              }}
            >
              Yay! 🎉
            </Heading>
            <Button onClick={() => navigate("/level-up")}>
              Level Up
              <Button.Icon
                icon="Minting"
                sx={{
                  fill: "base.color.accent.1",
                  width: "base.spacing.x6",
                }}
              />
            </Button>
          </Box>
        )}
        {isConnecting && (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            {isConnecting && (
              <Icon
                icon="Loading"
                sx={{
                  width: "base.icon.size.600",
                }}
              />
            )}

            <Heading>See ya!</Heading>
          </Box>
        )}
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          mt: "base.spacing.x4",
        }}
      >
        {!canLevelUp && (
          <Button onClick={() => navigate("/character-select")}>
            Swap Character
            <Button.Icon
              icon="Swap"
              sx={{
                fill: "base.color.accent.2",
                width: "base.spacing.x6",
              }}
            />
          </Button>
        )}
      </Box>
    </Layout>
  );
};

export default GamePage;
