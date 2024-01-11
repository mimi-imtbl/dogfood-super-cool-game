import React, {useEffect, useState} from "react";
import axios from "axios";
import {useTokenMetadata} from "../hooks/useTokenMetadata";
import {useGameContext} from "../context/GameContext";
import {Layout} from "../components/Layout";
import {Box, Button, Card} from "@biom3/react";

const tempTokenId = 402471;
const LevelUpPage = () => {
  const {playerAsset, setPlayerAsset, tokenId} = useGameContext();
  const {metadata, fetchMetadata} = useTokenMetadata({tokenId: tempTokenId})
  const [loading, setLoading] = useState(false)

  const level = metadata!.attributes.filter(obj => obj.trait_type == "Level")[0].value
  const character = metadata!.attributes.filter(obj => obj.trait_type == "Character")[0].value

  useEffect(() => {
    if (metadata?.image) {
      setPlayerAsset(metadata!.image)
    }
  }, [metadata]);

  const levelUpImage = async () => {
    const baseURL = 'https://caqou7aahh.execute-api.us-east-1.amazonaws.com/dev'

    setLoading(true)
    let upgradeResponse = await axios.post(baseURL + '/upgrade', {character_id: character, level: level + 1, token_id: tempTokenId})

    // metadata takes a few seconds to propagate
    await new Promise(res => setTimeout(res, 5000))

    await fetchMetadata()
    setLoading(false)
  }

  return (
    <Layout
      nav={{
        title: "Upgrade your character",
      }}
      sxOverride={{
        justifyContent: "space-between",
      }}
    >
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
        <Card.AssetImage imageUrl={playerAsset} />
        <Card.Caption>Level {level}</Card.Caption>
      </Card>
      <Box>
        <Button onClick={levelUpImage}>
          {!loading ? "Level Up!" : "Processing..."}
          <Button.Icon
            icon="ArrowForward"
            sx={{
              fill: "base.color.accent.1",
              width: "base.spacing.x6",
            }}
          />
        </Button>
      </Box>
    </Layout>
  );
};

export default LevelUpPage;
