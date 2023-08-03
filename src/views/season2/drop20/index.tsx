// Next, React
import { FC, useEffect, useState } from "react";
import Link from "next/link";

// Wallet
import { useWallet } from "@solana/wallet-adapter-react";

import { RarityLegend } from "components/RarityLegend";
import { WrapperConnection } from "../../../../ReadApi/WrapperConnection";
import { NFTsinDrop } from "./NFTsinDrop";

export const Drop20S2: FC = ({}) => {
  const wallet = useWallet();
  const connection = new WrapperConnection(
    "https://mainnet.helius-rpc.com/?api-key=1d8740dc-e5f4-421c-b823-e1bad1889eff"
  );
  const [userDripNFT, setUserDripNFT] = useState<any[]>();
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [nbUserNFTs, setNbUserNFTs] = useState<number>();

  const dropNumber = "20";
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
            Drop20: <span className="italic">MOOAR Mascots</span> by{" "}
            <a
              target="_blank"
              rel="noreferrer"
              className="text-[#9945FF] font-bold"
              href={"https://twitter.com/mooarofficial"}
            >
              @mooarofficial
            </a>
          </h1>
          <div className="mt-12 sm:w-[90%] mx-auto">
            <h2 className="underline text-2xl font-bold">Description</h2>
            <div>
                The MOOAR Mascots are full 3D objects. You can spin them, zoom
                in, and see every detail of these adorable cats. This
                functionality works both in your{" "}
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#9945FF] font-bold"
                  href={"https://twitter.com/Phantom"}
                >
                  @Phantom
                </a>{" "}
                wallet, as well as the DRiP Vault.
                <br />
                <br />
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#9945FF] font-bold"
                  href={"https://twitter.com/mooarofficial"}
                >
                  @mooarofficial
                </a>{" "}
                is an NFT marketplace from Finding Satoshi (FSL), creators of <a
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#9945FF] font-bold"
                  href={"https://twitter.com/Stepnofficial"}
                >@Stepnofficial</a>. MOOAR was founded in November 2022, and serves as a
                cross-chain NFT marketplace and launchpad, built to reward
                collectors.
                <br />
                One of its unique features is their new tool called GNT that
                lets users create NFT collections with AI. MOOAR is at the
                center of the growing FSL universe, which will soon include
                their new game{" "}
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#9945FF] font-bold"
                  href={"https://twitter.com/GasHeroOfficial"}
                >
                  @GasHeroOfficial
                </a>
                .
                <br />
                This drop has utility. Your drop unlocks a rewards box on MOOAR.
                Every box is guaranteed a prize, but you can also find: 6 DRiP x
                STEPN Genesis Sneakers, 10 DRiP x STEPN OG Sneakers, 100 DRiP x
                STEPN Common Sneakers, 3 x 10k $GMT.
                <br />
                The rarer your MOOAR Mascot is, the better your prizes are. To
                receive this box, YOU MUST connect the wallet that has your
                MOOAR Mascot before August 7{" "}
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#9945FF] font-bold"
                  href={"http://MOOAR.com"}
                >
                  here
                </a>
                , and hold for the snapshot (details soon). On Aug 10, burn 10
                $GMT on MOOAR to reveal your prize.
                
                <br/><br/>
                Full details on all prize mechanics <a
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#9945FF] font-bold"
                  href={"https://twitter.com/mooarofficial/status/1686461130821025794"}
                >here</a>.
              This drop features 3 different collectibles:
              <br />• The{" "}
              <span className="text-[#a5a5a5] font-bold">Common</span>{" "}
              <span className="italic">MOOAR Cat DRiP</span>{" "}
              <span className="text-[#a5a5a5] font-bold">(supply: 423000)</span>
              .
              <br />• The <span className="text-[#E6C15A] font-bold">
                Rare
              </span>{" "}
              <span className="italic">MOOAR Cat Silver</span>{" "}
              <span className="text-[#E6C15A] font-bold">(supply: 22500)</span>
              .
              <br />• The{" "}
              <span className="text-[#14F195] font-bold">Legendary</span>{" "}
              <span className="italic">MOOAR Cat Gold</span>{" "}
              <span className="text-[#14F195] font-bold">(supply: 4500)</span>.
            </div>
          </div>
          {(wallet.publicKey || isXNFT) && isFetched && (
            <div className="mt-4 sm:w-[90%] mx-auto">
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
            <div className="sm:w-[85%] flex items-center grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
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
                      <img className="" src={currentNft.image}></img>
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
