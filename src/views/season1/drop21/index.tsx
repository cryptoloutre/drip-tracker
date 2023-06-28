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

export const Drop21: FC = ({}) => {
  const wallet = useWallet();
  const connection = new Connection(
    "https://try-rpc.mainnet.solana.blockdaemon.tech"
  );
  const metaplex = new Metaplex(connection);
  const nfts = metaplex.nfts();
  const [userDripNFT, setUserDripNFT] = useState<any[]>();
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [nbUserNFTs, setNbUserNFTs] = useState<number>();

  const dropNumber = "21";
  const nbTotalNFTsInDrop = DropInfo.find(
    (drop) => drop.dropNb.toString() == dropNumber
  ).nbNFT;

  const [isXNFT, setIsXNFT] = useState(false);

  useEffect(() => {
    // @ts-ignore
    if (window.xnft.solana.isXnft) {
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
            Drop21:{" "}
            <span className="italic">The Laurence Antony Anthology</span> by{" "}
            <a
              target="_blank"
              rel="noreferrer"
              className="text-[#9945FF] font-bold"
              href={"https://twitter.com/laurence_antony"}
            >
              @laurence_antony
            </a>
          </h1>
          <div className="mt-12 sm:w-[70%] mx-auto">
            <h2 className="underline text-2xl font-bold">Description</h2>
            <div>
              &quot;The Laurence Antony Anthology&quot; is composed of two art
              pieces and a PFP.
              <br />
              • &quot;Chimera&quot;: Chimeras of mythology were creatures made
              of a lion&apos;s head, a serpent&apos;s tail, and an eagle&apos;s
              wings. This Chimera is a visual collage of styles, highlighting
              Antony&apos;s cross-medium, cross-style, cross-everything art.
              <br />
              • &quot;Non-Fungible Portrait&quot;: Showcasing his signature oil
              painting texture, the words &quot;Non-fungible&quot; disrupts our
              sense of comfort with the medium. Antony comments that the piece
              represents &quot;the contemporary art world&apos;s discontent with
              NFTs.&quot; <br />
              • &quot;Corrupted Mask&quot;: Collage of 31 rejected mask
              concepts. The outline of a mask can be seen hidden in an abstract
              geometric composition. This acclaimed collection of PFPs features
              some of the most prominent artists in the Solana community as
              holders.
              <br />
              Laurence Antony is a multi-disciplinary artist from Montreal,
              Canada. His work taps into common human experiences to build
              surreal narrative scenes as digital or physical paintings. Prior
              to his dive into NFTs, he&apos;s exhibited his work in London,
              Brussels and across Canada. A trained artist who paints with oil
              on canvas, stylized oil textures on digital canvas, or pixels,
              Antony&apos;s work is incredibly diverse.
              <br />
              His{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://exchange.art/laurence-antony/series"}
              >
                Digital art
              </a>{" "}
              <br />
              His{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://www.maskedwarriors.xyz/"}
              >
                Masked Warriors
              </a>{" "}
              <br />
              His{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://laurenceantony.com"}
              >
                Gallery
              </a>
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
            <div className="sm:w-[70%] grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
              <div className="bg-[#000000] border border-4 border-[#a5a5a5]">
                <img
                  className=""
                  src="https://shdw-drive.genesysgo.net/52zh6ZjiUQ5UKCwLBwob2k1BC3KF2qhvsE7V4e8g2pmD/Chimera.jpg"
                ></img>
                <h1 className="font-bold mt-2">Chimera</h1>
                {isFetched && (wallet.publicKey || isXNFT) && (
                  <div className="flex justify-center">
                    {isFetched &&
                    userDripNFT.find((nft) => nft == "Chimera") != undefined ? (
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
                          "https://magiceden.io/marketplace/F8FdDYD3PWndYoae9TrBcucXDWFwDvm6bZU2LQT1PwyB?search=Chimera"
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
                  src="https://shdw-drive.genesysgo.net/52zh6ZjiUQ5UKCwLBwob2k1BC3KF2qhvsE7V4e8g2pmD/Non%20fungible%20Portrait.jpg"
                ></img>
                <h1 className="font-bold mt-2">Non-fungible Portrait</h1>
                {isFetched && (wallet.publicKey || isXNFT) && (
                  <div className="flex justify-center">
                    {isFetched &&
                    userDripNFT.find((nft) => nft == "Non-fungible Portrait") !=
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
                          "https://magiceden.io/marketplace/F8FdDYD3PWndYoae9TrBcucXDWFwDvm6bZU2LQT1PwyB?search=Non-fungible%2520Portrait"
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
                  src="https://shdw-drive.genesysgo.net/52zh6ZjiUQ5UKCwLBwob2k1BC3KF2qhvsE7V4e8g2pmD/Corrupted%20Mask.png"
                ></img>
                <h1 className="font-bold mt-2">Corrupted Mask</h1>
                {isFetched && (wallet.publicKey || isXNFT) && (
                  <div className="flex justify-center">
                    {isFetched &&
                    userDripNFT.find((nft) => nft == "Corrupted Mask") !=
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
                          "https://magiceden.io/marketplace/F8FdDYD3PWndYoae9TrBcucXDWFwDvm6bZU2LQT1PwyB?search=Corrupted%2520Mask"
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
