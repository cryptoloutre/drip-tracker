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

export const Drop19: FC = ({}) => {
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
        _dropNFT.push(nft.name);
      }
    });

    const dropNFTs = _dropNFT.filter((x, i) => _dropNFT.indexOf(x) === i);
    if (dropNFTs.find((nft) => nft == "iSolmetric") != undefined) {
      setNbUserNFTs(1);
    } else {
      setNbUserNFTs(0);
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
            Drop19: <span className="italic">iSolmetric</span> by{" "}
            <a
              target="_blank"
              rel="noreferrer"
              className="text-[#9945FF] font-bold"
              href={"https://twitter.com/Fevra_"}
            >
              @Fevra_
            </a>
          </h1>
          <div className="mt-12 w-[70%] mx-auto">
            <h2 className="underline text-2xl font-bold">Description</h2>
            <div>
              Music produced, mixed, and mastered by{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/Fevra_"}
              >
                @Fevra_
              </a>{" "}
              , with an accompanying store miniature commemorating{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/solanaspaces"}
              >
                @solanaspaces
              </a>
              .<br />
              The piece pays homage to the closure of Solana Spaces, and
              captures its essence in aesthetic and vibe. It also looks forward
              to what&apos;s next.
              <br />
              Fevra produced the song in Ableton Live 11, and created the
              visuals with AI and Photoshop. The bass was recorded live and
              performed by{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/StaceyPlaysBass"}
              >
                @StaceyPlaysBass
              </a>
              .<br />
              On the music, Fevra_ shared: &quot;I wanted the song and art to
              emit an elegant futuristic feel. I designed synth sounds which
              were inspired by blockchain technology, and then layered in my
              favorite electric piano which helps the music encompass the soul
              of the people of Solana.&quot;
              <br />
              Fevra is a music producer, sound designer, audio engineer, and
              visual artist from Toronto, Canada. He&apos;s the founder{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/KarmaticDAO"}
              >
                @KarmaticDAO
              </a>{" "}
               and Head of Audio at{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/EsthersEscape"}
              >
                @EsthersEscape
              </a>
              . You can find some of his tracks on{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={
                  "https://open.spotify.com/artist/1LdZhLhyFc2TAHt3WUWaw0?si=HfvzNpYaTHS1wi78ZIn_Aw&nd=1"
                }
              >
                Spotify
              </a>
              .
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
                src="https://shdw-drive.genesysgo.net/52zh6ZjiUQ5UKCwLBwob2k1BC3KF2qhvsE7V4e8g2pmD/Fevra---Isolmetric.png"
              ></img>
              <h1 className="font-bold mt-2">iSolmetric</h1>
              {isFetched && wallet.publicKey && (
                <div className="flex justify-center">
                  {isFetched &&
                  userDripNFT.find((nft) => nft == "iSolmetric") !=
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
                        "https://magiceden.io/marketplace/F8FdDYD3PWndYoae9TrBcucXDWFwDvm6bZU2LQT1PwyB?search=iSolmetric"
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
