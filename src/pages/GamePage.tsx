import React from "react";
import { FlappyBird } from "../components/FlappyBird";
import { Layout } from "../components/Layout";
import { Box, Heading, Icon } from "@biom3/react";
import { useGameContext } from "../context/GameContext";

const imageUrl =
  "https://dogfooding2024.s3.amazonaws.com/images/character-image-__TOKEN__ID-1.png";

const getImageUrl = (tokenId: string) =>
  tokenId ? imageUrl.replace("__TOKEN__ID", tokenId.toString()) : undefined;

interface GamePageProps {}
const GamePage: React.FC<GamePageProps> = () => {
  const { isConnecting, tokenId } = useGameContext();

  const playerAsset = getImageUrl(tokenId);

  return (
    <Layout
      nav={{
        title: "Lets Play!",
      }}
    >
      <Box sx={{ position: "relative" }}>
        <FlappyBird
          sx={{
            filter: isConnecting ? "blur(10px)" : "none",
            transition: "filter 0.5s ease",
            opacity: isConnecting ? 0.5 : 1,
            pointerEvents: isConnecting ? "none" : "all",
          }}
          playerAsset={playerAsset}
        />
        {isConnecting && (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            {true && (
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
    </Layout>
  );
};

export default GamePage;
