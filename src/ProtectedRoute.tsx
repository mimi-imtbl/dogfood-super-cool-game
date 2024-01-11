import { useNavigate } from "react-router-dom";
import { useGameContext } from "./context/GameContext";
import { useEffect } from "react";

export type ProtectedRouteProps = {
  children: JSX.Element;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isConnecting } = useGameContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated === undefined || isConnecting === undefined) return;
    if (isAuthenticated === false && isConnecting === false) {
      navigate("/");
    }
  }, [isAuthenticated, isConnecting, navigate]);

  if (isAuthenticated === undefined || isConnecting === undefined) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
