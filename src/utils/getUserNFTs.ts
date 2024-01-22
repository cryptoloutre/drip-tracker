import { WrapperConnection } from "../../ReadApi/WrapperConnection";

export const getUserNFTs = async (address: string) => {
  const connection = new WrapperConnection(
    "https://mainnet.helius-rpc.com/?api-key=634713f0-b4f2-41dc-af7f-ed7d60bd70e2"
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
