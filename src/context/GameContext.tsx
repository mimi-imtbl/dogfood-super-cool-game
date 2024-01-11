import { createContext, useContext, useEffect, useState } from "react";
import { config, passport } from "@imtbl/sdk";
import { usePassportClient } from "../hooks/usePassportClient";

type GameContextType = {
  score: number;
  setScore: (score: number) => void;
  playerAsset: string;
  setPlayerAsset: (playerAsset: string) => void;
  tokenId: string;
  setTokenId: (tokenId: any) => void;
  isAuthenticated: boolean;
  login: (onSuccess?: Function) => void;
  logout: (onSuccess?: Function) => void;
  isConnecting: boolean;
};

const defaultContext: GameContextType = {
  score: 0,
  setScore: () => {},
  playerAsset: "",
  setPlayerAsset: () => {},
  tokenId: "",
  setTokenId: () => {},
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  isConnecting: false,
};
const GameContext = createContext<GameContextType | undefined>(defaultContext);

type GameContextProviderProps = {
  children: React.ReactNode;
};
export const GameContextProvider = ({ children }: GameContextProviderProps) => {
  const [score, setScore] = useState(0);
  const [playerAsset, setPlayerAsset] = useState("");
  const [tokenId, setTokenId] = useState(defaultContext.tokenId);
  const [isConnecting, setIsConnecting] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { passport } = usePassportClient({
    environment: config.Environment.SANDBOX,
  });

  const login = async (onSuccess?: Function) => {
    try {
      setIsConnecting(true);
      const login = await passport?.login();
      console.log("tokenId", login);
      if (login) {
        setIsAuthenticated(true);
        onSuccess?.();
      }
    } catch (error) {
      console.warn("passport login error", error);
    } finally {
      setIsConnecting(false);
    }
  };

  const logout = async (onSuccess?: Function) => {
    try {
      setIsConnecting(true);
      await passport?.logout();
      onSuccess?.();
    } catch (error) {
      console.warn("passport logout error", error);
    } finally {
      setIsConnecting(false);
    }

    setIsAuthenticated(false);
  };

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const userInfo = await passport?.getUserInfo();
        console.log("🚀 ~ userInfo:", userInfo);
        if (userInfo) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.warn("passport getUserInfo error", error);
      }
    };
    getUserInfo();
  }, [passport]);

  useEffect(() => {
    if (!isAuthenticated) return;

    // TODO:
    // call service to mint NFT
    // set tokenId
  }, [isAuthenticated, score]);

  return (
    <GameContext.Provider
      value={{
        score,
        setScore,
        playerAsset,
        setPlayerAsset,
        setTokenId,
        tokenId,
        isAuthenticated,
        login,
        logout,
        isConnecting,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGameContext must be used within a GameContextProvider");
  }
  return context;
};
