// Next, React
import { FC, useEffect, useState } from "react";
import Link from "next/link";

// Wallet
import { useWallet } from "@solana/wallet-adapter-react";

import { RarityLegend } from "components/RarityLegend";
import { WrapperConnection } from "../../../../ReadApi/WrapperConnection";
import { NFTsinDrop } from "./NFTsinDrop";

export const Drop4S2: FC = ({}) => {
  const wallet = useWallet();
  const connection = new WrapperConnection(
    "https://rpc.helius.xyz/?api-key=e2ff09e4-d800-4b10-bb34-40f6044c1191"
  );
  const [userDripNFT, setUserDripNFT] = useState<any[]>();
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [nbUserNFTs, setNbUserNFTs] = useState<number>();

  const dropNumber = "4";
  const nbTotalNFTsInDrop = 4;
  const NFTsInThisDrop = NFTsinDrop;

  async function getUserNFT() {
    if (!wallet.publicKey) {
      setUserDripNFT([]);
      return;
    }
    const publickey = wallet.publicKey;
    const _dropNFT = [];
    setIsFetched(false);

    const userNFTs = await connection.getAssetsByOwner({
      ownerAddress: publickey.toBase58(),
    });

    const season2NFT = userNFTs.items.filter(
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
        const drop = attributes.find(
          (nft) => nft.trait_type == "Drop"
        ).value;
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
            Drop4: <span className="italic">Project Bio Merge</span> by{" "}
            <a
              target="_blank"
              rel="noreferrer"
              className="text-[#9945FF] font-bold"
              href={"https://twitter.com/@pop_headz"}
            >
              @pop_headz
            </a>
          </h1>
          <div className="mt-12 w-[70%] mx-auto">
            <h2 className="underline text-2xl font-bold">Description</h2>
            <div>
              The artist behind Popheadz,{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/danieldraws98"}
              >
                @danieldraws98
              </a>
              , is an accomplished 24 year-old Korean-American artist. He&apos;s
              worked with Netflix and other entertainment brands for
              illustration and concept design.
              <br />
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/pop_headz"}
              >
                @pop_headz
              </a>{" "}
              is a rebellious PFP project with unique and iconic art loved by
              many.
              <br />
              <br />
              The Bio Merge is part of the Popheadz Universe of digital
              collectibles. The origin story begins with an unnamed kid from
              Neo-Tokyo who was miraculously Bio-Merged with his Android, while
              facing devastation by alien invaders...
              <br />
              <br />
              The Popheadz founding team is stacked: artist{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/joiceloo_art"}
              >
                @joiceloo_art
              </a>
              , animator{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/toneyholes"}
              >
                @toneyholes
              </a>
              , and CTO{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/JachengM"}
              >
                @JachengM
              </a>{" "}
              join front-man Daniel. Through fantasy story-telling, the Popheadz
              team provides children and adults with stories and images that
              inspire their imaginations and give them hope.
              <br />
              <br />
              This drop features 4 different collectibles. Each name has a
              meaningful translation in Japanese that imbues the art with love,
              memory, unity, and hope. The creators wish to invite people to
              learn about Japanese and Asian culture, and appreciate the beauty
              of the language.
              <br />
              This drop features:
              <br />• The{" "}
              <span className="text-[#a5a5a5] font-bold">Common</span> drop is{" "}
              <span className="italic">Kokoro 心</span>{" "}
              <span className="text-[#a5a5a5] font-bold">
                (85% of the supply)
              </span>
              .
              <br />• The <span className="text-[#E6C15A] font-bold">
                Rare
              </span>{" "}
              drop is <span className="italic">Kioku 記憶 + Kizuna 絆</span>{" "}
              <span className="text-[#E6C15A] font-bold">
                (supply of 20,000 and 5,000 respectively)
              </span>
              .
              <br />• The{" "}
              <span className="text-[#14F195] font-bold">Legendary</span> drop
              is <span className="italic">Yume 夢</span>{" "}
              <span className="text-[#14F195] font-bold">
                (0.5% of the supply)
              </span>
              .
            </div>
          </div>
          {wallet.publicKey && isFetched && (
            <div className="mt-4 w-[70%] mx-auto">
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
          {!wallet.publicKey && (
            <div className="text-center font-bold text-xl mt-6">
              Please, connect your wallet to see your progression!
            </div>
          )}
          <RarityLegend />
          <div className="flex justify-center">
            <div className="w-[70%] flex items-center grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
              {NFTsInThisDrop.map((currentNft) => (
                <div key={currentNft.name}>
                  {currentNft.rarity == "Common" && (
                    <div className="bg-[#000000] border border-4 border-[#a5a5a5]">
                      <img className="" src={currentNft.image}></img>
                      <h1 className="font-bold mt-2">{currentNft.name}</h1>
                      {isFetched && wallet.publicKey && (
                        <div className="flex justify-center">
                          {isFetched &&
                          userDripNFT.find(
                            (nft) => nft== currentNft.name
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
                              href={currentNft.magicEdenLink}
                            >
                              Buy on Tensor
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                  {currentNft.rarity == "Legendary" && (
                    <div className="bg-[#000000] border border-4 border-t-[#14F195] border-r-[#14F195] border-b-[#9945FF] border-l-[#9945FF]">
                      <img className="" src={currentNft.image}></img>
                      <h1 className="font-bold mt-2">{currentNft.name}</h1>
                      {isFetched && wallet.publicKey && (
                        <div className="flex justify-center">
                          {isFetched &&
                          userDripNFT.find(
                            (nft) => nft== currentNft.name
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
                              href={currentNft.magicEdenLink}
                            >
                              Buy on Tensor
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                  {currentNft.rarity == "Rare" && (
                    <div className="bg-[#000000] border border-4 border-[#E6C15A]">
                      <img className="" src={currentNft.image}></img>
                      <h1 className="font-bold mt-2">{currentNft.name}</h1>
                      {isFetched && wallet.publicKey && (
                        <div className="flex justify-center">
                          {isFetched &&
                          userDripNFT.find(
                            (nft) => nft== currentNft.name
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
                              href={currentNft.magicEdenLink}
                            >
                              Buy on Tensor
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
