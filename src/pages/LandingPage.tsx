import { config } from '@imtbl/sdk';
import React from 'react';
import { usePassportClient } from '../hooks/usePassportClient';
import { useNavigate } from 'react-router-dom';

interface LandingPageProps {
  setIsAuthenticated: (authState: boolean) => void;
}
const LandingPage: React.FC<LandingPageProps> = ({ setIsAuthenticated }) => {
  const { passport } = usePassportClient({
    environment: config.Environment.SANDBOX,
  });

  const navigate = useNavigate();

  const loginPassport = async () => {
    try {
      const login = await passport?.login();
      console.log('userInfo', login);
      if (login) {
        setIsAuthenticated(true);
        navigate('/game');
      }
    } catch (error) {
      console.warn('passport login error', error);
    }
  };

  return (
    <div>
      <h1>Landing Page</h1>
      <button onClick={loginPassport}>Connect with Passport</button>
    </div>
  );
};

export default LandingPage;
