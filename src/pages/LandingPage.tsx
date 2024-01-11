import React from "react";
import { useNavigate } from "react-router-dom";
import { useGameContext } from "../context/GameContext";

interface LandingPageProps {}
const LandingPage: React.FC<LandingPageProps> = () => {
  const navigate = useNavigate();
  const { login } = useGameContext();

  const onLogin = () => {
    login(() => {
      navigate("/game");
    });
  };

  return (
    <div>
      <h1>Landing Page</h1>
      <button onClick={onLogin}>Connect with Passport</button>
    </div>
  );
};

export default LandingPage;
