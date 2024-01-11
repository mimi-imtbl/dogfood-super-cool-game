import React from "react";
import { useGameContext } from "../context/GameContext";
import { Heading, Icon } from "@biom3/react";
import { Layout } from "../components/Layout";

interface LandingPageProps {}
const LandingPage: React.FC<LandingPageProps> = () => {
  const { isAuthenticated, isConnecting } = useGameContext();

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
    </Layout>
  );
};

export default LandingPage;
