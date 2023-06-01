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

export const Drop6: FC = ({}) => {
  const wallet = useWallet();
  const connection = new Connection(
    "https://try-rpc.mainnet.solana.blockdaemon.tech"
  );
  const metaplex = new Metaplex(connection);
  const nfts = metaplex.nfts();
  const [userDripNFT, setUserDripNFT] = useState<any[]>();
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [nbUserNFTs, setNbUserNFTs] = useState<number>();

  const dropNumber = "6";
  const nbTotalNFTsInDrop = 3;

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
              Drop6: <span className="italic">Edith DRiP</span> by{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/wetikos"}
              >
                 @wetikos
              </a>
            </h1>
            <div className="mt-12 w-[70%] mx-auto">
              <h2 className="underline text-2xl font-bold">Description</h2>
              <div>
              Wétiko is a painter and mural artist based out of Detroit, Michigan. Wétiko’s first experiment within crypto art is a character named Edith.<br />
              Edith is the creative output of all the inspiration pulled from within the Solana ecosystem. Traditional execution in a digital world.<br />
              Wétiko painted &quot;Reawaken&quot;, the towering mural <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/solanaspaces"}
              >@solanaspaces </a>Miami, and has created murals for brands like Chrysler, Arcteryx, and the Detroit Pistons.
              </div>
            </div>
              {wallet.publicKey && isFetched &&
            <div className="mt-4 w-[70%] mx-auto">
            <h2 className="underline text-2xl font-bold">Progress</h2>
            <div>You have               <span className="font-black text-[#14F195]">{nbUserNFTs}</span>{" "}
              out of{" "}
              <span className="font-black text-[#14F195]">
                {nbTotalNFTsInDrop}
              </span>{" "} NFT(s) of this drop!</div>
            </div>}
            {!wallet.publicKey && <div className="text-center font-bold text-xl mt-6">Please, connect your wallet to see your progression!</div>}
            <RarityLegend />
            <div className="flex justify-center">
          <div className="w-[70%] flex items-center grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
              <div className="bg-[#000000] border border-4 border-[#a5a5a5]">
                <img
                  className=""
                  src="https://shdw-drive.genesysgo.net/52zh6ZjiUQ5UKCwLBwob2k1BC3KF2qhvsE7V4e8g2pmD/Edith%20Drip.png"
                ></img>
                <h1 className="font-bold mt-2">Edith DRiP</h1>
                {isFetched && wallet.publicKey &&
                <div className="flex justify-center">
                  {isFetched && userDripNFT.find((nft) => nft == "Edith DRiP") !=
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
                        "https://magiceden.io/marketplace/F8FdDYD3PWndYoae9TrBcucXDWFwDvm6bZU2LQT1PwyB?search=Edith%2520DRiP"
                      }
                    >
                      Buy on Magic Eden
                    </a>
                  )}
                </div>
                }
              </div>

              <div className="bg-[#000000] border border-4 border-t-[#14F195] border-r-[#14F195] border-b-[#9945FF] border-l-[#9945FF]">
                <img
                  className=""
                  src="https://shdw-drive.genesysgo.net/52zh6ZjiUQ5UKCwLBwob2k1BC3KF2qhvsE7V4e8g2pmD/Edith%20Drip%20v2.png"
                ></img>
                <h1 className="font-bold mt-2">Edith DRiP v2</h1>
                {isFetched && wallet.publicKey &&
                <div className="flex justify-center">
                  {isFetched && userDripNFT.find((nft) => nft == "Edith DRiP v2") !=
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
                        "https://magiceden.io/marketplace/drip_season_1?search=Edith%2520DRiP%2520v2"
                      }
                    >
                      Buy on Magic Eden
                    </a>
                  )}
                </div>
                }
              </div>

              <div className="bg-[#000000] border border-4 border-t-[#14F195] border-r-[#14F195] border-b-[#9945FF] border-l-[#9945FF]">
                <img
                  className=""
                  src="https://shdw-drive.genesysgo.net/52zh6ZjiUQ5UKCwLBwob2k1BC3KF2qhvsE7V4e8g2pmD/Edith%20Drip%20v3.png"
                ></img>
                <h1 className="font-bold mt-2">Edith DRiP v3</h1>
                {isFetched && wallet.publicKey &&
                <div className="flex justify-center">
                  {isFetched && userDripNFT.find((nft) => nft == "Edith DRiP v3") !=
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
                        "https://magiceden.io/marketplace/drip_season_1?search=Edith%2520DRiP%2520v3"
                      }
                    >
                      Buy on Magic Eden
                    </a>
                  )}
                </div>
                }
              </div>
              </div>
            </div>

            
          </div>
      </div>
    </div>
  );
};
