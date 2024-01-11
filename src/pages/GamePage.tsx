import React from "react";
import { FlappyBird } from "../components/FlappyBird";
import { useGameContext } from "../context/GameContext";

interface GamePageProps {}

const GamePage: React.FC<GamePageProps> = () => {
  const { logout } = useGameContext();

  const onLogout = () => {
    logout();
  };

  return (
    <div>
      <h1>Game Page</h1>
      <button onClick={onLogout}>Logout</button>
      <FlappyBird />
    </div>
  );
};

export default GamePage;
