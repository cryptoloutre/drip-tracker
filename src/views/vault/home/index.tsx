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
import { Completion } from "components/Completion";

export const VaultHome: FC = ({ }) => {
  const wallet = useWallet();
  const connection = new WrapperConnection(
    "https://rpc.helius.xyz/?api-key=e2ff09e4-d800-4b10-bb34-40f6044c1191"
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
        "VLT1ERWF2SQ51ybTGAuSBDWFZCxYth8ox6faJG9WrmG"
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
        let drop = attributes.find((nft) => nft.trait_type == "drop");

        if (drop) {
          drop = drop.value;
        }
        else {
          let name: any;
          if (asset.content.metadata) {
            name = asset.content.metadata.name;
          } else {
            const uri = asset.content.json_uri;
            const response = await fetch(uri);
            const responseData = await response.json();
            name = responseData.name;
          }
          if (name == "Barcelona") {
            drop = "31"
          }
          else {
            drop = "2"
          }
        }
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

    console.log("Got their DAA NFTs!", _userNFTs);

    setNbUserNFTs(_userNFTs.length);

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
          <h1 className="font-bold text-4xl text-center">Vault Music Drop</h1>
          <div className="text-center text-3xl font-bold">
            Track the Vault Music NFTs you are missing
          </div>
          <div className="mt-8 sm:w-[70%] mx-auto">
            Vault Music is the home for limited-edition music drops from
            tomorrow&apos;s chart-toppers. Build your rare music collection with live
            and unreleased music from artists on the rise. Vault drops are
            on-chain, fully decentralized, and instantly playable on the Vault
            Music app. Every week, Vault Music drops a new song from an
            up-and-coming artist. Don&apos;t miss your chance to discover and collect
            music before it goes mainstream…
            <br />
            <br />
            Sign up{" "}
            <a
              target="_blank"
              rel="noreferrer"
              className="text-[#9945FF] font-bold"
              href={"https://drip.haus/vaultmusic"}
            >
              here
            </a>{" "}
            to never miss a{" "}
            <a
              target="_blank"
              rel="noreferrer"
              className="text-[#9945FF] font-bold"
              href={"https://twitter.com/vaultmusichq"}
            >
              Vault Music
            </a>{" "}
            DRiP drop.
            <div className="mt-4 flex text-xl">
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] underline font-bold mr-4"
                href={"https://twitter.com/vaultmusichq"}
              >
                Twitter
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] underline font-bold mr-4"
                href={"https://www.instagram.com/vaultmusichq/"}
              >
                Instagram
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] underline font-bold"
                href={"https://vault.fan/"}
              >
                Website
              </a>
            </div>
          </div>
          {!wallet.publicKey && !isXNFT && (
            <div className="text-center font-bold text-xl my-6">
              Please, connect your wallet to see your progression!
            </div>
          )}
          {(wallet.publicKey || isXNFT) && isFetched && (
            <Completion nbDropComplete={nbDropComplete} nbTotalDrop={nbTotalDrop} nbTotalNFTsInDrop={nbTotalNFTsInDrop} nbUserNFTs={nbUserNFTs} dropIncomplete={dropIncomplete} dropMissing={dropMissing} />
          )}
          {(wallet.publicKey || isXNFT) && !isFetched && <Loader />}
          <div className="flex justify-center">
            <div className="w-[70%] md:w-[50%] flex items-center grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
              <Link
                href="/vault/drop1"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/p27Ure5IlypdWA4G1p0Cva1FBCH34SDyOzCqqgc-iH4?ext=jpg"
                    alt="drop 1 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 1</div>
              </Link>
              <Link
                href="/vault/drop2"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/ryFO0RhRLkkJ2jX6Fo_np-PdQuvzNieCXep0eiBezO0?ext=jpg"
                    alt="drop 1 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 2</div>
              </Link>
              <Link
                href="/vault/drop3"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/8iYV1jFh1vnuUcFn_hPFmlsDtSu-9brijxYCzPhU8aA?ext=jpg"
                    alt="drop 3 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 3</div>
              </Link>
              <Link
                href="/vault/drop4"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/C88Fd8LBzYetj3_rzb2nFp2LHZ7Re0E6lJ6uzGArwng?ext=jpg"
                    alt="drop 4 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 4</div>
              </Link>
              <Link
                href="/vault/drop5"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/leFv4W63Rx12cSx73oUWPkPHRz7YS36KbPcrJVE-lAs?ext=png"
                    alt="drop 5 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 5</div>
              </Link>
              <Link
                href="/vault/drop6"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/8P6AoZlGeRkmM0vk8cQJepfeDcfSioOw7Xk1ebvlXc0?ext=png"
                    alt="drop 6 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 6</div>
              </Link>
              <Link
                href="/vault/drop7"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/W7kGjsikU2tDhSKlVOGKX-EjmiqyHupyiICmv-ngwxo?ext=jpg"
                    alt="drop 7 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 7</div>
              </Link>
              <Link
                href="/vault/drop8"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/hJlioelkZNu545V0krpi5O28F1SC4O_BiMXSTrP5LEU?ext=png"
                    alt="drop 8 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 8</div>
              </Link>
              <Link
                href="/vault/drop9"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/F14awDNtOBmAk_G3nY4dY1WBSSX2vAVw4S6f6AGId9k?ext=jpg"
                    alt="drop 9 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 9</div>
              </Link>
              <Link
                href="/vault/drop10"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/NHudkETFpcFVpKNxGruwjvRufkWhJcO28bQYVxyedCg?ext=png"
                    alt="drop 10 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 10</div>
              </Link>
              <Link
                href="/vault/drop11"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/X_dV0yMy9kIiF7b6-_QP72zHg6DIlJRcYZiO3HoAeSk?ext=png"
                    alt="drop 11 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 11</div>
              </Link>
              <Link
                href="/vault/drop12"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/8PBVSgyhm20wedaTM7rFuQmkm-l3PRC_XE9AT18YcVY?ext=png"
                    alt="drop 12 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 12</div>
              </Link>
              <Link
                href="/vault/drop13"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/LODo6qOyNqJQfgNDNAzK1r_NxuAgQPCHqEQ2bNPLdP4?ext=png"
                    alt="drop 13 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 13</div>
              </Link>
              <Link
                href="/vault/drop14"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/W6WmstyuGMuo3OT1ptG1OqTQIlrNbN4Kywvzm5Sc_ME?ext=png"
                    alt="drop 14 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 14</div>
              </Link>
              <Link
                href="/vault/drop15"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/tCo1ay5TCmeYnS2hvbfsbGbwVWt7FgqoZLyl8ELk4as?ext=jpg"
                    alt="drop 15 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 15</div>
              </Link>
              <Link
                href="/vault/drop16"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/q1uNwE4E_9McpqrDy-Vvr6iFJKQHsFF-C9UxmdIvFO8?ext=png"
                    alt="drop 16 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 16</div>
              </Link>
              <Link
                href="/vault/drop17"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/jQ59SBR4JRjxTsQeQrOQCTq9r319GBEPHCuqzR_Biko?ext=png"
                    alt="drop 17 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 17</div>
              </Link>
              <Link
                href="/vault/drop18"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/e5MTk4-mt94sSP6M71M5Y607-3HtOZT_2O-fSOEJZfY?ext=png"
                    alt="drop 18 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 18</div>
              </Link>
              <Link
                href="/vault/drop19"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/lHeGrBYm7oh_jFDx3ZPR20cUCAE8xkZ8zAWr9peIKgA?ext=png"
                    alt="drop 19 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 19</div>
              </Link>
              <Link
                href="/vault/drop20"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/BJJ8hFU84YEb65n7KyHXZpTJ9YkMY2D6L4S-GntC7Og?ext=png"
                    alt="drop 20 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 20</div>
              </Link>
              <Link
                href="/vault/drop21"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/b3CH_JbCYC36FLr3lXqSskpfUvCyg2J1LnYHHwvtvlQ?ext=png"
                    alt="drop 21 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 21</div>
              </Link>
              <Link
                href="/vault/drop22"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/FFeYj4o8620x7Or4pgD0U1QRIqwb2NgUCly_ZmZQ75Q?ext=png"
                    alt="drop 22 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 22</div>
              </Link>
              <Link
                href="/vault/drop23"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/Wx3KkSNqlXNviPFG55wKUP2ePtfMRxgiCBUt67z60Fc?ext=png"
                    alt="drop 23 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 23</div>
              </Link>
              <Link
                href="/vault/drop24"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/iQH61Nfwsrr1J69kyrN4mzdIr9sO-UeAi_3a4A9Uo5k?ext=png"
                    alt="drop 24 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 24</div>
              </Link>
              <Link
                href="/vault/drop25"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/ryPC64f8JAC2JfBfco-7Asc182m0gh7W7Sb-i8GL1-4?ext=jpg"
                    alt="drop 25 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 25</div>
              </Link>
              <Link
                href="/vault/drop26"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/EjJlg63g2-ZZVMIkMqqycWtanVf4HmYu6sp4eWjHZP0?ext=png"
                    alt="drop 26 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 26</div>
              </Link>
              <Link
                href="/vault/drop27"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/TghgYXqgp96MzgIeoh4lctYilnmsvLCBhFj9k6szLRs?ext=png"
                    alt="drop 27 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 27</div>
              </Link>
              <Link
                href="/vault/drop28"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/LlI1dqvQBHzv34dbV_OkFczcIJVrWuzFDc0r23PpRs4?ext=png"
                    alt="drop 28 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 28</div>
              </Link>
              <Link
                href="/vault/drop29"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/LjumOmoh_Z4-YuBJyu-Z17P8GR1SS-uoNQn3OT_jPS4?ext=png"
                    alt="drop 29 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 29</div>
              </Link>
              <Link
                href="/vault/drop30"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/bIK2wfXNRrUzse0Mx4JFpkTFfWGsy8IqAujNnJgLjk8?ext=png"
                    alt="drop 30 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 30</div>
              </Link>
              <Link
                href="/vault/drop31"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/5e4ILr1Dt-xFVDKsmMb-rR4o1UrJXMtr-D92luXXGL8?ext=png"
                    alt="drop 31 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 31</div>
              </Link>
              <Link
                href="/vault/drop32"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/DC0Cj6wEjswQYyTEXrH4ldNZKvaKzFaBlz4C8sT5gDc?ext=png"
                    alt="drop 32 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 32</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
