import { WrapperConnection } from "../../ReadApi/WrapperConnection";

export const getUserNFTs = async (address: string) => {
  const connection = new WrapperConnection(
    "https://mainnet.helius-rpc.com/?api-key=1d8740dc-e5f4-421c-b823-e1bad1889eff"
  );

  /// store all the user NFTs
  const NFTsList = [];
  let hasAllNfts = false;
  let page = 1;

  try {
    /// got all the NFTs of the user
    while (!hasAllNfts) {
      const userNFTs = await connection.getAssetsByOwner({
        ownerAddress: address,
        page: page,
      });
      NFTsList.push(...userNFTs.items);
      if (userNFTs.total !== 1000) {
        hasAllNfts = true;
      } else {
        page++;
      }
    }
  } catch (error) {
    console.log(error);
  }

  return NFTsList;
};
