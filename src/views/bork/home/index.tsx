// Next, React
import { FC, useEffect, useState } from "react";
import Link from "next/link";

// Wallet
import { useWallet } from "@solana/wallet-adapter-react";

import { Metadata, Metaplex } from "@metaplex-foundation/js";
import { Connection } from "@solana/web3.js";
import { Loader } from "components/Loader";
import { WrapperConnection } from "../../../../ReadApi/WrapperConnection";
import { DropInfo } from "./DropInfo";
import { getUserNFTs } from "utils/getUserNFTs";

export const BorkHome: FC = ({}) => {
  const wallet = useWallet();
  const connection = new WrapperConnection(
    "https://mainnet.helius-rpc.com/?api-key=1d8740dc-e5f4-421c-b823-e1bad1889eff"
  );
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [nbUserNFTs, setNbUserNFTs] = useState<number>();
  const [nbDropComplete, setNbDropComplete] = useState<number>();
  const [dropMissing, setDropMissing] = useState([]);
  const [dropIncomplete, setDropIncomplete] = useState([]);
  let nbTotalNFTsInDrop = 0;
  const nbTotalDrop = DropInfo.length;

  DropInfo.map((drop) => {
    nbTotalNFTsInDrop += drop.nbNFT;
  });

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

    setIsFetched(false);

    const allUserNFTs = await getUserNFTs(publickey.toBase58());

    const _userNFTs = allUserNFTs.filter(
      (asset) =>
        asset.compression.compressed &&
        asset.grouping[0] != undefined &&
        asset.grouping[0].group_value ==
          "BoRKkxKPoAt7LcyVRPa9ZZT5MztkJuc4PiGrUXAgDHPH"
    );

    const _userNFTsURI = await Promise.all(
      _userNFTs.map(async (asset) => {
        let attributes: any;
        const uri = asset.content.json_uri;
        if (asset.content.metadata.attributes) {
          attributes = asset.content.metadata.attributes;
        } else {
          const response = await fetch(uri);
          const responseData = await response.json();
          attributes = responseData.attributes;
        }
        const chapter = attributes.find(
          (nft) => nft.trait_type == "Chapter"
        ).value;
        return {
          uri,
          chapter,
        };
      })
    );

    const _userBonusNFTs = allUserNFTs.filter(
      (asset) =>
        asset.compression.compressed &&
        asset.grouping[0] != undefined &&
        asset.grouping[0].group_value ==
          "BoRKiFyrcHwmuCdYFar5PH5L262R859nu3mttVg7TSW9"
    );

    _userBonusNFTs.map(async (asset) => {
      const uri = asset.content.json_uri;
      let chapter;
      const name = asset.content.metadata.name;
      if (name.includes("Bonus Borks 001")) {
        chapter = "Bonus Borks 001";
      } else {
        chapter = name;
      }
      _userNFTsURI.push({
        uri,
        chapter,
      });
    });

    // we filter to eliminate the doublons
    const userNFTs = _userNFTsURI.filter((value: any, index: any) => {
      const _value = JSON.stringify(value);
      return (
        index ===
        _userNFTsURI.findIndex((obj: any) => {
          return JSON.stringify(obj) === _value;
        })
      );
    });

    console.log("Got their DAA NFTs!", _userNFTs);

    setNbUserNFTs(userNFTs.length);

    // store the drops and the number of NFTs of this drop owned by the user
    const userDropsAndCount = [];

    for (let drop of userNFTs) {
      const index = userDropsAndCount.find(
        (_drop: any) => _drop.dropNb == drop.chapter
      );
      if (index) {
        index.nbNFT += 1;
      } else {
        userDropsAndCount.push({
          dropNb: drop.chapter,
          nbNFT: 1,
        });
      }
    }

    console.log(userDropsAndCount);

    const dropsMissing = [];
    const dropsIncomplete = [];

    DropInfo.map((drop) => {
      const index = userDropsAndCount.find(
        (_drop: any) => _drop.dropNb == drop.dropNb
      );
      if (index) {
        if (index.nbNFT !== drop.nbNFT) {
          dropsIncomplete.push(drop.dropNb);
        }
      } else {
        dropsMissing.push(drop.dropNb);
      }
    });

    console.log("Drop missing", dropsMissing);
    setDropMissing(dropsMissing);
    console.log("Drop incomplete", dropsIncomplete);
    setDropIncomplete(dropsIncomplete);

    const nbDropComplete =
      nbTotalDrop - dropsIncomplete.length - dropsMissing.length;
    setNbDropComplete(nbDropComplete);

    setIsFetched(true);
  }

  useEffect(() => {
    if (wallet.publicKey || isXNFT) {
      getUserNFT();
    }
  }, [wallet.publicKey, isXNFT]);

  return (
    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex justify-center">
        <div className="">
          <h1 className="font-bold text-4xl text-center">
            Bork The Viking Pug Drop
          </h1>
          <div className="text-center text-3xl font-bold">
            Track the Bork The Viking Pug NFTs you are missing
          </div>
          <div className="mt-8 sm:w-[70%] mx-auto">
            Bork The Viking Pug is a first-of-its-kind graphic novel created by{" "}
            <a
              target="_blank"
              rel="noreferrer"
              className="text-[#9945FF] font-bold"
              href={"https://twitter.com/Foursixsix"}
            >
              Foursixsix
            </a>{" "}
            and distributed weekly every Wednesday.
            <br />
            <br />
            Bork is a pug tasked with protecting his viking village. To achieve
            his mission, he&apos;ll travel to lands unknown and battle fantastic
            creatures and he&apos;ll nap every chance he gets.
            <br />
            <br />
            Sign up{" "}
            <a
              target="_blank"
              rel="noreferrer"
              className="text-[#9945FF] font-bold"
              href={"https://drip.haus/bork"}
            >
              here
            </a>{" "}
            to never miss a{" "}
            <a
              target="_blank"
              rel="noreferrer"
              className="text-[#9945FF] font-bold"
              href={"https://twitter.com/borktheviking"}
            >
              Bork The Viking Pug
            </a>{" "}
            DRiP drop.
            <div className="mt-4 flex text-xl">
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] underline font-bold mr-4"
                href={"https://twitter.com/borktheviking"}
              >
                Twitter
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] underline font-bold mr-4"
                href={"https://www.instagram.com/borktheviking/"}
              >
                Instagram
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] underline font-bold"
                href={"https://twitter.com/foursixsix"}
              >
                Artist
              </a>
            </div>
            <div className="flex justify-center">
              <a
                href="https://drip.haus/bork"
                target="_blank"
                rel="noreferrer"
                className="my-2 w-[200px] rounded bg-gradient-to-r from-[#00ff85] from-5% via-[#9945ff] via-50% to-[#00ff85] to-95% shadow-lg font-bold text-lg pt-3 pb-2.5 px-4 hover:cursor-pointer"
              >
                <span className="drop-shadow-md flex justify-center items-center">
                  <span>
                    <svg
                      className="w-[20px] h-[20px] mr-3"
                      width="512pt"
                      height="512pt"
                      version="1.1"
                      viewBox="0 0 512 512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="m81.289 349.94c46.676-12.98 85.223-13.242 153.14 31.469l90.73-19.797c13.898-3.0156 21.895 1.0508 26.879 7.4727 3.1484 4.1953 4.3281 9.0469 3.1484 14.16-1.1797 5.1133-4.1953 9.0469-8.9141 11.406l-97.547 49.43c-8.7852 5.6367-2.7539 15.078 4.3281 11.801l111.71-55.984c4.5898-2.3594 7.9961-5.7695 10.227-10.488 2.4922-5.2461 6.1641-9.4414 11.145-12.98l90.469-63.328c22.945-16.129 40.906 6.293 33.695 14.422l-110.53 111.97-117.87 60.707c-15.602 7.9961-31.074 10.883-48.512 8.7852l-150.26-16.914c-5.7695-0.65625-10.098-5.5078-10.098-11.277v-119.84c0-5.2461 3.2773-9.5703 8.2617-11.012zm201-283.6c0.26172 0.52344 0.91797 0.91797 1.5742 0.91797s1.1797-0.39453 1.5742-0.91797c25.438-44.84 64.375-79.453 117.74-61.492 41.039 13.766 70.801 54.281 70.801 102.14 0 67.918-69.883 123.12-114.73 166.91l-63.195 58.215c-6.9492 6.293-17.57 6.293-24.52 0l-63.066-58.215c-44.84-43.793-114.73-98.992-114.73-166.91 0-49.168 31.336-90.469 74.078-103.19 52.184-15.473 89.812 19.145 114.46 62.543zm-270.88 284.52h36.32c6.293 0 11.406 5.1133 11.406 11.277v127.18c0 12.457-10.227 22.684-22.684 22.684h-25.043c-6.293 0-11.406-5.1133-11.406-11.406v-138.46c0-6.1641 5.1133-11.277 11.406-11.277z"
                        fill="#fff"
                        fillRule="evenodd"
                      ></path>
                    </svg>
                  </span>
                  Say Thanks
                </span>
              </a>
            </div>
            <div className="text-lg mt-4">
              Use our{" "}
              <Link
                className="font-extrabold underline text-[#14F195]"
                href="/reader"
              >
                Reader
              </Link>{" "}
              to read your comics.
            </div>
          </div>
          {!wallet.publicKey && !isXNFT && (
            <div className="text-center font-bold text-xl my-6">
              Please, connect your wallet to see your progression!
            </div>
          )}
          {(wallet.publicKey || isXNFT) && isFetched && (
            <div className="text-center w-[70%] mx-auto font-bold text-xl my-6">
              <div className="text-left">
                You have:
                <div className="">
                  <div>
                    • completed{" "}
                    <span className="font-black text-[#14F195]">
                      {nbDropComplete}
                    </span>
                    /
                    <span className="font-black text-[#14F195]">
                      {nbTotalDrop}
                    </span>{" "}
                    drops!
                  </div>
                  <div>
                    •{" "}
                    <span className="font-black text-[#14F195]">
                      {nbUserNFTs}
                    </span>
                    /
                    <span className="font-black text-[#14F195]">
                      {nbTotalNFTsInDrop}
                    </span>{" "}
                    NFTs!
                  </div>
                  {dropIncomplete.length != 0 && (
                    <div>
                      Drop incomplete:
                      <div className="flex ml-4">
                        →
                        {dropIncomplete.map((drop) => (
                          <div key={drop} className="mx-1 text-[#ff0000]">
                            {drop}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {dropMissing.length != 0 && (
                    <div>
                      Chapter missed:
                      <div className="flex ml-4">
                        →
                        {dropMissing.map((drop) => (
                          <div key={drop} className="mx-1 text-[#ff0000] ">
                            {drop}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <br />
              <div>Choose a drop to see which NFTs you miss.</div>
            </div>
          )}
          {(wallet.publicKey || isXNFT) && !isFetched && <Loader />}
          <div className="flex justify-center">
            <div className="w-[70%] md:w-[50%] flex items-center grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
              <Link
                href="/bork/drop1"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/9v8cdvzPPxgKtlnoSZC7mjhioPvTzwO5J7jKanoYoNU?ext=jpg"
                    alt="chapter 1 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">
                  Chapter One
                </div>
              </Link>
              <Link
                href="/bork/drop2"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/GYO3m6siPflBvVyI66rakYVvA40aOMJVUC5mHgZENJM?ext=png"
                    alt="chapter 2 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">
                  Chapter Two
                </div>
              </Link>
              <Link
                href="/bork/drop3"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/ojB46IvkSQMpznvhpMyKGpCbUWG3qw_cMjTEXIC7xNY?ext=jpg"
                    alt="chapter 3 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">
                  Chapter Three
                </div>
              </Link>
              <Link
                href="/bork/drop4"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/IqXgqFemAJFiPk29kFSK642XZbJqOpMpizuL35h3P3w?ext=jpg"
                    alt="chapter 4 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">
                  Chapter Four
                </div>
              </Link>
              <Link
                href="/bork/drop5"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/c2THc4XX5zpbdUuErElGJ4rbPOKsdcHnkH5q_sZu8zs?ext=jpg"
                    alt="chapter 5 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">
                  Chapter Five
                </div>
              </Link>
              <Link
                href="/bork/drop6"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/c6mchuk2ARpJlqZMXAo1cXcPN5AtXvuHJDSinBUw-z8?ext=png"
                    alt="chapter 6 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">
                  Chapter Six
                </div>
              </Link>
              <Link
                href="/bork/drop7"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/dmbTG8fDgMR7QbCbqZv9ne7C9zJGUMprVjZlTHDgT5s?ext=jpg"
                    alt="chapter 7 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">
                  Chapter Seven
                </div>
              </Link>
              <Link
                href="/bork/drop8"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/lqMggPRnbtwXcvMsfroB7r1C0GDRxeahUH4x43rRT4U?ext=jpg"
                    alt="chapter 8 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">
                  Chapter Eight
                </div>
              </Link>
              <Link
                href="/bork/drop9"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/DteQ4FGDeu1rj8WzOh0JSZnELyEKLzR3qsvUZtsX250?ext=jpg"
                    alt="chapter 9 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">
                  Chapter Nine
                </div>
              </Link>
              <Link
                href="/bork/drop10"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/jlS8ZeyN6y58Sj0yrN8_8s_1j5o9KrXrS3MR8as1uNM?ext=jpg"
                    alt="chapter 10 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">
                  Chapter Ten
                </div>
              </Link>
              <Link
                href="/bork/drop11"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/8SwL42hOpi6tyyXs9x96cgtf0dcfhU_JnbqSsJKfwbQ?ext=jpg"
                    alt="chapter 11 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">
                  Chapter Eleven
                </div>
              </Link>
              <Link
                href="/bork/drop12"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/g3_7PMALFG207jJ6SSK4Wdtz7qZFlSyKWo7EV2Qrkpc?ext=jpg"
                    alt="chapter 12 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">
                  Chapter Twelve
                </div>
              </Link>
              <Link
                href="/bork/drop13"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/4VEGnJkzYHS4EdXuQZb_0TKXLu1f8BsvrGCvG0z6QUg?ext=jpg"
                    alt="chapter 13 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">
                  Chapter Thirteen
                </div>
              </Link>
              <Link
                href="/bork/drop14"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/gEMIJUioGsWHjp093Gk24TsVJfGVLIlFg3LNvVznlD8?ext=png"
                    alt="chapter 14 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">
                  Chapter Fourteen
                </div>
              </Link>
              <Link
                href="/bork/drop15"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/pAL5bN0oTI1v7DXJEBhOglQACeyGb9f9mfUW6D1XHfo?ext=jpg"
                    alt="chapter 15 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">
                  Chapter Fifteen
                </div>
              </Link>
              <Link
                href="/bork/drop16"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/9XfrFPmtuqrcEmcpdwv6aTQz2tBLVd5G81rucE8iCBo?ext=jpg"
                    alt="chapter 16 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">
                  Chapter Sixteen
                </div>
              </Link>
              <Link
                href="/bork/dropbonus1"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/_gKQs5dznBp0TabzwYcPOcGpqI8WJXDnF_LM39GwefI?ext=jpg"
                    alt="dropbonus1 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">
                  Bonus Borks 001
                </div>
              </Link>
              <Link
                href="/bork/dropbonus2"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/mA6Y9O788aXcSQNr91v_1kJmU6lFnTpdh1mrEngEUSE?ext=jpg"
                    alt="dropbonus2 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">
                  Bonus Borks 002
                </div>
              </Link>
              <Link
                href="/bork/dropbonus3"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/wF2Z8NSpdUx-wfyhfMoI-c38KpS6v1HAc4oAzX5naws?ext=jpg"
                    alt="dropbonus3 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">
                  Bonus Borks 003
                </div>
              </Link>
              <Link
                href="/bork/dropbonus4"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/OKE3LRW6NjpM7X1IQiC_zbb-0p-vlndmNKoJLYnjkUM?ext=png"
                    alt="dropbonus4 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">
                  Bonus Borks 004
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
