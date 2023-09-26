// Next, React
import { FC, useEffect, useState } from "react";
import Link from "next/link";

// Wallet
import { useWallet } from "@solana/wallet-adapter-react";

import { RarityLegend } from "components/RarityLegend";
import { WrapperConnection } from "../../../../ReadApi/WrapperConnection";
import { NFTsinDrop } from "./NFTsinDrop";
import { getUserNFTs } from "utils/getUserNFTs";

export const Drop7S2: FC = ({}) => {
  const wallet = useWallet();
  const connection = new WrapperConnection(
    "https://mainnet.helius-rpc.com/?api-key=1d8740dc-e5f4-421c-b823-e1bad1889eff"
  );
  const [userDripNFT, setUserDripNFT] = useState<any[]>();
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [nbUserNFTs, setNbUserNFTs] = useState<number>();

  const dropNumber = "7";
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
            Drop7: <span className="italic">A study on 🌊 WATER</span> curated
            by{" "}
            <a
              target="_blank"
              rel="noreferrer"
              className="text-[#9945FF] font-bold"
              href={"https://twitter.com/BlockFramez"}
            >
              @BlockFramez
            </a>
          </h1>
          <div className="mt-12 sm:w-[70%] mx-auto">
            <h2 className="underline text-2xl font-bold">Description</h2>
            <div>
              In this drop, 9 different photographers share a study on WATER:
              <br />• Blockframez (
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/Blockframez"}
              >
                @blockframez
              </a>
              ) is a photographer, videographer and professional composer for
              tv, film, and games based out of San Diego, California. The duo
              team behind the brand also dabbles in experimental art and new
              mediums.
              <br />• Wilsen Way (
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/wilsenway"}
              >
                @wilsenway
              </a>
              ) is a street-photographer and abstract painter from Indonesia. A
              cook during the day, Wilsen found a global community through
              Solana NFTs.
              <br />• Ariel Gricio (
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/Ariel_is_back"}
              >
                @Ariel_is_back
              </a>
              ) is a photographer, DJ, videographer, and poet from Brazil.
              They&apos;re also an advocate for growing crypto in Brazil, as the
              founder of{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/BrashillNFT"}
              >
                @BrashillNFT
              </a>
              .
              <br />• Ebro (
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/ebrosmash"}
              >
                @ebrosmash
              </a>
              ) is documentary & conceptual photographer from New Orleans,
              Louisiana. His first series captured lonely storefronts. His new
              work is centered around ambiguity.
              <br />• LIGHTS (
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/LIGHTS_nft"}
              >
                @LIGHTS_nft
              </a>
              ) is a photographer and filmmaker based out of Solana Beach,
              California. His signature style features a &quot;big bang&quot;
              effect as photography jumps from the screen to your eyes.
              <br />• Huxsterized (
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/huxsterized"}
              >
                @huxsterized
              </a>
              ) is a photographer from Selangor, Malaysia. Their work features
              walls, buildings, and façades with striking geometries.
              <br />• Kennyatta Collins (
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/ItsKennyatta"}
              >
                @ItsKennyatta
              </a>
              ) is a Brooklyn-born photographer and brand strategist. He&apos;s
              shot for fashion models, magazines, and major brands, and recently
              debuted his first on-chain art.
              <br />• Arthur Pardini (
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/artpardini"}
              >
                @artpardini
              </a>
              ) is a graphic designer and photographer from São Paulo, Brazil.
              His style features high contrasts and saturated colors, with a
              variety of techniques employed to bring magic to everyday scenes.
              <br />• Magellan (
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/CryptoMagellan"}
              >
                @CryptoMagellan
              </a>
              ) is a curator and burgeoning photographer based in Salt Lake
              City, Utah. A PhD in Cognitive Psychology, Magellan combines
              disciplines to share a deeper understanding of art and its modern
              context.
              <br />
              <br />
              This drop features:
              <br />• <span className="italic">From Within</span> by{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/Blockframez"}
              >
                @blockframez
              </a>{" "}
              <span className="text-[#a5a5a5] font-bold">(supply: 51838)</span>
              .
              <br />• <span className="italic">
                Before you&apos;re gone
              </span> by{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/wilsenway"}
              >
                @wilsenway
              </a>{" "}
              <span className="text-[#a5a5a5] font-bold">(supply: 51838)</span>
              .
              <br />• <span className="italic">Medianera</span> by{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/Ariel_is_back"}
              >
                @Ariel_is_back
              </a>{" "}
              <span className="text-[#a5a5a5] font-bold">(supply: 51838)</span>
              .
              <br />• <span className="italic">Louisiana</span> by{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/ebrosmash"}
              >
                @ebrosmash
              </a>{" "}
              <span className="text-[#a5a5a5] font-bold">(supply: 51838)</span>
              .
              <br />•{" "}
              <span className="italic">
                Where the Sun Meets the Sea
              </span> by{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/LIGHTS_nft"}
              >
                @LIGHTS_nft
              </a>{" "}
              <span className="text-[#E6C15A] font-bold">(supply: 5001)</span>
              .
              <br />• <span className="italic">Delicate</span> by{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/huxsterized"}
              >
                @huxsterized
              </a>{" "}
              <span className="text-[#E6C15A] font-bold">(supply: 5000)</span>
              .
              <br />• <span className="italic">Early Morning</span> by{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/ItsKennyatta"}
              >
                @ItsKennyatta
              </a>{" "}
              <span className="text-[#E6C15A] font-bold">(supply: 5000)</span>
              .
              <br />• <span className="italic">Concrete Mirror</span>by{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/artpardini"}
              >
                @artpardini
              </a>{" "}
              <span className="text-[#14F195] font-bold">(supply: 2000)</span>.
              <br />• <span className="italic">Ice Drips</span>by{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/CryptoMagellan"}
              >
                @CryptoMagellan
              </a>{" "}
              <span className="text-[#14F195] font-bold">(supply: 2001)</span>.
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
            <div className="sm:w-[75%] flex items-center grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
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
                    <div className="flex justify-center">
                      <img
                        className="h-[200px] lg:h-[250px]"
                        src={currentNft.image}
                      ></img>
                    </div>
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
