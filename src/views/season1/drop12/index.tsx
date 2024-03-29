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

export const Drop12: FC = ({}) => {
  const wallet = useWallet();
  const connection = new Connection(
    "https://try-rpc.mainnet.solana.blockdaemon.tech"
  );
  const metaplex = new Metaplex(connection);
  const nfts = metaplex.nfts();
  const [userDripNFT, setUserDripNFT] = useState<any[]>();
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [nbUserNFTs, setNbUserNFTs] = useState<number>();

  const dropNumber = "12";
  const nbTotalNFTsInDrop = DropInfo.find(
    (drop) => drop.dropNb.toString() == dropNumber
  ).nbNFT;

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
        _dropNFT.push(nft.uri);
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
            Drop12: <span className="italic">Ode to those still here</span> by{" "}
            <a
              target="_blank"
              rel="noreferrer"
              className="text-[#9945FF] font-bold"
              href={"https://twitter.com/Tainaker"}
            >
              @Tainaker
            </a>
            , &quot;The Tenant&quot; series.
          </h1>
          <div className="mt-12 sm:w-[70%] mx-auto">
            <h2 className="underline text-2xl font-bold">Description</h2>
            <div>
              On the inspiration behind Ode,{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/Tainaker"}
              >
                @Tainaker
              </a>{" "}
              says: &quot;Time goes by really fast. 1 year just passed, some
              people left, some people stayed. The ones coding, building
              community, and still here made a big sacrifice. Thanks for
              creating a better future for everyone.&quot;
              <br />
              Tainaker aims to create works that speak loudly about the emotion
              and action of empathy, to help people connect and deal with
              complex emotions through his art.
              <br />
              He has put his Art Masters to great use, having worked with
              Samsung, United Nations, Red Cross, and more.
              <br />
              He is perhaps best known for being the creator of &quot;the Pond
              of Dreams&quot;, &quot;The Dreamers&quot;, and &quot;The
              Tenants&quot;, three unique 1/1 series that emphasize being in
              touch with your inner being and achieving your youthful dreams.
              <br />
              <br />
              <span className="font-bold underline">Note:</span> A misprint was
              sent by mistake. It is not part of the collection.
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
          <div className="md:hero-content flex justify-center mt-4">
            <div className="bg-[#000000] w-[150px] sm:w-[300px] border border-4 border-[#a5a5a5]">
              <img
                className="h-[150px] w-[150px] sm:h-[300px] sm:w-[300px]"
                src="https://shdw-drive.genesysgo.net/52zh6ZjiUQ5UKCwLBwob2k1BC3KF2qhvsE7V4e8g2pmD/Ode%20to%20those%20still%20here.jpg"
              ></img>
              <h1 className="font-bold mt-2">Ode to those still here</h1>
              {isFetched && (wallet.publicKey || isXNFT) && (
                <div className="flex justify-center">
                  {isFetched &&
                  userDripNFT.find(
                    (nft) =>
                      nft ==
                      "https://nftstorage.link/ipfs/bafkreici36utvlcdollileegzfecz42wmv4fyuqthzusxmctwplxghr7vq"
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
                        "https://magiceden.io/marketplace/F8FdDYD3PWndYoae9TrBcucXDWFwDvm6bZU2LQT1PwyB?search=Ode%2520to%2520those%2520still%2520here"
                      }
                    >
                      Buy on Magic Eden
                    </a>
                  )}
                </div>
              )}
            </div>
            <div className="bg-[#000000] w-[150px] sm:w-[300px]">
              <img
                className="h-[150px] w-[150px] sm:h-[300px] sm:w-[300px]"
                src="https://shdw-drive.genesysgo.net/52zh6ZjiUQ5UKCwLBwob2k1BC3KF2qhvsE7V4e8g2pmD/Ode%20to%20those%20still%20here%20Making%20Of_1.jpg"
              ></img>
              <h1 className="font-bold mt-2">
                Ode to those still here{" "}
                <span className="text-sm">(misprint)</span>
              </h1>
              {isFetched && (wallet.publicKey || isXNFT) && (
                <div className="flex justify-center">
                  {isFetched &&
                  userDripNFT.find(
                    (nft) =>
                      nft ==
                      "https://nftstorage.link/ipfs/bafkreibxuxr4njvum4hnpvmnrwysvpwuxwgaekny3mssbuqzcfntfl3zsq"
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
                        "https://magiceden.io/marketplace/F8FdDYD3PWndYoae9TrBcucXDWFwDvm6bZU2LQT1PwyB?search=Ode%2520to%2520those%2520still%2520here"
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
