// Next, React
import { FC, useEffect, useState } from "react";
import Link from "next/link";

// Wallet
import { useWallet } from "@solana/wallet-adapter-react";

import { RarityLegend } from "components/RarityLegend";
import { WrapperConnection } from "../../../../ReadApi/WrapperConnection";

export const Drop18S2: FC = ({}) => {
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
    if (window.xnft.solana.isXnft) {
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

    const DashersNFT = userNFTs.items.filter(
      (asset) =>
        asset.compression.compressed &&
        asset.grouping[0] != undefined &&
        asset.grouping[0].group_value ==
          "DASHYFhWiCoe8PNCHZJAjmvGBBj8SLtkvW2uYV2e3FrV"
    );

    console.log(DashersNFT);

    const userDashers = [];

    await Promise.all(
      DashersNFT.map(async (asset) => {
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
        userDashers.push({
          name: name,
          image: image,
          rarity: rarity,
        });
      })
    );

    setNbUserNFTs(userDashers.length);

    console.log("Got their DROP NFTs!", userDashers);

    setUserDripNFT(userDashers);
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
            Drop18: <span className="italic">The Dashers</span> by{" "}
            <a
              target="_blank"
              rel="noreferrer"
              className="text-[#9945FF] font-bold"
              href={"https://twitter.com/assetdash"}
            >
              {" "}
              @assetdash
            </a>
          </h1>
          <div className="mt-12 sm:w-[70%] mx-auto">
            <h2 className="underline text-2xl font-bold">Description</h2>
            <div>
              Created by{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/assetdash"}
              >
                @assetdash
              </a>
              , this 500k-piece PFP collection was designed by{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/flagmonkez"}
              >@flagmonkez
              </a>, creator of {" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/nokiamonX"}
              >
                @nokiamonX
              </a>{" "}
              and THE RIVALS, DRiP&apos;s first PFP collection.
              <br />
              Dashers features 59 traits, including &quot;perfect combos&quot;,
              animated pieces, and ultra-low supply editions by{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/degenpoet"}
              >
                @degenpoet
              </a>
              .
              <br />
              <br />
              Founded by{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] font-bold"
                href={"https://twitter.com/degenpoet"}
              >
                @mattdorta
              </a>{" "}
              in January, 2022, AssetDash is a crypto & trad-fi portfolio
              tracker turned rewards super-app. With over 100,000 active
              accounts, it&apos;s one of the largest and fastest growing rewards
              platforms in crypto.
              <br />
              <br />
              The Dashers contains 15,066 different trait combinations, plus 3
              Degen Poet variations. This means each combination appears roughly
              33 times. Legendaries are rarer than this, but they work slightly
              differently.
              <br />
              There are 15,000 base Legendaries + 10 Degen Poet Legendaries.
              Each Legendary in The Dashers is what we call a &quot;perfect
              combination&quot; — a matching head trait, costume, and
              background. These vary on the base character, flag color, and
              icon.
              <br/>
              The Rare tier includes 55,000, with an additional 100 Degen Poet Rares.
              <br/>
              The Common tier contains 430,000 with an additional 3000 Degen Poet Commons.
            </div>
          </div>
          {(wallet.publicKey || isXNFT) && isFetched && (
            <div className="mt-4 sm:w-[70%] mx-auto">
              <h2 className="underline text-2xl font-bold">Progress</h2>
              <div>
                You have{" "}
                <span className="font-black text-[#14F195]">{nbUserNFTs}</span>{" "}
                The Dashers!
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
