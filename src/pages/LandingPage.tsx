import React from "react";
import { useGameContext } from "../context/GameContext";
import { Button, Heading, Icon } from "@biom3/react";
import { Layout } from "../components/Layout";
import { useNavigate } from "react-router-dom";

interface LandingPageProps {}
const LandingPage: React.FC<LandingPageProps> = () => {
  const { isAuthenticated, isConnecting } = useGameContext();
  const navigate = useNavigate();

  return (
    <Layout
      nav={{
        title: "Flappy Bird",
      }}
    >
      {isConnecting && (
        <Icon icon="Loading" sx={{ width: "base.icon.size.600" }} />
      )}
      {!isAuthenticated && (
        <Heading sx={{ width: "70%", my: "base.spacing.x4" }}>
          {isConnecting
            ? "Please follow the prompts"
            : "Please connect your wallet to play the game"}
        </Heading>
      )}
      {isAuthenticated && (
        <>
          <Heading sx={{ my: "base.spacing.x4" }}>You are all set!</Heading>
          <Icon
            icon="PancakeSwap"
            sx={{
              width: "base.icon.size.600",
              fill: "base.color.accent.1",
              my: "base.spacing.x4",
            }}
          />
          <Button
            onClick={() => {
              navigate("/game");
            }}
          >
            Lets Play!
            <Button.Icon
              icon="ArrowForward"
              sx={{
                width: "base.icon.size.300",
                fill: "base.color.accent.1",
              }}
            />
          </Button>
        </>
      )}
    </Layout>
  );
};

export default LandingPage;
