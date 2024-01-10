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

export const TinyHome: FC = ({}) => {
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

    const allUserNFTs = await getUserNFTs(
      publickey.toBase58());

    const _userNFTsS1 = allUserNFTs.filter(
      (asset) =>
        asset.compression.compressed &&
        asset.grouping[0] != undefined &&
        asset.grouping[0].group_value ==
          "tinyVrmxcEUyVufgmFzGYe7C4mrGXDC21uLJAGVKXkg"
    );

    const _userNFTsURIS1 = await Promise.all(
      _userNFTsS1.map(async (asset) => {
        let attributes: any;
        const uri = asset.content.json_uri;
        if (asset.content.metadata.attributes) {
          attributes = asset.content.metadata.attributes;
        } else {
          const response = await fetch(uri);
          const responseData = await response.json();
          attributes = responseData.attributes;
        }
        let drop = attributes.find((nft) => nft.trait_type == "Drop");
        if (!drop) {
          drop = 1;
        } else {
          drop = drop.value;
        }
        return {
          uri,
          drop,
        };
      })
    );

    const _userNFTsS2 = allUserNFTs.filter(
      (asset) =>
        asset.compression.compressed &&
        asset.grouping[0] != undefined &&
        asset.grouping[0].group_value ==
          "GooDeBHLq7TnLmMRevoKV2zTXi4DkDuD2jwPpDESwkSP"
    );

    const _userNFTsURIS2 = await Promise.all(
      _userNFTsS2.map(async (asset) => {
        let attributes: any;
        const uri = asset.content.json_uri;
        if (asset.content.metadata.attributes) {
          attributes = asset.content.metadata.attributes;
        } else {
          const response = await fetch(uri);
          const responseData = await response.json();
          attributes = responseData.attributes;
        }
        const drop = attributes.find((nft) => nft.trait_type == "Drop").value + "S2";
        return {
          uri,
          drop,
        };
      })
    );

    const _userNFTsVibes = allUserNFTs.filter(
      (asset) =>
        asset.compression.compressed &&
        asset.grouping[0] != undefined &&
        asset.grouping[0].group_value ==
          "6B2EhUJ9VNQBbNrME35XkZXm7NRuq376VNiDoMtAA45G"
    );

    const _userNFTsURIVibes = await Promise.all(
      _userNFTsVibes.map(async (asset) => {
        const uri = asset.content.json_uri;
        let name: any;
        if (asset.content.metadata) {
          name = asset.content.metadata.name;
        } else {
          const response = await fetch(uri);
          const responseData = await response.json();
          name = responseData.name;
        }
        let drop;
        if (["Give Yourself Some Love", "UR A CUTIE", "Treat Yourself"].includes(name)) {
          drop = "Vibes 1"
        }
        return {
          uri,
          drop,
        };
      })
    );

    const _userNFTsURI = _userNFTsURIS1.concat(_userNFTsURIS2);
    const userNFTsURI = _userNFTsURI.concat(_userNFTsURIVibes);

    // we filter to eliminate the doublons
    const userNFTs = userNFTsURI.filter((value: any, index: any) => {
      const _value = JSON.stringify(value);
      return (
        index ===
        userNFTsURI.findIndex((obj: any) => {
          return JSON.stringify(obj) === _value;
        })
      );
    });

    console.log("Got their Tiiinydenise NFTs!", userNFTs);

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
          <h1 className="font-bold text-4xl text-center">Tiiinydenise Drop</h1>
          <div className="text-center text-3xl font-bold">
            Track the Tiiinydenise DRiP NFTs you are missing
          </div>
          <div className="mt-8 sm:w-[70%] mx-auto">
            Tiiinydenise (aka Denise) is a graphic designer & 1/1 artist in
            Solana known for drawing tiny characters and putting them together
            in order to tell big stories (usually in the form of collage
            pieces). With her carefree art style, she aims to bring good vibes
            and positive energy in the web3 art space!
            <br />
            <br />
            Sign up{" "}
            <a
              target="_blank"
              rel="noreferrer"
              className="text-[#9945FF] font-bold"
              href={"https://drip.haus/tiiinydenise"}
            >
              here
            </a>{" "}
            to never miss a{" "}
            <a
              target="_blank"
              rel="noreferrer"
              className="text-[#9945FF] font-bold"
              href={"https://twitter.com/tiiinydenise"}
            >
              @tiiinydenise
            </a>{" "}
            DRiP drop.
            <div className="mt-4 flex text-xl">
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] underline font-bold mr-4"
                href={"https://exchange.art/tiiinydenise/nfts"}
              >
                Website
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] underline font-bold mr-4"
                href={"https://twitter.com/tiiinydenise"}
              >
                Twitter
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] underline font-bold mr-4"
                href={"https://www.instagram.com/tiiinydenise/"}
              >
                Instagram
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
                href="/tiiiny/drop1"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/XrqAEZBX5ITZDuy_N2BBWc94Hfc2HUNElK5o3FeZVjg?ext=png"
                    alt="drop 1 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 1</div>
              </Link>
              <Link
                href="/tiiiny/drop2"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/gy7yeDKSqFhnZrKjTFqt9tDiQewBjJTxmpUbbXLKt1U?ext=png"
                    alt="drop 2 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 2</div>
              </Link>
              <Link
                href="/tiiiny/drop3"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/I9HvAxiDnNK8sY12mLe-LMrZS6_i89l0BH8dg0IZNyE?ext=png"
                    alt="drop 3 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 3</div>
              </Link>
              <Link
                href="/tiiiny/drop4"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/2X5fiY71rbcuuuXbtXkzE4Hl5ZpIRMhoebF85N2wGiY?ext=png"
                    alt="drop 4 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 4</div>
              </Link>
              <Link
                href="/tiiiny/drop5"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/ff5xcBOs1Umqqgwk4IA8p66UiabqA8u4Ik3HGiRo_PE?ext=png"
                    alt="drop 5 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 5</div>
              </Link>
              <Link
                href="/tiiiny/drop6"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/6pe6SmEg3GCiKuai5OtmpqKFSPXZpRbWGP0B0STKPeQ?ext=png"
                    alt="drop 6 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 6</div>
              </Link>
              <Link
                href="/tiiiny/drop7"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/FZh1ts2JBEcR-tCPSwWsj8FOR-rigHhnjSgyhTXyX3M?ext=png"
                    alt="drop 7 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 7</div>
              </Link>
              <Link
                href="/tiiiny/drop8"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/76EDkSZdS5CfcuqIhZDAViQkZbRx9bp9dOMGJ6ZK3X8?ext=png"
                    alt="drop 8 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 8</div>
              </Link>
              <Link
                href="/tiiiny/drop9"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/fJ8mt0owTzy7dENd9nbU3xzg87STZWgPbpXUXrFBpnQ?ext=png"
                    alt="drop 9 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 9</div>
              </Link>
              <Link
                href="/tiiiny/drop10"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/a6UooGqDPnxG_F8q6zwj6raHAT8KoQPD58iXaTJoju8?ext=png"
                    alt="drop 10 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 10</div>
              </Link>
              <Link
                href="/tiiiny/drop11"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/l8nHiw7FvvqWY7ZQoXtthf1a3XFpKGEjTTkowGo01D4?ext=png"
                    alt="drop 11 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 11</div>
              </Link>
              <Link
                href="/tiiiny/drop12"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/MbJL2pTic5zeuVwvWli9FtMh-xTTeDYg05HZAl7AJHY?ext=png"
                    alt="drop 12 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 12</div>
              </Link>
              <Link
                href="/tiiiny/drop13"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/kvoFrVuekIqlzMMBesoIX_IbE-_VM4M7wV4IJ6N3yYM?ext=png"
                    alt="drop 13 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 13</div>
              </Link>
              <Link
                href="/tiiiny/drop14"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/pO2njf1IUubUbnhpoAOalUjdYKacGF-IGJNYPMkpCI4?ext=png"
                    alt="drop 14 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 14</div>
              </Link>
              <Link
                href="/tiiiny/drop15"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/ug764OZNJE4PB2jhdWvR2z42je0ny9ddtAmnabAzHY0?ext=png"
                    alt="drop 15 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 15</div>
              </Link>
              <Link
                href="/tiiiny/drop16"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/TFJ7vj2nWJOEIj8toIlMB9hO3t5rH0DE8OqfNQU6S5s?ext=png"
                    alt="drop 16 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 16</div>
              </Link>
              <Link
                href="/tiiiny/drop17"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/1D9kR3-pIT3pN9aMAEfgV0g1ii368vVnuWOttj364lg?ext=png"
                    alt="drop 17 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 17</div>
              </Link>
              <Link
                href="/tiiiny/drop18"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/-fmaV3yjlG3D7ohGXfr0biaWDBqn_ZFOjAmeHngSCcY?ext=png"
                    alt="drop 18 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 18</div>
              </Link>
              <Link
                href="/tiiiny/drop19"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/WpCCL4gfayqYMiCuwFmsh0Zr15YoGQjjWN3h3S-FDF8?ext=png"
                    alt="drop 19 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 19</div>
              </Link>
              <Link
                href="/tiiiny/drop20"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/D68yUxelA5eSTJQpAJfgBoheI3nO-zcmfmTsawERLqQ?ext=png"
                    alt="drop 20 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 20</div>
              </Link>
              <Link
                href="/tiiiny/drop1S2"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/Xh-JCzxtuUpvwm69knJUk4ATnQHvCm0w-fpyRUkOA2Y?ext=png"
                    alt="drop 1S2 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 1 S2</div>
              </Link>
              <Link
                href="/tiiiny/drop2S2"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/7UTiVNU8O6QQ9qve5HJazTlhpEqY3AKpHnFnFUoYEos?ext=png"
                    alt="drop 2S2 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 2 S2</div>
              </Link>
              <Link
                href="/tiiiny/drop3S2"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/BZSzIlH4H2_1fPztAVi6bRsYAz9l_HpHg00SOYBH3mw?ext=png"
                    alt="drop 3S2 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 3 S2</div>
              </Link>
              <Link
                href="/tiiiny/drop4S2"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/nhgk4njJWkCyJQ11x5QclFV4dR5gbneUTuC-S9J3HJ8?ext=png"
                    alt="drop 4S2 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 4 S2</div>
              </Link>
              <Link
                href="/tiiiny/drop5S2"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/oozuAioGcMzq5IcV6GO2t3e1xKlkpmCcXwA2dtweazU?ext=png"
                    alt="drop 5S2 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 5 S2</div>
              </Link>
              <Link
                href="/tiiiny/drop6S2"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/pjp9nQ4_m0iFjL6dSEsCuslx3Rf3SofBDhshEbM7nMs?ext=png"
                    alt="drop 6S2 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 6 S2</div>
              </Link>
              <Link
                href="/tiiiny/dropvibes1"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/R3HahfEW-CuofpUx4jxnBiMcnGB9IpTAbIQ09YKlYes?ext=png"
                    alt="drop preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop Vibes 1</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
