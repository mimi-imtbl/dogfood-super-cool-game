import axios from "axios";
import { useEffect, useState } from "react";

export type UseTokenMetadataProps = {
  tokenId: number;
  collectionAddress?: string;
};

type metaDataResponse = {
  image: string;
  attributes: {
    trait_type: string,
    value: number
  }[]
};

const collectionsApi =
  "https://api.sandbox.immutable.com/v1/chains/imtbl-zkevm-testnet/collections/__COLLECTION__/nfts/__TOKEN_ID__";

const defaultCollectionAddress = "0x02Fc714aA42BdAE32b14C3985CbcCE903B5fb3a8";

export const useTokenMetadata = ({
  tokenId,
  collectionAddress,
}: UseTokenMetadataProps) => {
  const [metadata, setMetadata] = useState<metaDataResponse | null>(null);
  const collection = collectionAddress || defaultCollectionAddress;

  let fetchMetadata = async () => {
    if (tokenId) {
      const url = collectionsApi
        .replace("__COLLECTION__", collection)
        .replace("__TOKEN_ID__", tokenId.toString());

      try {
        let nftResponse = await axios.get(url);
        setMetadata(nftResponse.data.result);
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

  return {metadata, fetchMetadata}
};
