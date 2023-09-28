// Next, React
import { FC, useEffect, useState } from "react";
import Link from "next/link";

// Wallet
import { useWallet } from "@solana/wallet-adapter-react";

import { RarityLegend } from "components/RarityLegend";
import { WrapperConnection } from "../../../../ReadApi/WrapperConnection";
import { getUserNFTs } from "utils/getUserNFTs";

export const Drop22S2: FC = ({}) => {
  const wallet = useWallet();
  const connection = new WrapperConnection(
    "https://mainnet.helius-rpc.com/?api-key=1d8740dc-e5f4-421c-b823-e1bad1889eff"
  );
  const [userDripNFT, setUserDripNFT] = useState<any[]>();
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [nbUserNFTs, setNbUserNFTs] = useState<number>();

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

    const BinaryForceNFT = userNFTs.filter(
      (asset) =>
        asset.compression.compressed &&
        asset.grouping[0] != undefined &&
        asset.grouping[0].group_value ==
          "SoLPr7zxggXh9JUt8NGKyxLZGJmyWqgawcs9N9hmatP"
    );

    console.log(BinaryForceNFT);

    const userBinaryForce = [];

    await Promise.all(
      BinaryForceNFT.map(async (asset) => {
        let attributes: any;
        if (asset.content.metadata.attributes) {
          attributes = asset.content.metadata.attributes;
        } else {
          const uri = asset.content.json_uri;
          const response = await fetch(uri);
          const responseData = await response.json();
          attributes = responseData.attributes;
        }

        const name = asset.content.metadata.name;
        const rarity = attributes.find(
          (nft) => nft.trait_type == "Rarity"
        ).value;
        // @ts-ignore
        const image = asset.content.files[0].uri;
        userBinaryForce.push({
          name: name,
          image: image,
          rarity: rarity,
        });
      })
    );

    setNbUserNFTs(userBinaryForce.length);

    console.log("Got their DROP NFTs!", userBinaryForce);

    setUserDripNFT(userBinaryForce);
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
            Drop22: <span className="italic">Binary Force</span> by{" "}
            <a
              target="_blank"
              rel="noreferrer"
              className="text-[#9945FF] font-bold"
              href={"https://twitter.com/SolPatrolNFT"}
            >
              @SolPatrolNFT
            </a>
          </h1>
          <div className="mt-12 sm:w-[70%] mx-auto">
            <h2 className="underline text-2xl font-bold">Description</h2>
            <div>
              Originally launched in 2021,{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/SolPatrolNFT"}
              >
                @SolPatrolNFT
              </a>{" "}
              reinvents itself as Web3&apos;s first free idle RTS game with
              500,000 unique PFPs.
              <br />
              The goal: Build and protect your city. The art was created by
              pixel artists{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/LifeArgus"}
              >
                @LifeArgus{" "}
              </a>
              and{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/FujiiSol"}
              >
                @FujiiSol
              </a>
              . The game was built on{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/honeycomb_prtcl"}
              >
                @honeycomb_prtcl
              </a>
              , and created by{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/TumiLabs"}
              >
                @TumiLabs
              </a>
              . The project was produced by{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/juamps"}
              >
                @juamps
              </a>
              ,{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/cyborg_rainbow"}
              >
                @cyborg_rainbow
              </a>
              ,{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/maniyo_sol"}
              >
                @maniyo_sol
              </a>
              , and{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/sol_faq"}
              >
                @sol_faq
              </a>
              .
              <br />
              <br />
              First, let&apos;s talk about the PFPs. The PFP set contains 84
              different traits:
              <br />
              🌅 11 Backgrounds
              <br />
              👕 13 Shirts
              <br />
              👁 5 Eyes
              <br />
              👓 10 Pairs of Eyewear
              <br />
              🧢 23 Hats
              <br />
              👄 8 Mouths
              <br />
              👤 14 Base Characters
              <br /> Rarity has no impact on the game. But there are plenty of
              ultra-rare combos to collect 😈
              <br/><br/>
              To learn more about the game, read {" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/drip_haus/status/1691950153341780415"}
              >
                this
              </a>.
            </div>
          </div>
          {(wallet.publicKey || isXNFT) && isFetched && (
            <div className="mt-4 sm:w-[70%] mx-auto">
              <h2 className="underline text-2xl font-bold">Progress</h2>
              <div>
                You have{" "}
                <span className="font-black text-[#14F195]">{nbUserNFTs}</span>{" "}
                Binary Force!
              </div>
            </div>
          )}
          {!wallet.publicKey && !isXNFT && (
            <div className="text-center font-bold text-xl mt-6">
              Please, connect your wallet to see your NFTs!
            </div>
          )}
          <RarityLegend />
          <div className="flex justify-center">
            <div className="sm:w-[85%] flex items-center grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {isFetched &&
                userDripNFT.map((currentNft) => (
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
