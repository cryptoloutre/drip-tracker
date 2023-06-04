// Next, React
import { FC, useEffect, useState } from "react";
import Link from "next/link";

// Wallet
import { useWallet } from "@solana/wallet-adapter-react";

import { RarityLegend } from "components/RarityLegend";
import { WrapperConnection } from "../../../../ReadApi/WrapperConnection";
import { NFTsinDrop } from "./NFTsinDrop";

export const Drop8S2: FC = ({}) => {
  const wallet = useWallet();
  const connection = new WrapperConnection(
    "https://rpc.helius.xyz/?api-key=e2ff09e4-d800-4b10-bb34-40f6044c1191"
  );
  const [userDripNFT, setUserDripNFT] = useState<any[]>();
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [nbUserNFTs, setNbUserNFTs] = useState<number>();

  const dropNumber = "8";
  const nbTotalNFTsInDrop = 7;
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
            Drop8: <span className="italic">Moral Panic</span> by{" "}
            <a
              target="_blank"
              rel="noreferrer"
              className="text-[#9945FF] font-bold"
              href={"https://twitter.com/HellbendersMC"}
            >
              @HellbendersMC
            </a>
          </h1>
          <div className="mt-12 w-[70%] mx-auto">
            <h2 className="underline text-2xl font-bold">Description</h2>
            <div>
              Enter the dark fantasy world of{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/HellbendersMC"}
              >
                @HellbendersMC
              </a>{" "}
              and their new mobile game &quot;Moral Panic&quot;.
              <br />
              The creator,{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/natjonesart"}
              >
                @natjonesart
              </a>
              , is a legendary dark fantasy and horror artist, best known for
              Frank Frazetta&apos;s Death Dealer, superhero Spawn, and recently,
              video game Baldur&apos;s Gate.
              <br />
              <div className="mt-4 flex text-lg">
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#9945FF] underline font-bold mr-4"
                  href={"https://www.natjones.com/"}
                >
                  Nat&apos;s Art
                </a>
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#9945FF] underline font-bold"
                  href={"https://en.wikipedia.org/wiki/Nat_Jones"}
                >
                  Wikipedia
                </a>
              </div>
              <br />
              This drop features 7 different collectibles:
              <br />• The{" "}
              <span className="text-[#a5a5a5] font-bold">Common</span>{" "}
              <span className="italic">Entering the Clubhouse</span>{" "}
              <span className="text-[#a5a5a5] font-bold">(supply: 80482)</span>
              .
              <br />• The{" "}
              <span className="text-[#a5a5a5] font-bold">Common</span>{" "}
              <span className="italic">Dancing on the Bar</span>{" "}
              <span className="text-[#a5a5a5] font-bold">(supply: 80458)</span>
              .
              <br />• The{" "}
              <span className="text-[#a5a5a5] font-bold">Common</span>{" "}
              <span className="italic">Put a quarter in the juke</span>{" "}
              <span className="text-[#a5a5a5] font-bold">(supply: 80458)</span>
              .
              <br />• The <span className="text-[#E6C15A] font-bold">Rare</span>{" "}
              <span className="italic">The Reaper</span>{" "}
              <span className="text-[#E6C15A] font-bold">(supply: 3334)</span>
              .
              <br />• The <span className="text-[#E6C15A] font-bold">Rare</span>{" "}
              <span className="italic">Get Bent!</span>{" "}
              <span className="text-[#E6C15A] font-bold">(supply: 3333)</span>
              .
              <br />• The <span className="text-[#E6C15A] font-bold">Rare</span>{" "}
              <span className="italic">Devilmander</span>{" "}
              <span className="text-[#E6C15A] font-bold">(supply: 3333)</span>
              .
              <br />• The <span className="text-[#14F195] font-bold">Legendary</span>{" "}
              <span className="italic">Golden Showers</span>{" "}
              <span className="text-[#14F195] font-bold">(supply: 2500)</span>.
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
            <div className="sm:w-[75%] flex items-center grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
              {NFTsInThisDrop.map((currentNft) => (
                <div key={currentNft.name}>
                  {currentNft.rarity == "Common" && (
                    <div className="bg-[#000000] border border-4 border-[#a5a5a5]">
                      <div className="flex justify-center">
                        <img
                          className="h-[200px] lg:h-[250px]"
                          src={currentNft.image}
                        ></img>
                      </div>
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
                              Not owned
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                  {currentNft.rarity == "Legendary" && (
                    <div className="bg-[#000000] border border-4 border-t-[#14F195] border-r-[#14F195] border-b-[#9945FF] border-l-[#9945FF]">
                      <div className="flex justify-center">
                        <img
                          className="h-[200px] lg:h-[250px]"
                          src={currentNft.image}
                        ></img>
                      </div>
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
                              Not owned
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                  {currentNft.rarity == "Rare" && (
                    <div className="bg-[#000000] border border-4 border-[#E6C15A]">
                      <div className="flex justify-center">
                        <img
                          className="h-[200px] lg:h-[250px]"
                          src={currentNft.image}
                        ></img>
                      </div>
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
                              Not owned
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
