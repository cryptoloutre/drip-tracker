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

export const Drop18: FC = ({}) => {
  const wallet = useWallet();
  const connection = new Connection(
    "https://try-rpc.mainnet.solana.blockdaemon.tech"
  );
  const metaplex = new Metaplex(connection);
  const nfts = metaplex.nfts();
  const [userDripNFT, setUserDripNFT] = useState<any[]>();
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [nbUserNFTs, setNbUserNFTs] = useState<number>();

  const dropNumber = "18";
  const nbTotalNFTsInDrop = 1;

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
    if (dropNFTs.find((nft) => nft.name == "Ascension of Toonies"
    ) != undefined) {
      setNbUserNFTs(1);
    }
    else {
      setNbUserNFTs(0)
    }

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
            Drop18: <span className="italic">Ascension of Toonies</span> by{" "}
            <a
              target="_blank"
              rel="noreferrer"
              className="text-[#9945FF] font-bold"
              href={"https://twitter.com/toonies_art"}
            >
              @toonies_art
            </a>
          </h1>
          <div className="mt-12 w-[70%] mx-auto">
            <h2 className="underline text-2xl font-bold">Description</h2>
            <div>
              Ascension of Toonies is a 3D model from
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/toonies_art"}
              >
                @toonies_art
              </a>
              , a brand by{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/boywithnolegs"}
              >
                @boywithnolegs
              </a>{" "}
              and{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/TimeThiefNFT"}
              >
                @TimeThiefNFT
              </a>
              . It is the biggest 3D art airdrop in NFT history.
              <br />
              You can spin, zoom, and pan this NFT inside of{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/phantom"}
              >
                @Phantom
              </a>{" "}
              on mobile or desktop.
              <br />
              Toonies is a modern take on blind box toys, created by artists {" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/boywithnolegs"}
              >
                @boywithnolegs
              </a>{" "}
              and{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/TimeThiefNFT"}
              >
                @TimeThiefNFT
              </a>
              . There are five Toonies characters covering a range of emotions
              and personalities. These characters start out as NFTs, but can be
              swapped for their matching physical figurines.
              <br />
              In the lead-up to the hotly anticipated collection launch, {" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/toonies_art"}
              >
                @toonies_art
              </a>{" "}
              has collaborated with prominent Solana artists like{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/notjohnlestudio"}
              >
                @notjohnlestudio
              </a>
              ,{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/hyblinxx"}
              >
                @hyblinxx
              </a>
              ,{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/marculinopng"}
              >
                @marculinopng
              </a>
              , and{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/bangeroooNFT"}
              >
                @bangeroooNFT
              </a>
              . You can view their collaborations on{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={
                  "https://formfunction.xyz/@toonies/series/toonies-collabs"
                }
              >
                formfunction
              </a>
              .<br />
              The artists,{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/boywithnolegs"}
              >
                @boywithnolegs
              </a>{" "}
              and{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/TimeThiefNFT"}
              >
                @TimeThiefNFT
              </a>
              , met in college and share a passion for character design and art
              innovation. <br />
              NO LEGS is known for his mixed media art, especially clay and
              illustration. <br />
              Time Thief is a physical, 3D, AR, VR artist and animator.
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
                src="https://shdw-drive.genesysgo.net/52zh6ZjiUQ5UKCwLBwob2k1BC3KF2qhvsE7V4e8g2pmD/Ascension%20of%20Toonies.gif"
              ></img>
              <h1 className="font-bold mt-2">Ascension of Toonies</h1>
              {isFetched && wallet.publicKey && (
                <div className="flex justify-center">
                  {isFetched &&
                  userDripNFT.find(
                    (nft) => nft.name == "Ascension of Toonies"
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
                        "https://magiceden.io/marketplace/F8FdDYD3PWndYoae9TrBcucXDWFwDvm6bZU2LQT1PwyB?search=Ascension%2520of%2520Toonies"
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
