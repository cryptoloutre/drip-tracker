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

export const Drop11: FC = ({}) => {
  const wallet = useWallet();
  const connection = new Connection(
    "https://try-rpc.mainnet.solana.blockdaemon.tech"
  );
  const metaplex = new Metaplex(connection);
  const nfts = metaplex.nfts();
  const [userDripNFT, setUserDripNFT] = useState<any[]>();
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [nbUserNFTs, setNbUserNFTs] = useState<number>();

  const dropNumber = "11";
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

    console.log("Got their DROP NFTs!", dropNFTs);

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
            Drop11: <span className="italic">Solana Spaceman</span> by{" "}
            <a
              target="_blank"
              rel="noreferrer"
              className="text-[#9945FF] font-bold"
              href={"https://twitter.com/notbunjil"}
            >
              @notbunjil
            </a>
          </h1>
          <div className="mt-12 sm:w-[70%] mx-auto">
            <h2 className="underline text-2xl font-bold">Description</h2>
            <div>
              The founder behind{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/lotusgangnft"}
              >
                @lotusgangnft
              </a>{" "}
              and{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/thelilynft"}
              >
                @thelilynft
              </a>
              ,{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/notbunjil"}
              >
                @notbunjil
              </a>{" "}
              is more than just an artist. He&apos;s a community leader,
              hilarious yet surprisingly insightful shitposter, and a steadfast
              Solana advocate.
              <br />
              On Spaceman: &quot;The spelunker is rendered in my{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/THELILYNFT"}
              >
                @THELILYNFT
              </a>{" "}
              style, even though it is not a part of the collection.{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/solanaspaces"}
              >
                @solanaspaces
              </a>{" "}
              feels very Solana. Like this could only have happened here. The
              way everyone organically operates in Solana cannot be bought or
              replicated.&quot;
              <br />
              On his signature style: &quot;I would like to think my work is
              effervescent. I hope to show movement, emotion and excitement
              however I can. I do this through pixel art, digital illustration,
              and even animation. I try to use bold shapes and lines to deliver
              a punchline quickly.&quot;
              <br />
              <br />
              Two Legendaries were airdropped to{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/THELILYNFT"}
              >
                @THELILYNFT
              </a>{" "}
              or{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/lotusgangnft"}
              >
                @lotusgangnft
              </a>{" "}
              holders. See{" "}
              <a
                href="https://twitter.com/drip_haus/status/1643046316443041793"
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
              >
                announcement
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
                  src="https://shdw-drive.genesysgo.net/52zh6ZjiUQ5UKCwLBwob2k1BC3KF2qhvsE7V4e8g2pmD/SolanaSpaceman.png"
                ></img>
                <h1 className="font-bold mt-2">Solana Spaceman</h1>
                {isFetched && (wallet.publicKey || isXNFT) && (
                  <div className="flex justify-center">
                    {isFetched &&
                    userDripNFT.find((nft) => nft == "Solana Spaceman") !=
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
                          "https://magiceden.io/marketplace/F8FdDYD3PWndYoae9TrBcucXDWFwDvm6bZU2LQT1PwyB?search=Solana%2520Spaceman"
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
                  src="https://shdw-drive.genesysgo.net/52zh6ZjiUQ5UKCwLBwob2k1BC3KF2qhvsE7V4e8g2pmD/SolanaSpaceman2.png"
                ></img>
                <h1 className="font-bold mt-2">Solana Space Knight</h1>
                {isFetched && (wallet.publicKey || isXNFT) && (
                  <div className="flex justify-center">
                    {isFetched &&
                    userDripNFT.find((nft) => nft == "Solana Space Knight") !=
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
                          "https://magiceden.io/marketplace/drip_season_1?search=Solana%2520Space%2520Knight"
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
                  src="https://shdw-drive.genesysgo.net/52zh6ZjiUQ5UKCwLBwob2k1BC3KF2qhvsE7V4e8g2pmD/SolanaSpaceman4.png"
                ></img>
                <h1 className="font-bold mt-2">Legendary Solana Spaceman</h1>
                {isFetched && (wallet.publicKey || isXNFT) && (
                  <div className="flex justify-center">
                    {isFetched &&
                    userDripNFT.find(
                      (nft) => nft == "Legendary Solana Spaceman"
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
                          "https://magiceden.io/marketplace/drip_season_1?search=Legendary%2520Solana%2520Spaceman"
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
