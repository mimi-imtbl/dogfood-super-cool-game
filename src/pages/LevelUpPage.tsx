import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTokenMetadata } from "../hooks/useTokenMetadata";
import { useGameContext } from "../context/GameContext";
import { Layout } from "../components/Layout";
import { Box, Button, Card } from "@biom3/react";
import { useNavigate } from "react-router-dom";
import { Confetti } from "../components/Confetti";

<<<<<<< HEAD
// const tempTokenId = 402471;
const LevelUpPage = () => {
  const { playerAsset, setPlayerAsset, tokenId } = useGameContext();
  const { metadata, fetchMetadata } = useTokenMetadata({
    tokenId: +tokenId,
=======
const LevelUpPage = () => {
  const { playerAsset, setPlayerAsset, tokenId } = useGameContext();
  const { metadata, fetchMetadata } = useTokenMetadata({
    tokenId: parseInt(tokenId),
>>>>>>> a0287e2 (Upgrade full flow, new metadata url)
  });
  const [loading, setLoading] = useState(false);
  const [upgraded, setUpgraded] = useState(false);

  useEffect(() => {
    if (metadata?.image) {
      setPlayerAsset(metadata!.image);
    }
  }, [metadata, setPlayerAsset]);

<<<<<<< HEAD
  const characterId = +(localStorage.getItem("game.selected.character") || 1);
  let playerLevel = 1;
  try {
    const { level } = JSON.parse(
      localStorage.getItem(`game.character.${characterId}`) || "{}"
    );
    console.log("@@@@ level", level);
    playerLevel = level;
  } catch {}
  const newLevel = playerLevel + 1;
  const imageURL = `https://dogfooding2024.s3.amazonaws.com/images/character-image-${characterId}-${
    newLevel > 5 ? 5 : newLevel
  }.png`;

  console.log("@@@ imageUrl", imageURL);

=======
>>>>>>> a0287e2 (Upgrade full flow, new metadata url)
  const levelUpImage = async () => {
    const baseURL =
      "https://caqou7aahh.execute-api.us-east-1.amazonaws.com/dev";

    const newLevel = metadata!.level + 1;

    try {
      setLoading(true);
      await axios.post(`${baseURL}/upgrade`, {
        character_id: metadata?.character,
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        level: newLevel,
        token_id: tokenId,
      });
    } catch (error) {
      console.log("error", error);
    }

    // metadata takes a few seconds to propagate
    await new Promise((res) => setTimeout(res, 5000));
    localStorage.setItem("level", `${newLevel}`);

    await fetchMetadata();
    setLoading(false);
    setUpgraded(true);

    localStorage.setItem(
<<<<<<< HEAD
      `game.character.${characterId}`,
      JSON.stringify({ characterId: characterId, tokenId, level: newLevel })
=======
      `game.character.${metadata!.character}`,
      JSON.stringify({
        characterId: metadata!.character,
        tokenId,
        level: newLevel,
      }),
>>>>>>> a0287e2 (Upgrade full flow, new metadata url)
    );

    localStorage.setItem("level", `${newLevel}`);
  };

  const navigate = useNavigate();

  return (
    <Layout
      nav={{
        title: "Upgrade your character",
      }}
      sxOverride={{
        justifyContent: "space-between",
      }}
    >
      {upgraded && <Confetti />}
      <Card
        sx={{
          borderStyle: "solid",
          borderColor: "base.color.status.success.bright",
          borderWidth: "base.border.size.600",
          animation: "moveUpDown 1s infinite",
          animationPlayState: "running",
          width: "50%",
          "& .textContainer": {
            height: "2rem",
            padding: "0",
            margin: "0",
          },
          "& .innerTextContainer": {
            padding: "0.5rem",
          },
        }}
      >
<<<<<<< HEAD
        <Card.AssetImage imageUrl={imageURL} />
        <Card.Caption>Level {newLevel}</Card.Caption>
=======
        <Card.AssetImage imageUrl={playerAsset} />
        <Card.Caption>Level {metadata?.level}</Card.Caption>
>>>>>>> a0287e2 (Upgrade full flow, new metadata url)
      </Card>
      <Box>
        {!upgraded && (
          <Button onClick={levelUpImage}>
            {!loading ? "Level Up!" : "Processing..."}
            <Button.Icon
              icon={loading ? "Loading" : "ArrowForward"}
              sx={{
                fill: "base.color.accent.1",
                width: "base.spacing.x6",
              }}
            />
          </Button>
        )}
        {upgraded && (
          <Button
            onClick={() => {
              navigate("/game");
            }}
          >
            Play Again
            <Button.Icon
              icon="ESports"
              sx={{
                fill: "base.color.accent.1",
                width: "base.spacing.x6",
              }}
            />
          </Button>
        )}
      </Box>
    </Layout>
  );
};

export default LevelUpPage;
