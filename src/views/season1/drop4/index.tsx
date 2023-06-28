// Next, React
import { FC, useEffect, useState } from "react";
import Link from "next/link";

// Wallet
import { useWallet } from "@solana/wallet-adapter-react";

import { Metadata, Metaplex } from "@metaplex-foundation/js";
import {
  DRiPCollection,
  spacesCollection,
} from "../../../../lib/collectionAddresses";
import { Connection } from "@solana/web3.js";
import { RarityLegend } from "components/RarityLegend";
import { DropInfo } from "../home/DropInfo";

export const Drop4: FC = ({}) => {
  const wallet = useWallet();
  const connection = new Connection(
    "https://try-rpc.mainnet.solana.blockdaemon.tech"
  );
  const metaplex = new Metaplex(connection);
  const nfts = metaplex.nfts();
  const [userDripNFT, setUserDripNFT] = useState<any[]>();
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [nbUserNFTs, setNbUserNFTs] = useState<number>();

  const dropNumber = "4";
  const nbTotalNFTsInDrop = DropInfo.find(
    (drop) => drop.dropNb.toString() == dropNumber
  ).nbNFT;

  const [isXNFT, setIsXNFT] = useState(false);

  useEffect(() => {
    if (window.xnft.solana.isXnft) {
      setIsXNFT(true);
    }
  }, []);

  async function getUserNFT() {
    const publickey = isXNFT ? window.xnft.solana.publicKey : wallet.publicKey;
    const _dropNFT = [];
    setIsFetched(false);

    const userNFTs = await metaplex
      .nfts()
      .findAllByOwner({ owner: publickey }, { commitment: "processed" });

    const dripCollectionNFTs = userNFTs.filter(
      (metadata) =>
        metadata.collection !== null &&
        metadata.collection.verified &&
        metadata.collection.address.toBase58() === DRiPCollection.toBase58()
    );

    // Load the JSON for each NFT
    const loadedSpacesNfts = await Promise.all(
      dripCollectionNFTs.map((metadata) => {
        return nfts.load({ metadata: metadata as Metadata });
      })
    );

    loadedSpacesNfts.map((nft) => {
      const drop = nft.json.attributes.find(
        (nft) => nft.trait_type == "drop"
      ).value;
      if (drop == dropNumber) {
        _dropNFT.push(nft.name);
      }
    });

    const dropNFTs = _dropNFT.filter((x, i) => _dropNFT.indexOf(x) === i);
    setNbUserNFTs(dropNFTs.length);

    console.log("Got their DROP 1 NFTs!", dropNFTs);

    setUserDripNFT(dropNFTs);
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
            Drop4: <span className="italic">hanaknight gacha #1</span> by{" "}
            <a
              target="_blank"
              rel="noreferrer"
              className="text-[#9945FF] font-bold"
              href={"https://twitter.com/_hanaknight17"}
            >
              @_hanaknight17
            </a>
          </h1>
          <div className="mt-12 sm:w-[70%] mx-auto">
            <h2 className="underline text-2xl font-bold">Description</h2>
            <div>
              Hana is a mixed-media artist who believes in the power of art to
              push for tech and societal progress. Her main visual artistic
              medium is dried flowers.
            </div>
          </div>
          {(wallet.publicKey || isXNFT) && isFetched && (
            <div className="mt-4 sm:w-[70%] mx-auto">
              <h2 className="underline text-2xl font-bold">Progress</h2>
              <div>
                You have{" "}
                <span className="font-black text-[#14F195]">{nbUserNFTs}</span>{" "}
                out of{" "}
                <span className="font-black text-[#14F195]">
                  {nbTotalNFTsInDrop}
                </span>{" "}
                NFT(s) of this drop!
              </div>
            </div>
          )}
          {!wallet.publicKey && !isXNFT && (
            <div className="text-center font-bold text-xl mt-6">
              Please, connect your wallet to see your progression!
            </div>
          )}
          <RarityLegend />
          <div className="md:hero-content flex justify-center gap-2 mt-4">
            <div className="bg-[#000000] w-[150px] sm:w-[300px] border border-4 border-[#a5a5a5]">
              <img
                className="h-[150px] w-[150px] sm:h-[300px] sm:w-[300px]"
                src="https://shdw-drive.genesysgo.net/52zh6ZjiUQ5UKCwLBwob2k1BC3KF2qhvsE7V4e8g2pmD/hanaknight_solanaspaces_16Nov.png"
              ></img>
              <h1 className="font-bold mt-2">hanaknight gacha #1</h1>
              {isFetched && (wallet.publicKey || isXNFT) && (
                <div className="flex justify-center">
                  {isFetched &&
                  userDripNFT.find((nft) => nft == "hanaknight gacha #1") !=
                    undefined ? (
                    <a
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 py-2 px-2 font-bold rounded-xl text-xs bg-[#14F195] uppercase sm:ml-1 mb-2 sm:mb-4"
                    >
                      Owned
                    </a>
                  ) : (
                    <a
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 py-2 px-2 font-bold rounded-xl text-xs bg-[#E42575] hover:bg-[#BA2163] uppercase sm:ml-1 mb-2 sm:mb-4"
                      href={
                        "https://magiceden.io/marketplace/F8FdDYD3PWndYoae9TrBcucXDWFwDvm6bZU2LQT1PwyB?search=hanaknight%2520gacha%2520%25231"
                      }
                    >
                      Buy on Magic Eden
                    </a>
                  )}
                </div>
              )}
            </div>

            <div className="bg-[#000000] w-[150px] sm:w-[300px] border border-4 border-[#E6C15A]">
              <img
                className="h-[150px] w-[150px] sm:h-[300px] sm:w-[300px]"
                src="https://shdw-drive.genesysgo.net/52zh6ZjiUQ5UKCwLBwob2k1BC3KF2qhvsE7V4e8g2pmD/hanaknight_solanaspaces_nov16-rare.jpg"
              ></img>
              <h1 className="font-bold mt-2">photographs of the gacha #1</h1>
              {isFetched && (wallet.publicKey || isXNFT) && (
                <div className="flex justify-center">
                  {userDripNFT.find(
                    (nft) => nft == "photographs of the gacha #1"
                  ) != undefined ? (
                    <a
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 py-2 px-2 font-bold rounded-xl text-xs bg-[#14F195] uppercase sm:ml-1 mb-2 sm:mb-4"
                    >
                      Owned
                    </a>
                  ) : (
                    <a
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 py-2 px-2 font-bold rounded-xl text-xs bg-[#E42575] hover:bg-[#BA2163] uppercase sm:ml-1 mb-2 sm:mb-4"
                      href={
                        "https://magiceden.io/marketplace/F8FdDYD3PWndYoae9TrBcucXDWFwDvm6bZU2LQT1PwyB?search=photographs%2520of%2520the%2520gacha%2520%25231"
                      }
                    >
                      Buy on Magic Eden
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
