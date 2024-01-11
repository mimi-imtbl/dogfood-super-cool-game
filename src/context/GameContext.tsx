import { createContext, useContext, useEffect, useState } from "react";
import { config } from "@imtbl/sdk";
import { usePassportClient } from "../hooks/usePassportClient";

type GameContextType = {
  score: number;
  setScore: (score: number) => void;
  playerAsset: string;
  setPlayerAsset: (playerAsset: string) => void;
  tokenId: string;
  setTokenId: (tokenId: any) => void;
  characterId: string;
  setCharacterId: (characterId: any) => void;
  isAuthenticated: boolean | undefined;
  login: (onSuccess?: Function) => void;
  logout: (onSuccess?: Function) => void;
  isConnecting: boolean | undefined;
  enabledAudio: boolean;
  toggleAudio: () => void;
};

const defaultContext: GameContextType = {
  score: 0,
  setScore: () => {},
  playerAsset: "",
  setPlayerAsset: () => {},
  tokenId: "",
  setTokenId: () => {},
  characterId: "",
  setCharacterId: () => {},
  isAuthenticated: undefined,
  login: () => {},
  logout: () => {},
  isConnecting: undefined,
  enabledAudio: false,
  toggleAudio: () => {},
};
const GameContext = createContext<GameContextType | undefined>(defaultContext);

type GameContextProviderProps = {
  children: React.ReactNode;
};
export const GameContextProvider = ({ children }: GameContextProviderProps) => {
  const [score, setScore] = useState(0);
  const [playerAsset, setPlayerAsset] = useState("");
  const [tokenId, setTokenId] = useState(defaultContext.tokenId);
  const [characterId, setCharacterId] = useState(defaultContext.characterId);
  const [isConnecting, setIsConnecting] = useState<boolean | undefined>(
    undefined,
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
    undefined,
  );
  const [enabledAudio, setEnabledAudio] = useState<boolean>(
    defaultContext.enabledAudio,
  );

  const toggleAudio = () => {
    setEnabledAudio(!enabledAudio);
  };

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
        setIsConnecting(true);
        const userInfo = await passport?.getUserInfo();
        if (userInfo) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.warn("passport getUserInfo error", error);
      } finally {
        setIsConnecting(false);
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
        characterId,
        setCharacterId,
        isAuthenticated,
        login,
        logout,
        isConnecting,
        enabledAudio,
        toggleAudio,
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
