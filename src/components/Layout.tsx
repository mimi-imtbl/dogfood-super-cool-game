import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGameContext } from "../context/GameContext";
import { Box, Button, DeeplyNestedSx, Heading, Icon } from "@biom3/react";
import { Audio } from "../components/Audio";

export type NavHeaderProps = {
  title?: string;
};

export const NavHeader = ({ title }: NavHeaderProps) => {
  const { login, logout, isAuthenticated, isConnecting } = useGameContext();
  const navigate = useNavigate();
  const [playAudio, setPlayAudio] = useState(false);

  const onClick = () => {
    if (isConnecting) return;

    if (isAuthenticated) {
      return logout();
    }

    login(() => {
      navigate("/character-select");
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
      <Heading>{title}</Heading>
      <Audio />
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

export type LayoutProps = {
  children: React.ReactNode;
  nav: NavHeaderProps;
  sxOverride?: DeeplyNestedSx;
};

export const Layout = ({ children, nav, sxOverride }: LayoutProps) => {
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
          borderWidth: "base.border.size.600",
          borderColor: "base.color.accent.1",
        }}
      >
        <NavHeader {...nav} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
            padding: "base.spacing.x6",
            ...sxOverride,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};
