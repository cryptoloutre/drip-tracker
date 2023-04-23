// Next, React
import { FC, useEffect, useState } from "react";
import Link from "next/link";

// Wallet
import { useWallet} from "@solana/wallet-adapter-react";


import { Metadata, Metaplex } from "@metaplex-foundation/js";
import {
  DRiPCollection,
  spacesCollection,
} from "../../../../lib/collectionAddresses";
import { Connection } from "@solana/web3.js";
import { RarityLegend } from "components/RarityLegend";

export const Drop8: FC = ({}) => {
  const wallet = useWallet();
  const connection = new Connection(
    "https://try-rpc.mainnet.solana.blockdaemon.tech"
  );
  const metaplex = new Metaplex(connection);
  const nfts = metaplex.nfts();
  const [userDripNFT, setUserDripNFT] = useState<any[]>();
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [nbUserNFTs, setNbUserNFTs] = useState<number>();

  const dropNumber = "8";
  const nbTotalNFTsInDrop = 2;

  async function getUserNFT() {
    if (!wallet.publicKey) {
      setUserDripNFT([]);
      return;
    }
    const publickey = wallet.publicKey;
    const _dropNFT = [];
    setIsFetched(false);

    const userNFTs = await metaplex.nfts().findAllByOwner({ owner: publickey }, {commitment:"processed"});

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
        _dropNFT.push({
          name: nft.name,
          
        });
      }
    });

    const dropNFTs = _dropNFT.filter((x, i) => _dropNFT.indexOf(x) === i);
    setNbUserNFTs(dropNFTs.length);

    console.log("Got their DROP NFTs!", dropNFTs);

    setUserDripNFT(dropNFTs);
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
            Drop8: <span className="italic">Stillness on Taggart</span> by{" "}
            <a
              target="_blank"
              rel="noreferrer"
              className="text-[#9945FF] font-bold"
              href={"https://twitter.com/austin_visual"}
            >
              @austin_visual
            </a>
          </h1>
          <div className="mt-12 w-[70%] mx-auto">
            <h2 className="underline text-2xl font-bold">Description</h2>
            <div>
              Austin is an artist based in the United States primarily exploring
              the relationship between human made and natural topography. He
              uses contrast, color-enhancing post processing techniques to
              create work with a soft, painterly feel.
              <br />
              These photographs were taken on a trip to Wyoming in Summer, 2021.
              He’s currently focused on capturing imagery in American suburbia,
              roadside scenes, and untouched landscapes.
            </div>
          </div>
          {wallet.publicKey && isFetched && (
            <div className="mt-4 w-[70%] mx-auto">
              <h2 className="underline text-2xl font-bold">Progress</h2>
              <div>
                You have               <span className="font-black text-[#14F195]">{nbUserNFTs}</span>{" "}
              out of{" "}
              <span className="font-black text-[#14F195]">
                {nbTotalNFTsInDrop}
              </span>{" "} NFT(s) of this drop!
              </div>
            </div>
          )}
          {!wallet.publicKey && (
            <div className="text-center font-bold text-xl mt-6">
              Please, connect your wallet to see your progression!
            </div>
          )}
          <RarityLegend />
          <div className="md:hero-content flex justify-center gap-2 mt-4">
            <div className="bg-[#000000] w-[150px] sm:w-[300px] border border-4 border-[#a5a5a5]">
              <img
                className="h-[150px] w-[150px] sm:h-[300px] sm:w-[300px]"
                src="https://shdw-drive.genesysgo.net/52zh6ZjiUQ5UKCwLBwob2k1BC3KF2qhvsE7V4e8g2pmD/Stillness%20On%20Taggart.jpg"
              ></img>
              <h1 className="font-bold mt-2">Stillness On Taggart</h1>
              {isFetched && wallet.publicKey && (
                <div className="flex justify-center">
                  {isFetched &&
                  userDripNFT.find((nft) => nft.name == "Stillness On Taggart") !=
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
                        "https://magiceden.io/marketplace/F8FdDYD3PWndYoae9TrBcucXDWFwDvm6bZU2LQT1PwyB?search=Stillness%2520On%2520Taggart"
                      }
                    >
                      Buy on Magic Eden
                    </a>
                  )}
                </div>
              )}
            </div>

            <div className="bg-[#000000] w-[150px] sm:w-[300px] border border-4 border-[#a5a5a5]">
              <img
                className="h-[150px] w-[150px] sm:h-[300px] sm:w-[300px]"
                src="https://shdw-drive.genesysgo.net/52zh6ZjiUQ5UKCwLBwob2k1BC3KF2qhvsE7V4e8g2pmD/Glow%20On%20Mormon%20Row.jpg"
              ></img>
              <h1 className="font-bold mt-2">Glow On Mormon Row</h1>
              {isFetched && wallet.publicKey && (
                <div className="flex justify-center">
                  {userDripNFT.find((nft) => nft.name == "Glow On Mormon Row") !=
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
                        "https://magiceden.io/marketplace/F8FdDYD3PWndYoae9TrBcucXDWFwDvm6bZU2LQT1PwyB?search=Glow%2520On%2520Mormon%2520Row"
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
