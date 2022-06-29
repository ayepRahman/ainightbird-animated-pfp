// Print total NFT count returned in the response:
import axios from "axios";
import { useMutation, UseMutationOptions } from "react-query";
const apiKey = process.env.REACT_APP_ALCHEMY_API;
const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${apiKey}/getNFTMetadata`;
const tokenType = "erc721";
const prefixUrl = `https://ipfs.io/ipfs`;

export interface TokenMetadata {
  contract: {
    address: string;
  };
  id: {
    tokenId: string;
    tokenMetadata: {
      tokenType: string;
    };
  };
  title: string;
  description: string;
  tokenUri: {
    raw: string;
    gateway: string;
  };
  media: [
    {
      raw: string;
      gateway: string;
    }
  ];
  metadata: {
    name: string;
    description: string;
    image: string;
    external_url: string;
    attributes: {
      value: string;
      trait_type: string;
    }[];
  };
  timeLastUpdated: string;
}

const useGetTokenMedata = (
  options?: UseMutationOptions<
    TokenMetadata,
    any,
    { contractAddress: string; tokenId: string }
  >
) => {
  return useMutation(
    async ({ contractAddress, tokenId }) => {
      const { data } = await axios.get<TokenMetadata>(
        `${baseURL}?contractAddress=${contractAddress}&tokenId=${tokenId}&tokenType=${tokenType}`
      );
      return data;
    },

    options
  );
};

export default useGetTokenMedata;
