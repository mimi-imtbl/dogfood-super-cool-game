import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGameContext } from "../context/GameContext";
import { Box, Button, Heading, Icon } from "@biom3/react";
import { Audio } from "../components/Audio";

export const NavHeader = () => {
  const { login, logout, isAuthenticated, isConnecting } = useGameContext();
  const navigate = useNavigate();
  const [playAudio, setPlayAudio] = useState(false);

  const onClick = () => {
    if (isConnecting) return;

    if (isAuthenticated) {
      return logout();
    }

    login(() => {
      navigate("/game");
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: "10vh",
        borderBottom: "1px solid",
        borderColor: "base.color.accent.1",
        padding: "base.spacing.x6",
      }}
    >
      <Audio playAudio={playAudio}></Audio>
      <Heading>Flappy Bird</Heading>
      <Icon
        onClick={() => setPlayAudio(!playAudio)}
        icon={playAudio ? "SoundOn" : "SoundOff"}
        sx={{ w: "base.icon.size.500", cursor: "pointer" }}
      />
      <Button onClick={onClick} disabled={isConnecting}>
        {isConnecting && <Button.Icon icon="Loading" />}
        {!isConnecting && isAuthenticated && <Button.Icon icon="Logout" />}
        {!isConnecting && !isAuthenticated && (
          <Button.Logo logo="PassportSymbol" />
        )}
        {isAuthenticated ? "Logout" : "Connect with Passport"}
      </Button>
    </Box>
  );
};

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        backgroundColor: "base.color.neutral.1000",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          height: "70vh",
          width: "50vw",
          minWidth: "600px",
          maxWidth: "720px",
          border: "1px solid",
          borderColor: "base.color.accent.1",
        }}
      >
        <NavHeader />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
            padding: "base.spacing.x6",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};
