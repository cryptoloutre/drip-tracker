// Next, React
import { FC, useEffect, useState } from "react";
import Link from "next/link";

// Wallet
import { useWallet } from "@solana/wallet-adapter-react";

import { RarityLegend } from "components/RarityLegend";
import { WrapperConnection } from "../../../../ReadApi/WrapperConnection";
import { getUserNFTs } from "utils/getUserNFTs";

export const Drop12S2: FC = ({}) => {
  const wallet = useWallet();
  const connection = new WrapperConnection(
    "https://mainnet.helius-rpc.com/?api-key=1d8740dc-e5f4-421c-b823-e1bad1889eff"
  );
  const [userDripNFT, setUserDripNFT] = useState<any[]>();
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [nbUserNFTs, setNbUserNFTs] = useState<number>();

  const [isXNFT, setIsXNFT] = useState(false);

  useEffect(() => {
    // @ts-ignore
    if (window.xnft?.solana.isXnft) {
      setIsXNFT(true);
    }
  }, []);

  async function getUserNFT() {
    // @ts-ignore
    const publickey = isXNFT ? window.xnft.solana.publicKey : wallet.publicKey;
    const _dropNFT = [];
    setIsFetched(false);

    const userNFTs = await getUserNFTs(publickey.toBase58());

    const wombatNFT = userNFTs.filter(
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
        let responseData: any;
        const uri = asset.content.json_uri;
        const response = await fetch(uri);
        responseData = await response.json();
        if (asset.content.metadata.attributes) {
          attributes = asset.content.metadata.attributes;
        } else {
          attributes = responseData.attributes;
        }
        const name = asset.content.metadata.name;
        const rarity = attributes.find(
          (nft) => nft.trait_type == "Rarity"
        ).value;
        // @ts-ignore
        const image = responseData.image;
        const isUpgrade =
          attributes.find((nft) => nft.trait_type == "Upgrade") != undefined
            ? true
            : false;

        userWombat.push({
          name: name,
          image: image,
          rarity: rarity,
          isUpgrade: isUpgrade,
        });
      })
    );

    setNbUserNFTs(userWombat.length);

    console.log("Got their DROP NFTs!", userWombat);

    setUserDripNFT(userWombat);
    setIsFetched(true);
  }

  useEffect(() => {
    if (wallet.publicKey || isXNFT) {
      getUserNFT();
    }
  }, [wallet.publicKey, isXNFT]);

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
          <div className="mt-12 sm:w-[70%] mx-auto">
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
          {(wallet.publicKey || isXNFT) && isFetched && (
            <div className="mt-4 sm:w-[70%] mx-auto">
              <h2 className="underline text-2xl font-bold">Progress</h2>
              <div>
                You have{" "}
                <span className="font-black text-[#14F195]">{nbUserNFTs}</span>{" "}
                The Faceless!
              </div>
            </div>
          )}
          {!wallet.publicKey && !isXNFT && (
            <div className="text-center font-bold text-xl mt-6">
              Please, connect your wallet to see your NFTs!
            </div>
          )}
          <RarityLegend />
          <div className="flex justify-center">
            <div className="sm:w-[85%] flex items-center grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {isFetched &&
                userDripNFT.map((currentNft) => (
                  <div key={currentNft.name}>
                    <div
                      className={`bg-[#000000] border border-4 ${
                        currentNft.rarity == "Common" && "border-[#a5a5a5]"
                      } ${currentNft.rarity == "Rare" && "border-[#E6C15A]"} ${
                        currentNft.rarity == "Legendary" &&
                        "border-t-[#14F195] border-r-[#14F195] border-b-[#9945FF] border-l-[#9945FF]"
                      }`}
                    >
                      <div className="flex justify-center">
                        <img
                          className="h-[200px] lg:h-[250px]"
                          src={currentNft.image}
                        ></img>
                      </div>
                      <h1 className="font-bold mt-2">
                        {currentNft.name}{" "}
                        {currentNft.isUpgrade == true && (
                          <span className="font-bold text-sm italic">(Season Reward)</span>
                        )}
                      </h1>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
