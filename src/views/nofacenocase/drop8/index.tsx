// Next, React
import { FC, useEffect, useState } from "react";
import Link from "next/link";

// Wallet
import { useWallet } from "@solana/wallet-adapter-react";

import { RarityLegend } from "components/RarityLegend";
import { WrapperConnection } from "../../../../ReadApi/WrapperConnection";
import { NFTsinDrop } from "./NFTsinDrop";
import { getUserNFTs } from "utils/getUserNFTs";

export const Drop8NFNC: FC = ({}) => {
  const wallet = useWallet();
  const connection = new WrapperConnection(
    "https://mainnet.helius-rpc.com/?api-key=1d8740dc-e5f4-421c-b823-e1bad1889eff"
  );
  const [userDripNFT, setUserDripNFT] = useState<any[]>();
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [nbUserNFTs, setNbUserNFTs] = useState<number>();

  const dropNumber = "8";
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

    const BorkNFT = userNFTs.filter(
      (asset) =>
        asset.compression.compressed &&
        asset.grouping[0] != undefined &&
        asset.grouping[0].group_value ==
          "NfNcsoekvshD5eXiyqgs5rC9Ak7zAfb6ngiJrDXCFea"
    );

    console.log(BorkNFT);

    await Promise.all(
      BorkNFT.map(async (asset) => {
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
          _dropNFT.push(asset.content.json_uri);
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
            Drop8:{" "}
            <span className="italic">
              Hollybot, D Mechanical & Holly The Mechanic
            </span>{" "}
            by{" "}
            <a
              target="_blank"
              rel="noreferrer"
              className="text-[#9945FF] font-bold"
              href={"https://twitter.com/NFNC_art"}
            >
              No Face-No Case
            </a>
          </h1>
          <div className="mt-12 w-[100%] mx-auto">
            <h2 className="underline text-2xl font-bold">Description</h2>
            <div>
              This drop features 3 different collectibles:
              <br />• The{" "}
              <span className="text-[#a5a5a5] font-bold">Common</span>{" "}
              <span className="italic">Hollybot</span>: A robot created by Holly
              The Mechanic, it can fight great, attack after attack, it launches
              very quickly, because the program was created with violence in
              mind.{" "}
              <span className="text-[#a5a5a5] font-bold">(supply: 82277)</span>
              .
              <br />• The <span className="text-[#E6C15A] font-bold">
                Rare
              </span>{" "}
              <span className="italic">D Mechanical</span>: D Mechanical
              Hollybot is 2 parts between humans and robots that cannot be
              separated. Holly the mechanic and Hollybot are combat robots that
              are made specifically to seek truth and justice.{" "}
              <span className="text-[#E6C15A] font-bold">(supply: 500)</span>
              .
              <br />• The{" "}
              <span className="text-[#14F195] font-bold">Legendary</span>{" "}
              <span className="italic">Holly The Mechanic</span>: HOLLY, who is
              now a very genius robot mechanic, can make fighting robots that
              are very strong and invincible. She assembled the robot with a
              chip that she created herself so that the robot has instincts like
              humans.{" "}
              <span className="text-[#14F195] font-bold">(supply: 50)</span>.
            </div>
          </div>
          {(wallet.publicKey || isXNFT) && isFetched && (
            <div className="mt-4 w-[100%] mx-auto">
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
          <div className="flex justify-center mt-4">
            <div className="sm:w-[75%] flex items-center grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
              {NFTsInThisDrop.map((currentNft) => (
                <div key={currentNft.uri}>
                  <div
                    className={`bg-[#000000] border border-4 ${
                      currentNft.rarity == "Common" && "border-[#a5a5a5]"
                    } ${currentNft.rarity == "Rare" && "border-[#E6C15A]"} ${
                      currentNft.rarity == "Legendary" &&
                      "border-t-[#14F195] border-r-[#14F195] border-b-[#9945FF] border-l-[#9945FF]"
                    }`}
                  >
                    <div className="flex justify-center">
                      <img className="" src={currentNft.image}></img>
                    </div>
                    <h1 className="font-bold mt-2">{currentNft.name}</h1>
                    {isFetched && (wallet.publicKey || isXNFT) && (
                      <div className="flex justify-center">
                        {isFetched &&
                        userDripNFT.find((nft) => nft == currentNft.uri) !=
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
