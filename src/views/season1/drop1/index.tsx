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

export const Drop1: FC = ({}) => {
  const wallet = useWallet();
  const connection = new Connection(
    "https://try-rpc.mainnet.solana.blockdaemon.tech"
  );
  const metaplex = new Metaplex(connection);
  const nfts = metaplex.nfts();
  const [userDripNFT, setUserDripNFT] = useState<any[]>();
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [nbUserNFTs, setNbUserNFTs] = useState<number>();

  const dropNumber = "1";
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

    const spacesCollectionNFTs = userNFTs.filter(
      (metadata) =>
        metadata.collection !== null &&
        metadata.collection.verified &&
        metadata.collection.address.toBase58() === spacesCollection.toBase58()
    );

    // Load the JSON for each NFT
    const loadedSpacesNfts = await Promise.all(
      spacesCollectionNFTs.map((metadata) => {
        return nfts.load({ metadata: metadata as Metadata });
      })
    );

    loadedSpacesNfts.map((nft) => {
      const drop = nft.json?.attributes?.find(
        (nft) => nft.trait_type == "drop"
      ).value;
      if (drop == dropNumber) {
        _dropNFT.push(nft.name);
      }
    });

    const dripCollectionNFTs = userNFTs.filter(
      (metadata) =>
        metadata.collection !== null &&
        metadata.collection.verified &&
        metadata.collection.address.toBase58() === DRiPCollection.toBase58()
    );

    // Load the JSON for each NFT
    const loadedDripNfts = await Promise.all(
      dripCollectionNFTs.map((metadata) => {
        return nfts.load({ metadata: metadata as Metadata });
      })
    );

    loadedDripNfts.map((nft) => {
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
            Drop1: <span className="italic">AGILITY</span> by{" "}
            <a
              target="_blank"
              rel="noreferrer"
              className="text-[#9945FF] font-bold"
              href={"https://twitter.com/VWPNY"}
            >
              @VWPNY
            </a>
            , EROSION series
          </h1>
          <div className="mt-12 sm:w-[70%] mx-auto">
            <h2 className="underline text-2xl font-bold">Description</h2>
            <div>
              Vincent Pagnotta, or{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/VWPNY"}
              >
                @VWPNY
              </a>
              , is known for his blob style artwork. He uses geometry and colors
              to tell stories. <br />
              EROSION is all about optics and experimentation. KINK, a piece
              that took Solana art by storm a month ago, was born through
              experimentation like this.
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
          <div className="flex justify-center">
            <div className="sm:w-[70%] flex items-center grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
              <div className="bg-[#000000] border border-4 border-[#a5a5a5]">
                <img
                  className=""
                  src="https://arweave.net/zvY7qNPUKOXmn8HPDA2zn5UKZXJLqcgSLf_lNVJ40pY"
                ></img>
                <h1 className="font-bold mt-2">AGILITY</h1>
                {isFetched && (wallet.publicKey || isXNFT) && (
                  <div className="flex justify-center">
                    {isFetched &&
                    userDripNFT.find((nft) => nft == "AGILITY") != undefined ? (
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
                          "https://magiceden.io/marketplace/Zq5YzktHuP5heDTbGKtBQ6fZeVKcxXPwMZdqtg1etbj?search=AGILITY"
                        }
                      >
                        Buy on Magic Eden
                      </a>
                    )}
                  </div>
                )}
              </div>

              <div className="bg-[#000000] border border-4 border-[#E6C15A]">
                <img
                  className=""
                  src="https://arweave.net/JQa7FdS1KlU-AVEiSuQFNxuEaZgphrUmay9UnkyRDXI"
                ></img>
                <h1 className="font-bold mt-2">ULTRASOUND</h1>
                {isFetched && (wallet.publicKey || isXNFT) && (
                  <div className="flex justify-center">
                    {userDripNFT.find((nft) => nft.name == "ULTRASOUND") !=
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
                          "https://magiceden.io/marketplace/Zq5YzktHuP5heDTbGKtBQ6fZeVKcxXPwMZdqtg1etbj?search=ULTRASOUND"
                        }
                      >
                        Buy on Magic Eden
                      </a>
                    )}
                  </div>
                )}
              </div>

              <div className="bg-[#000000] border border-4 border-t-[#14F195] border-r-[#14F195] border-b-[#9945FF] border-l-[#9945FF]">
                <img
                  className=""
                  src="https://shdw-drive.genesysgo.net/52zh6ZjiUQ5UKCwLBwob2k1BC3KF2qhvsE7V4e8g2pmD/DATAT_TRANSFER.PNG"
                ></img>
                <h1 className="font-bold mt-2">DATA TRANSFER</h1>
                {isFetched && (wallet.publicKey || isXNFT) && (
                  <div className="flex justify-center">
                    {userDripNFT.find((nft) => nft == "DATA TRANSFER") !=
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
                          "https://magiceden.io/marketplace/drip_season_1?search=DATA%2520TRANSFER"
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
    </div>
  );
};
