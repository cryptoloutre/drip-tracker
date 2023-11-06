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

export const MadhouseHome: FC = ({}) => {
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
          "MADoJepJwDCv5ELUZx4JathJFG3sUciMCtuVSgoRVsB"
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
        const drop = attributes.find((nft) => nft.trait_type == "Date").value;
        return {
          uri,
          drop,
        };
      })
    );

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

    console.log("Got their degen poet NFTs!", userNFTs);

    setNbUserNFTs(userNFTs.length);

    // store the drops and the number of NFTs of this drop owned by the user
    const userDropsAndCount = [];

    for (let drop of userNFTs) {
      const index = userDropsAndCount.find(
        (_drop: any) => _drop.dropNb == drop.drop
      );
      if (index) {
        index.nbNFT += 1;
      } else {
        userDropsAndCount.push({
          dropNb: drop.drop,
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
          <h1 className="font-bold text-4xl text-center">MADhouse Drop</h1>
          <div className="text-center text-3xl font-bold">
            Track the MADhouse DRiP NFTs you are missing
          </div>
          <div className="mt-8 sm:w-[70%] mx-auto">
            <a
              target="_blank"
              rel="noreferrer"
              className="text-[#9945FF] font-bold"
              href={"https://twitter.com/MADhouse_nft"}
            >
              MADhouse
            </a>{" "}
            is a Canadian graphic designer & illustrator turned degen artist
            inspired by everything weird in the world. Here to drip weekly
            collectibles to your wallet in the form of limited run mini-series
            exploring different formats, styles, and mediums. <br />
            Sign up{" "}
            <a
              target="_blank"
              rel="noreferrer"
              className="text-[#9945FF] font-bold"
              href={"https://drip.haus/madhouse"}
            >
              here
            </a>{" "}
            to never miss a{" "}
            <a
              target="_blank"
              rel="noreferrer"
              className="text-[#9945FF] font-bold"
              href={"https://twitter.com/MADhouse_nft"}
            >
              MADhouse
            </a>{" "}
            DRiP drop.
            <div className="mt-4 flex text-xl">
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] underline font-bold"
                href={"https://twitter.com/MADhouse_nft"}
              >
                Twitter
              </a>
            </div>
          </div>
          {!wallet.publicKey && !isXNFT && (
            <div className="text-center font-bold text-xl my-6">
              Please, connect your wallet to see your progression!
            </div>
          )}
          {(wallet.publicKey || isXNFT) && isFetched && (
            <div className="text-center sm:w-[70%] mx-auto font-bold text-xl my-6">
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
                      Drops incomplete:
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
                      Drop missed:
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
                href="/madhouse/drop1"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/FiX4v_C6FzfwviVOSSa0CLnXPU1CuS6shrX3v88-Kkw?ext=png"
                    alt="drop 1 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 1</div>
              </Link>
              <Link
                href="/madhouse/drop2"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/5bxYM_hl2rzTTF2o-hp7hq1ie8JzgD6GkdRxDyLae94?ext=png"
                    alt="drop 2 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 2</div>
              </Link>
              <Link
                href="/madhouse/drop3"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/iRf-ebhk5g8vbZaklTVB6JHo_TcJgzMakJSgj4JEc5E?ext=png"
                    alt="drop 3 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 3</div>
              </Link>
              <Link
                href="/madhouse/drop4"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/0fa4t4iP65cFcrac8aiOLanM9RqI7bx5K4CJfOdS9-c?ext=png"
                    alt="drop 4 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 4</div>
              </Link>
              <Link
                href="/madhouse/drop5"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/NUQQIgQRVUghXvr-mQPxmgHNYQByOGrpfMz7nnl_jgw?ext=png"
                    alt="drop 5 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 5</div>
              </Link>
              <Link
                href="/madhouse/drop6"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/wXasWfhu85mYib-ag44TW9XfsIT6cTbjNmx8ffXBwYc?ext=png"
                    alt="drop 6 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 6</div>
              </Link>
              <Link
                href="/madhouse/drop7"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/67mkhP9xEbGpM1wetadh5tIwdYFrIT_wF-rzKIDUuGM?ext=gif"
                    alt="drop 7 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 7</div>
              </Link>
              <Link
                href="/madhouse/drop8"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/_SEX6vYFZHD7ljeG0jUzUVfrQhgke8w9ukldmg6XDVk?ext=png"
                    alt="drop 8 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 8</div>
              </Link>
              <Link
                href="/madhouse/drop9"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/2rw-Wb-kH-mSjw0YP2VoKAKSjSuAnoF2u9-RfBROZzs?ext=png"
                    alt="drop 9 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 9</div>
              </Link>
              <Link
                href="/madhouse/drop10"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/vOuisVUBJntITK8-xIWTfEznYxL0gOtpBqIG0dhdE74?ext=png"
                    alt="drop 10 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 10</div>
              </Link>
              <Link
                href="/madhouse/drop11"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/ucmI_evsYC_a8d99PFuB2QfGg3GZLvhF4LoS5jAIHlE?ext=PNG"
                    alt="drop 11 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 11</div>
              </Link>
              <Link
                href="/madhouse/drop12"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/x2Kpd7ZX1eRuaB5cZTFyNE4RC-KMOUEiE9siTgbm7nU?ext=png"
                    alt="drop 12 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 12</div>
              </Link>
              <Link
                href="/madhouse/drop13"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/srhpQMvlq9Jd1ODfz5UrLo0jQ-k3AwstsrNKHtcIw4U?ext=png"
                    alt="drop 13 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 13</div>
              </Link>
              <Link
                href="/madhouse/drop14"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/o1eg4m1TJOSjOvjtks47qSGLsHXIpC4EBvwO3kjN88E?ext=png"
                    alt="drop 14 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 14</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
