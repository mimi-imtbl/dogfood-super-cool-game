import axios from "axios";
import { useState } from "react";

export type UseMintCharacterProps = {
  characterId: number;
  walletAddress: string;
};

export type OnSuccessFn = (args: {
  tokenId: number;
  characterId: number;
}) => void;

const mintUrl =
  "https://caqou7aahh.execute-api.us-east-1.amazonaws.com/dev/mint";

export const useMintCharacter = ({
  characterId,
  walletAddress,
}: UseMintCharacterProps) => {
  const [isMining, setIsMining] = useState(false);

  const mint = async (onSuccess?: OnSuccessFn) => {
    try {
      setIsMining(true);
      const response = await axios.post(
        mintUrl,
        {
          character_id: characterId,
          address: walletAddress,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const tokenId = response.data.token_id;
      onSuccess?.({ tokenId, characterId });
    } catch (error) {
      console.log(error);
    } finally {
      setIsMining(false);
    }
  };

  return { mint, isMining };
};
