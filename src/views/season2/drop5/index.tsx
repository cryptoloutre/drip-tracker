// Next, React
import { FC, useEffect, useState } from "react";
import Link from "next/link";

// Wallet
import { useWallet } from "@solana/wallet-adapter-react";

import { RarityLegend } from "components/RarityLegend";
import { WrapperConnection } from "../../../../ReadApi/WrapperConnection";
import { NFTsinDrop } from "./NFTsinDrop";

export const Drop5S2: FC = ({}) => {
  const wallet = useWallet();
  const connection = new WrapperConnection(
    "https://mainnet.helius-rpc.com/?api-key=1d8740dc-e5f4-421c-b823-e1bad1889eff"
  );
  const [userDripNFT, setUserDripNFT] = useState<any[]>();
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [nbUserNFTs, setNbUserNFTs] = useState<number>();

  const dropNumber = "5";
  const nbTotalNFTsInDrop = NFTsinDrop.length;
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
            Drop5: <span className="italic">Special Earth Day Edition</span>{" "}
            curated by{" "}
            <a
              target="_blank"
              rel="noreferrer"
              className="text-[#9945FF] font-bold"
              href={"https://twitter.com/@sunrisestake"}
            >
              @sunrisestake
            </a>
          </h1>
          <div className="mt-12 w-[70%] mx-auto">
            <h2 className="underline text-2xl font-bold">Description</h2>
            <div>
              Thanks to a sustainability commitment from the{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/SolanaFndn"}
              >
                @SolanaFndn
              </a>
              , Solana is a carbon-neutral blockchain.
              <br />
              Sunrise Stake is a regenerative finance app, founded by{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/danbkelleher"}
              >
                @danbkelleher
              </a>{" "}
              and{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/regencoffeegirl"}
              >
                @regencoffeegirl
              </a>
              , that uses Solana&apos;s native staking rewards to offset carbon
              emissions. They&apos;ve created a special{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://app.sunrisestake.com/earthday"}
              >
                site
              </a>{" "}
              for this drop, where you can tip their artists.
              <br />
              <br />
              The Earth Day collection includes 8 artists from art houses{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/COLDSCOLLECTIVE"}
              >
                @COLDSCOLLECTIVE
              </a>
              , based in Nigeria, and{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/NFTClubBerlin"}
              >
                @NFTClubBerlin
              </a>
              , based in Berlin. This is the first ever multi-artist,
              multi-format drop on DRiP, with each piece going to 1/8th of the
              total drop supply.
              <br />
              <br />
              This drop features:
              <br />• <span className="italic">
                Lost in the Woods | Orisha Aja
              </span> by{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/Adeche_Atelier"}
              >
                @Adeche_Atelier
              </a>{" "}
              (Manchester, United Kingdom): The Orisha of forests and herbs and
              master of potions, Aja is known as the soul of the forest and the
              animals within it. Explore the full 3D model{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={
                  "https://sketchfab.com/3d-models/aja-nft-9b6d074fbbb04c29897fe990958e4e07"
                }
              >
                here
              </a>
              .
              <br />• <span className="italic">Mirrored Paradise</span> by{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/BoxPalette"}
              >
                @BoxPalette
              </a>{" "}
              (Bucharest, Romania): Vast fields stretch out as far as the eye
              can see, with soft green grass swaying in the gentle breeze. In
              the front, a serene lake mirrors the surrounding trees and sky.
              <br />• <span className="italic">Blossoming Decay</span> by{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/Dr_Revel_NFT"}
              >
                @Dr_Revel_NFT
              </a>{" "}
              (Berlin, Germany): This artwork represents the fragility and
              impermanence of life on Earth, and the potential for growth and
              renewal that arises from the ashes of destruction.
              <br />•{" "}
              <span className="italic">
                Earth&apos;s Guardian Angel
              </span> by{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/bxbbysrevenge"}
              >
                @bxbbysrevenge
              </a>{" "}
              (Abuja, Nigeria): Her determined look and the swirling clouds
              suggest a commitment to invest in the planet&apos;s future.
              It&apos;s a reminder of our responsibility to protect the
              environment.
              <br />• <span className="italic">MOMENT</span> by{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/justprostokir"}
              >
                @justprostokir
              </a>{" "}
              (Berlin, Germany): A mixture of abstraction, graffiti and a pinch
              of chaos, this work shows the moment of eternal rebirth, the end
              of one life cycle, and the beginning of a new one.
              <br />• <span className="italic">The Organ Pipe</span> by{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/CurrentScape"}
              >
                @CurrentScape
              </a>{" "}
              (Berlin, Germany): An everlasting sonic answer to the feelings of
              being alone in the twilight zone.
              <br />• <span className="italic">Changes</span> by{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/UremmaI"}
              >
                @UremmaI
              </a>{" "}
              (Girne, Cyprus): Little things we do can heal the earth, like
              recycling and investing in green energy. We can combat
              deforestation by planting more trees, and using recycled products.
              <br />• <span className="italic">Nurture</span> by{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/Taesirat_"}
              >
                @Taesirat_
              </a>{" "}
              (Lagos, Nigeria): In this work, I explore the concept of giving back to the Earth and protecting our ecosystem.
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
                      <div className="flex justify-center">
                      <img className="h-[150px] md:h-[190px] lg:h-[250px]" src={currentNft.image}></img>
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
