import React from 'react';
import { FlappyBird } from '../components/FlappyBird';
import { usePassportClient } from '../hooks/usePassportClient';
import { config } from '@imtbl/sdk';

interface GamePageProps {
  setIsAuthenticated: (authState: boolean) => void;
}

const GamePage: React.FC<GamePageProps> = ({ setIsAuthenticated }) => {
  const { passport } = usePassportClient({
    environment: config.Environment.SANDBOX,
  });

  const logoutPassport = async () => {
    await passport?.logout();
    setIsAuthenticated(false);
  };

  return (
    <div>
      <h1>Game Page</h1>
      <button onClick={logoutPassport}>Logout</button>
      <FlappyBird />
    </div>
  );
};

export default GamePage;
