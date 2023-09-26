// Next, React
import { FC, useEffect, useState } from "react";
import Link from "next/link";

// Wallet
import { useWallet } from "@solana/wallet-adapter-react";

import { RarityLegend } from "components/RarityLegend";
import { WrapperConnection } from "../../../../ReadApi/WrapperConnection";
import { NFTsinDrop } from "./NFTsinDrop";
import { getUserNFTs } from "utils/getUserNFTs";

export const Drop2S2: FC = ({}) => {
  const wallet = useWallet();
  const connection = new WrapperConnection(
    "https://mainnet.helius-rpc.com/?api-key=1d8740dc-e5f4-421c-b823-e1bad1889eff"
  );
  const [userDripNFT, setUserDripNFT] = useState<any[]>();
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [nbUserNFTs, setNbUserNFTs] = useState<number>();

  const dropNumber = "2";
  const nbTotalNFTsInDrop = NFTsinDrop.length;
  const NFTsInThisDrop = NFTsinDrop;

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

    const userNFTs = await getUserNFTs(publickey.toBase58())

    const season2NFT = userNFTs.filter(
      (asset) =>
        asset.compression.compressed &&
        asset.grouping[0] != undefined &&
        asset.grouping[0].group_value ==
          "DRiP2Pn2K6fuMLKQmt5rZWyHiUZ6WK3GChEySUpHSS4x"
    );

    console.log(season2NFT);

    await Promise.all(
      season2NFT.map(async (asset) => {
        let attributes: any;
        if (asset.content.metadata.attributes) {
          attributes = asset.content.metadata.attributes;
        } else {
          const uri = asset.content.json_uri;
          const response = await fetch(uri);
          const responseData = await response.json();
          attributes = responseData.attributes;
        }
        const drop = attributes.find((nft) => nft.trait_type == "Drop").value;
        if (drop == dropNumber) {
          _dropNFT.push(asset.content.metadata.name);
        }
      })
    );

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
            Drop2: <span className="italic">Deconstructed Rejects</span> by{" "}
            <a
              target="_blank"
              rel="noreferrer"
              className="text-[#9945FF] font-bold"
              href={"https://twitter.com/LemonScented_"}
            >
              @LemonScented_
            </a>
          </h1>
          <div className="mt-12 sm:w-[70%] mx-auto">
            <h2 className="underline text-2xl font-bold">Description</h2>
            <div>
              &quot;Deconstructed Rejects&quot; exposes the intricate geometry
              behind{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/MonkeRejects"}
              >
                @MonkeRejects
              </a>
              . The{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/MonkeRejects"}
              >
                @MonkeRejects
              </a>{" "}
              are a 6000-piece PFP collection on{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/solana"}
              >
                @Solana
              </a>
              .<br />
              The artist,{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/LemonScented"}
              >
                @LemonScented
              </a>
              , created Rejects after experiencing rejection himself as an
              artist. Rejects are not just a collection of art, but a source of
              inspiration for others to keep pursuing their dreams. <br />
              LemonScented has a keen eye for detail and a passion for creating
              visually striking pieces that push the boundaries of what&apos;s
              possible in 3D design.{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/MonkeRejects"}
              >
                @MonkeRejects
              </a>{" "}
              holders, he says, consider each other family. <br />
              This drop is fully 3D, you can zoom, pan, and spin Rejected Monke
              in{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/Phantom"}
              >
                @Phantom
              </a>
              .
              <br />
              <br />
              This drop features 8 different collectibles, accompanied by their
              respective PFPs.
              <br />• The{" "}
              <span className="text-[#a5a5a5] font-bold">Common</span> drops are
              composed of <span className="font-bold">5</span> Rejected Monke.
              Each one represents{" "}
              <span className="text-[#a5a5a5] font-bold">18%</span>.
              <br />• The <span className="text-[#E6C15A] font-bold">
                Rare
              </span>{" "}
              drops are composed of <span className="font-bold">2</span>{" "}
              Rejected Monke. Each one represents{" "}
              <span className="text-[#E6C15A] font-bold">8.3%</span>.
              <br />• The{" "}
              <span className="text-[#14F195] font-bold">Legendary</span> drops
              are composed of <span className="font-bold">1</span> Rejected
              Monke. There are{" "}
              <span className="text-[#14F195] font-bold">2000 copies</span>.
              <br />
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
            <div className="grid sm:w-[70%] grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
              {NFTsInThisDrop.map((currentNft) => (
                <div key={currentNft.name}>
                  <div
                    className={`bg-[#000000] border border-4 ${
                      currentNft.rarity == "Common" && "border-[#a5a5a5]"
                    } ${currentNft.rarity == "Rare" && "border-[#E6C15A]"} ${
                      currentNft.rarity == "Legendary" &&
                      "border-t-[#14F195] border-r-[#14F195] border-b-[#9945FF] border-l-[#9945FF]"
                    }`}
                  >
                    <img className="" src={currentNft.image}></img>
                    <h1 className="font-bold mt-2">{currentNft.name}</h1>
                    {isFetched && (wallet.publicKey || isXNFT) && (
                      <div className="flex justify-center">
                        {isFetched &&
                        userDripNFT.find((nft) => nft == currentNft.name) !=
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
                            href={currentNft.magicEdenLink}
                          >
                            Buy on Tensor
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
