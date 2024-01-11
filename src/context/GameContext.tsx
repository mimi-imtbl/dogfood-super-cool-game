import { createContext, useContext, useEffect, useState } from "react";
import { config, passport } from "@imtbl/sdk";
import { usePassportClient } from "../hooks/usePassportClient";

type GameContextType = {
  score: number;
  setScore: (score: number) => void;
  playerAsset: string;
  setPlayerAsset: (playerAsset: string) => void;
  userInfo: passport.UserProfile;
  setUserInfo: (userInfo: any) => void;
  isAuthenticated: boolean;
  login: (onSuccess?: Function) => void;
  logout: (onSuccess?: Function) => void;
};

const defaultContext: GameContextType = {
  score: 0,
  setScore: () => {},
  playerAsset: "",
  setPlayerAsset: () => {},
  userInfo: {
    sub: "",
    email: "",
    nickname: "",
  },
  setUserInfo: () => {},
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
};
const GameContext = createContext<GameContextType | undefined>(defaultContext);

type GameContextProviderProps = {
  children: React.ReactNode;
};
export const GameContextProvider = ({ children }: GameContextProviderProps) => {
  const [score, setScore] = useState(0);
  const [playerAsset, setPlayerAsset] = useState("");
  const [userInfo, setUserInfo] = useState(defaultContext.userInfo);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { passport } = usePassportClient({
    environment: config.Environment.SANDBOX,
  });

  const login = async (onSuccess?: Function) => {
    try {
      const login = await passport?.login();
      console.log("userInfo", login);
      if (login) {
        setIsAuthenticated(true);
        onSuccess?.();
      }
    } catch (error) {
      console.warn("passport login error", error);
    }
  };

  const logout = async (onSuccess?: Function) => {
    try {
      await passport?.logout();
      onSuccess?.();
    } catch (error) {
      console.warn("passport logout error", error);
    }

    setIsAuthenticated(false);
  };

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const userInfo = await passport?.getUserInfo();
        if (userInfo) {
          setIsAuthenticated(true);
          setUserInfo(userInfo);
        }
      } catch (error) {
        console.warn("passport getUserInfo error", error);
      }
    };
    getUserInfo();
  }, [passport]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const getPlayerAsset = async () => {
      // TODO: get player token metadata an extract score
    };

    getPlayerAsset();
  }, [isAuthenticated, score]);

  return (
    <GameContext.Provider
      value={{
        score,
        setScore,
        playerAsset,
        setPlayerAsset,
        setUserInfo,
        userInfo,
        isAuthenticated,
        login,
        logout,
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
