// Next, React
import { FC, useEffect, useState } from "react";
import Link from "next/link";

// Wallet
import { useWallet } from "@solana/wallet-adapter-react";

import { Metadata, Metaplex } from "@metaplex-foundation/js";
import { Connection } from "@solana/web3.js";
import { Loader } from "components/Loader";
import { WrapperConnection } from "../../../ReadApi/WrapperConnection";

export const Reader: FC = ({}) => {
  const wallet = useWallet();
  const connection = new WrapperConnection(
    "https://mainnet.helius-rpc.com/?api-key=1d8740dc-e5f4-421c-b823-e1bad1889eff"
  );
  const [userComics, setUserComics] = useState<any[]>();
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [nbUserNFTs, setNbUserNFTs] = useState<number>();
  const [toDisplay, setToDisplay] = useState<{
    name: string;
    image: string;
    chapter: string;
    rarity: string;
    slides: any[];
  } | null>(null);

  async function getUserNFT() {
    if (!wallet.publicKey) {
      return;
    }
    const publickey = wallet.publicKey;

    setIsFetched(false);

    const allUserNFTs = await connection.getAssetsByOwner({
      ownerAddress: publickey.toBase58(),
    });

    const borkNFT = allUserNFTs.items.filter(
      (asset) =>
        asset.compression.compressed &&
        asset.grouping[0] != undefined &&
        asset.grouping[0].group_value ==
          "BoRKkxKPoAt7LcyVRPa9ZZT5MztkJuc4PiGrUXAgDHPH"
    );

    console.log(borkNFT);

    const _userBork = [];

    await Promise.all(
      borkNFT.map(async (asset) => {

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
        const chapter = attributes.find(
          (nft) => nft.trait_type == "Chapter"
        ).value;
        const rarity = attributes.find(
          (nft) => nft.trait_type == "Rarity"
        ).value;
        // @ts-ignore
        const image = asset.content.files[0].uri;
        // @ts-ignore
        const slides = asset.content.files.slice(1);
        _userBork.push({
          name: name,
          image: image,
          chapter: chapter,
          rarity: rarity,
          slides: slides,
        });
      })
    );

    // we filter to eliminate the doublons
    const userBork = _userBork.filter((value: any, index: any) => {
      const _value = JSON.stringify(value);
      return (
        index ===
        _userBork.findIndex((obj: any) => {
          return JSON.stringify(obj) === _value;
        })
      );
    });

    userBork.sort(function (a:any, b:any) {
      if (a < b) {
        return -1;
      }
      if (a > b.slice) {
        return 1;
      }
      return 0;
    });

    console.log("Fetch user comics", userBork);

    setNbUserNFTs(userBork.length);

    setUserComics(userBork);

    setIsFetched(true);
  }

  useEffect(() => {
    if (wallet.publicKey) {
      getUserNFT();
    }
  }, [wallet.publicKey]);

  return (
    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex justify-center">
        <div className="">
          <h1 className="font-bold text-4xl text-center">Comics Reader</h1>
          {!toDisplay && (
            <div className="text-center text-3xl font-bold">
              Read the comics you have collected
            </div>
          )}

          {!toDisplay && isFetched && (
            <div className="text-center text-xl mt-4 font-bold">
              You have {nbUserNFTs} comics in your collection!
            </div>
          )}

          {toDisplay && (
            <button
              className="mt-14 mb-4 font-extrabold px-2 py-2 bg-[#696969] rounded-xl border-4 border-[#FFFFFF] hover:border-[#14F195]"
              onClick={() => {
                setToDisplay(null);
              }}
            >
              ← Back
            </button>
          )}
          {!wallet.publicKey && (
            <div className="text-center font-bold text-xl my-6">
              Please, connect your wallet to see your comics!
            </div>
          )}
          {wallet.publicKey && !isFetched && !toDisplay && (
            <div className="mt-[50%]">
              <Loader />
            </div>
          )}
          <div className="flex justify-center">
            {!toDisplay && (
              <div className="w-[70%] mt-12 md:w-[50%] flex items-center grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                {isFetched &&
                  userComics.map((currentNft) => (
                    <div key={currentNft.name}>
                      {currentNft.rarity == "Common" && (
                        <button
                          onClick={() => {
                            setToDisplay(currentNft);
                          }}
                          className="bg-[#000000] border border-4 border-[#a5a5a5] hover:border-[#14F195]"
                        >
                          <div className="flex justify-center">
                            <img className="" src={currentNft.image}></img>
                          </div>
                          <h1 className="font-bold mt-2">{currentNft.name}</h1>
                        </button>
                      )}
                      {currentNft.rarity == "Legendary" && (
                        <button
                          onClick={() => {
                            setToDisplay(currentNft);
                          }}
                          className="bg-[#000000] border border-4 border-t-[#14F195] border-r-[#14F195] border-b-[#9945FF] border-l-[#9945FF] hover:border-[#14F195]"
                        >
                          <div className="flex justify-center">
                            <img className="" src={currentNft.image}></img>
                          </div>
                          <h1 className="font-bold mt-2">{currentNft.name}</h1>
                        </button>
                      )}
                      {currentNft.rarity == "Rare" && (
                        <button
                          onClick={() => {
                            setToDisplay(currentNft);
                          }}
                          className="bg-[#000000] border border-4 border-[#E6C15A] hover:border-[#14F195]"
                        >
                          <div className="flex justify-center">
                            <img className="" src={currentNft.image}></img>
                          </div>
                          <h1 className="font-bold mt-2">{currentNft.name}</h1>
                        </button>
                      )}
                    </div>
                  ))}
              </div>
            )}

            {toDisplay && <DisplayComics toDisplay={toDisplay} />}
          </div>
          {toDisplay && (
            <button
              className="my-4 font-extrabold px-2 py-2 bg-[#696969] rounded-xl border-4 border-[#FFFFFF] hover:border-[#14F195]"
              onClick={() => {
                setToDisplay(null);
              }}
            >
              ← Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

type Props = {
  toDisplay: {
    name: string;
    image: string;
    chapter: string;
    rarity: string;
    slides: any[];
  };
};

const DisplayComics: FC<Props> = ({ toDisplay }) => {

  const _slides = [];
  _slides.push(toDisplay.image);

  const pages = []

  toDisplay.slides.map((slide) => {
    if (slide.uri != "")
    {
      pages.push(slide.uri)
    }
  });

  pages.sort(function (a:any, b:any) {
    if (a.slice(-1) < b.slice(-1)) {
      return -1;
    }
    if (a.slice(-1) > b.slice(-1)) {
      return 1;
    }
    return 0;
  });


  const slides = _slides.concat(pages);


  return (
    <div>
      <div className="text-center font-extrabold text-2xl mb-2">
        Chapter {toDisplay.chapter}
      </div>
      {slides.map((uri) => (
        <img className="mb-2 w-[600px] " key={uri} src={uri}></img>
      ))}
    </div>
  );
};
