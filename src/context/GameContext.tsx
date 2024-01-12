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
  isAuthenticated: boolean | undefined;
  login: (onSuccess?: Function) => void;
  logout: (onSuccess?: Function) => void;
  isConnecting: boolean | undefined;
  enabledAudio: boolean;
  toggleAudio: () => void;
  walletAddress: string;
};

const defaultContext: GameContextType = {
  score: 0,
  setScore: () => {},
  playerAsset: "",
  setPlayerAsset: () => {},
  tokenId: "402471",
  setTokenId: () => {},
  isAuthenticated: undefined,
  login: () => {},
  logout: () => {},
  isConnecting: undefined,
  enabledAudio: false,
  toggleAudio: () => {},
  walletAddress: "0x18ea1d312a4037B8676c760AbfD7D1DBE65486a1",
};
const GameContext = createContext<GameContextType | undefined>(defaultContext);

type GameContextProviderProps = {
  children: React.ReactNode;
};
export const GameContextProvider = ({ children }: GameContextProviderProps) => {
  const [score, setScore] = useState(0);
  const [playerAsset, setPlayerAsset] = useState("");
  const [tokenId, setTokenId] = useState(defaultContext.tokenId);
  const [isConnecting, setIsConnecting] = useState<boolean | undefined>(
    undefined
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
    undefined
  );
  const [enabledAudio, setEnabledAudio] = useState<boolean>(
    defaultContext.enabledAudio
  );
  const [walletAddress, setWalletAddress] = useState<string>("");

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
        const addresses = await passport;
        console.log("🚀 ~ addresses:", await addresses?.getLinkedAddresses());
        console.log("🚀 ~ userInfo:", userInfo);
        if (userInfo) {
          setIsAuthenticated(true);
          // const signer = provider?.getSigner();
          // const address = (await signer?.getAddress()) || "";
          // setWalletAddress(address);
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
        isAuthenticated,
        login,
        logout,
        isConnecting,
        enabledAudio,
        toggleAudio,
        walletAddress,
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
