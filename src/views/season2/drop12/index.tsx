// Next, React
import { FC, useEffect, useState } from "react";
import Link from "next/link";

// Wallet
import { useWallet } from "@solana/wallet-adapter-react";

import { RarityLegend } from "components/RarityLegend";
import { WrapperConnection } from "../../../../ReadApi/WrapperConnection";

export const Drop12S2: FC = ({}) => {
  const wallet = useWallet();
  const connection = new WrapperConnection(
    "https://mainnet.helius-rpc.com/?api-key=1d8740dc-e5f4-421c-b823-e1bad1889eff"
  );
  const [userDripNFT, setUserDripNFT] = useState<any[]>();
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [nbUserNFTs, setNbUserNFTs] = useState<number>();

  async function getUserNFT() {
    if (!wallet.publicKey) {
      setUserDripNFT([]);
      return;
    }
    const publickey = wallet.publicKey;
    const _dropNFT = [];
    setIsFetched(false);

    const userNFTs = await connection.getAssetsByOwner({
      ownerAddress: publickey.toBase58(),
    });

    const wombatNFT = userNFTs.items.filter(
      (asset) =>
        asset.compression.compressed &&
        asset.grouping[0] != undefined &&
        asset.grouping[0].group_value ==
          "WoMbiTtXKwUtf4wosoffv45khVF8yA2mPkinGosCFQ4"
    );

    console.log(wombatNFT);

    const userWombat = [];

    await Promise.all(
      wombatNFT.map(async (asset) => {
        let attributes: any;
        if (asset.content.metadata.attributes) {
          attributes = asset.content.metadata.attributes;
        } else {
          const uri = asset.content.json_uri;
          const response = await fetch(uri);
          const responseData = await response.json();
          attributes = responseData.attributes;
        }

        const name = asset.content.metadata.name;
        const rarity = attributes.find(
          (nft) => nft.trait_type == "Rarity"
        ).value;
        // @ts-ignore
        const image = asset.content.files[0].uri;
        userWombat.push({
          name: name,
          image: image,
          rarity: rarity,
        });
      })
    );

    setNbUserNFTs(userWombat.length);

    console.log("Got their DROP NFTs!", userWombat);

    setUserDripNFT(userWombat);
    setIsFetched(true);
  }

  useEffect(() => {
    if (wallet.publicKey) {
      getUserNFT();
    }
  }, [wallet.publicKey]);

  return (
    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex">
        <div className="mt-6"></div>

        <div>
          <h1 className="text-center text-3xl font-bold">
            Drop12: <span className="italic">The Faceless</span> by{" "}
            <a
              target="_blank"
              rel="noreferrer"
              className="text-[#9945FF] font-bold"
              href={"https://twitter.com/ChildOfBusiness"}
            >
              @ChildOfBusiness
            </a>
          </h1>
          <div className="mt-12 w-[70%] mx-auto">
            <h2 className="underline text-2xl font-bold">Description</h2>
            <div>
              Born in El Salvador, and currently residing in the USA, Wombat (
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/ChildOfBusiness"}
              >
                @ChildOfBusiness
              </a>
              ) has been an active, positive, and well-loved part of the Solana
              community.
              <br />
              Learn more about this collection, the design process, and Wombat
              in this new{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={
                  "https://twitter.com/GroveSt_NFT/status/1666499625837277184"
                }
              >
                interview
              </a>{" "}
              by the Mad King{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/GroveSt_NFT"}
              >
                @GroveSt_NFT
              </a>
              .
            </div>
          </div>
          {wallet.publicKey && isFetched && (
            <div className="mt-4 w-[70%] mx-auto">
              <h2 className="underline text-2xl font-bold">Progress</h2>
              <div>
                You have{" "}
                <span className="font-black text-[#14F195]">{nbUserNFTs}</span>{" "}
                The Faceless!
              </div>
            </div>
          )}
          {!wallet.publicKey && (
            <div className="text-center font-bold text-xl mt-6">
              Please, connect your wallet to see your NFTs!
            </div>
          )}
          <RarityLegend />
          <div className="flex justify-center">
            <div className="sm:w-[85%] flex items-center grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  {isFetched && userDripNFT.map((currentNft) => (
                    <div key={currentNft.name}>
                      {currentNft.rarity == "Common" && (
                        <div className="bg-[#000000] border border-4 border-[#a5a5a5]">
                          <div className="flex justify-center">
                            <img
                              className="h-[200px] lg:h-[250px]"
                              src={currentNft.image}
                            ></img>
                          </div>
                          <h1 className="font-bold mt-2">{currentNft.name}</h1>
                        </div>
                      )}
                      {currentNft.rarity == "Legendary" && (
                        <div className="bg-[#000000] border border-4 border-t-[#14F195] border-r-[#14F195] border-b-[#9945FF] border-l-[#9945FF]">
                          <div className="flex justify-center">
                            <img
                              className="h-[200px] lg:h-[250px]"
                              src={currentNft.image}
                            ></img>
                          </div>
                          <h1 className="font-bold mt-2">{currentNft.name}</h1>
                        </div>
                      )}
                      {currentNft.rarity == "Rare" && (
                        <div className="bg-[#000000] border border-4 border-[#E6C15A]">
                          <div className="flex justify-center">
                            <img
                              className="h-[200px] lg:h-[250px]"
                              src={currentNft.image}
                            ></img>
                          </div>
                          <h1 className="font-bold mt-2">{currentNft.name}</h1>
                        </div>
                      )}
                    </div>
                  ))}
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
