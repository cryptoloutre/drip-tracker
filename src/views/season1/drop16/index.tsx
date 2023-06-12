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
import { DropInfo } from "../home/DropInfo";

export const Drop16: FC = ({}) => {
  const wallet = useWallet();
  const connection = new Connection(
    "https://try-rpc.mainnet.solana.blockdaemon.tech"
  );
  const metaplex = new Metaplex(connection);
  const nfts = metaplex.nfts();
  const [userDripNFT, setUserDripNFT] = useState<any[]>();
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [nbUserNFTs, setNbUserNFTs] = useState<number>();

  const dropNumber = "16";
  const nbTotalNFTsInDrop = DropInfo.find((drop) => drop.dropNb.toString() == dropNumber).nbNFT;

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
            Drop16: <span className="italic">Metropolis</span> by{" "}
            <a
              target="_blank"
              rel="noreferrer"
              className="text-[#9945FF] font-bold"
              href={"https://twitter.com/itsdaramola"}
            >
              @itsdaramola
            </a>
          </h1>
          <div className="mt-12 w-[70%] mx-auto">
            <h2 className="underline text-2xl font-bold">Description</h2>
            <div>
              On the creation of Metropolis.{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/itsdaramola"}
              >
                @itsdaramola
              </a>
              : &quot;I created this timelapse between the hours of 11:45pm on
              December 31, 2022, and 12:10am on January 1st, 2023. If you look
              closely you&apos;ll find smoke flares from fireworks. The goal
              behind this piece was to challenge myself into embracing
              discomfort and powering through it. Creating while entering the
              new year was also a reminder to keep my promises to myself.
              <br />
              &quot;Art should comfort the disturbed and disturb the
              comfortable&quot; – Cesar A. Cruz.&quot;
              <br />
              Daramola is a singer/songwriter, music producer, and performing
              artist signed to{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/sonyMusicPub"}
              >
                @SonyMusicPub
              </a>
              , and managed by{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/neon16_"}
              >
                @neon16_
              </a>{" "}
              . He has worked with Ke$ha, Tainy (Bad bunny, J. Balvin), Trevor
              Daniel, Becky G, Lecrae, CNCO, Beele, Dylan Fuentes, BEAM, and
              many more.
              <br />
              Find Daramola&apos;s music on{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://open.spotify.com/artist/36qm7VRfBdnnJRBS1fd0mA"}
              >
                Spotify
              </a>
              .<br />
              He&apos;s also a Solana creator and artist, dropping PFPs, 1:1
              art, and music NFTs under his Web3 brand{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/svplychvn"}
              >
                @svplychvn
              </a>
              . And soon, CRVTXRZ.
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
          <RarityLegend/>
          <div className="md:hero-content flex justify-center mt-4">
            <div className="bg-[#000000] border border-4 border-[#a5a5a5]">
              <img
                className="h-[300px] w-[300px]"
                src="https://shdw-drive.genesysgo.net/52zh6ZjiUQ5UKCwLBwob2k1BC3KF2qhvsE7V4e8g2pmD/eaa68e59-b79c-46cb-b246-064d85cf3af7-Metropolis%20Cover.JPG"
              ></img>
              <h1 className="font-bold mt-2">Metropolis</h1>
              {isFetched && wallet.publicKey && (
                <div className="flex justify-center">
                  {isFetched &&
                  userDripNFT.find((nft) => nft == "Metropolis") !=
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
                        "https://magiceden.io/marketplace/F8FdDYD3PWndYoae9TrBcucXDWFwDvm6bZU2LQT1PwyB?search=Metropolis"
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
