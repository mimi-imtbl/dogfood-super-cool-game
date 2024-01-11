import axios from "axios";
import {useEffect, useState} from "react";

export type useTokenMetadataProps = number | null

type metaDataResponse = {
    image: string
}
export const useTokenMetadata = (tokenId : useTokenMetadataProps) => {
  const [metadata, setMetadata] = useState<metaDataResponse | null>(null)

  useEffect(() => {
    (async () => {
      if (tokenId) {
        let nftResponse = await axios.get("https://api.sandbox.immutable.com/v1/chains/imtbl-zkevm-testnet/collections/0x02Fc714aA42BdAE32b14C3985CbcCE903B5fb3a8/nfts/" + tokenId)
        setMetadata(nftResponse.data.result)
      }
    })()
  }, [tokenId]);

  return metadata
}