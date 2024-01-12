import axios from "axios";
import { useEffect, useState } from "react";

export type UseTokenMetadataProps = {
  tokenId: number;
  collectionAddress?: string;
};

type metaDataResponse = {
  image: string;
  character: number;
  level: number;
};

const metadataApi = "https://dogfooding2024.s3.amazonaws.com/__TOKEN_ID__";

const defaultCollectionAddress = "0x02Fc714aA42BdAE32b14C3985CbcCE903B5fb3a8";

export const useTokenMetadata = ({
  tokenId,
  collectionAddress,
}: UseTokenMetadataProps) => {
  const [metadata, setMetadata] = useState<metaDataResponse | null>(null);
  const collection = collectionAddress || defaultCollectionAddress;

  let fetchMetadata = async () => {
    if (tokenId) {
      const url = metadataApi.replace("__TOKEN_ID__", tokenId.toString());

      try {
        let nftResponse = await axios.get(url);
        setMetadata(nftResponse.data);
      } catch (error) {
        console.warn(error);
      }
    }
  };

  useEffect(() => {
    (async () => {
      await fetchMetadata();
    })();
  }, [tokenId, collection]);

  return { metadata, fetchMetadata };
};
