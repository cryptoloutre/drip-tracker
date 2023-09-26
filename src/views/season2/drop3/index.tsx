// Next, React
import { FC, useEffect, useState } from "react";
import Link from "next/link";

// Wallet
import { useWallet } from "@solana/wallet-adapter-react";

import { RarityLegend } from "components/RarityLegend";
import { WrapperConnection } from "../../../../ReadApi/WrapperConnection";
import { NFTsinDrop } from "./NFTsinDrop";
import { getUserNFTs } from "utils/getUserNFTs";

export const Drop3S2: FC = ({}) => {
  const wallet = useWallet();
  const connection = new WrapperConnection(
    "https://mainnet.helius-rpc.com/?api-key=1d8740dc-e5f4-421c-b823-e1bad1889eff"
  );
  const [userDripNFT, setUserDripNFT] = useState<any[]>();
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [nbUserNFTs, setNbUserNFTs] = useState<number>();

  const dropNumber = "3";
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
            Drop3: <span className="italic">Luna Grins DRiP</span> by{" "}
            <a
              target="_blank"
              rel="noreferrer"
              className="text-[#9945FF] font-bold"
              href={"https://twitter.com/mapez_nft"}
            >
              @mapez_nft
            </a>
          </h1>
          <div className="mt-12 sm:w-[70%] mx-auto">
            <h2 className="underline text-2xl font-bold">Description</h2>
            <div>
              Mapez is a digital artist based in Berlin. He merges art toys and
              gaming culture, bringing characters to life with vibrant colors,
              textures, and digital painting.
              <br />
              The Lunagrins Collection is a set of 3D models and PFPs that are
              metaverse-ready inside{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/_portals_"}
              >
                @_portals_
              </a>
              . Keep your eyes on Mapez: there&apos;s more to come for Luna
              Grins owners.
              <br />
              You can learn more about the art of{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/mapez_nft"}
              >
                @mapez_nft
              </a>{" "}
              just right{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://mapez.art/"}
              >
                here
              </a>
              .
              <br />
              This drop is fully 3D, you can pan and spin your Luna Grins right
              inside your DRiP Vault, accessible at{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"http://drip.haus"}
              >
                drip.haus
              </a>
              .
              <br />
              <br />
              This drop features 3 different collectibles, accompanied by their
              respective PFPs.
              <br />• The{" "}
              <span className="text-[#a5a5a5] font-bold">Common</span> drop is{" "}
              <span className="italic">Luna Grins DRiP Purple</span>{" "}
              <span className="text-[#a5a5a5] font-bold">
                (75% of the supply)
              </span>
              .
              <br />• The <span className="text-[#E6C15A] font-bold">
                Rare
              </span>{" "}
              drop is <span className="italic">Luna Grins DRiP Red</span>{" "}
              <span className="text-[#E6C15A] font-bold">
                (20% of the supply)
              </span>
              .
              <br />• The{" "}
              <span className="text-[#14F195] font-bold">Legendary</span> drop
              is <span className="italic">Luna Grins DRiP Gold</span>{" "}
              <span className="text-[#14F195] font-bold">
                (5% of the supply)
              </span>
              .
              <br />
              <br />
              Each model is accompanied by a PFP and a .GLB file.
              <br />•{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://skfb.ly/oFXOn"}
              >
                Purple 3D Model
              </a>
              <br />•{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://skfb.ly/oFXQJ"}
              >
                Red 3D Model
              </a>
              <br />•{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://skfb.ly/oFXQN"}
              >
                Gold 3D Model
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
            <div className="sm:w-[70%] flex items-center grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
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
