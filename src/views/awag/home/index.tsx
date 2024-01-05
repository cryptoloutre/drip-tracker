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

export const AwagHome: FC = ({}) => {
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
          "AWAGxSixyio2swX1tt872x1mxr6Zw7vknz9dxFxeuz7U"
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
        const drop =
          attributes.find((nft) => nft.trait_type == "DROP") != undefined
            ? attributes.find((nft) => nft.trait_type == "DROP").value
            : attributes.find((nft) => nft.trait_type == "Drop").value;
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
          <h1 className="font-bold text-4xl text-center">AWAG Drop</h1>
          <div className="text-center text-3xl font-bold">
            Track the AWAG NFTs you are missing
          </div>
          <div className="mt-8 sm:w-[70%] mx-auto">
            “DIGITAL ART” FROM - AWAG / 2023
            <br />
            <br />
            Sign up{" "}
            <a
              target="_blank"
              rel="noreferrer"
              className="text-[#9945FF] font-bold"
              href={"https://drip.haus/awag"}
            >
              here
            </a>{" "}
            to never miss a{" "}
            <a
              target="_blank"
              rel="noreferrer"
              className="text-[#9945FF] font-bold"
              href={"https://twitter.com/aintweallgods"}
            >
              AWAG
            </a>{" "}
            DRiP drop.
            <div className="mt-4 flex text-xl">
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] underline font-bold mr-4"
                href={"https://exchange.art/aintweallgods"}
              >
                Website
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] underline font-bold mr-4"
                href={"https://twitter.com/aintweallgods"}
              >
                Twitter
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] underline font-bold mr-4"
                href={"https://www.instagram.com/aintweallgods"}
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
                href="/awag/drop1"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/016xI55C-TfwJFdpgX4d-nPqozdDXISy77ZFYlaQZRg?ext=jpg"
                    alt="drop 1 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 1</div>
              </Link>
              <Link
                href="/awag/dropRedacted"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/lp0hDtwZKQxiIZMEIecDE4_6Utshh7zc3tmeK420MUI?ext=GIF"
                    alt="drop Redacted preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop Redacted</div>
              </Link>
              <Link
                href="/awag/drop2"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/RBEM52BmB5vNd6-h24lC7XpI_DieA1cRQo15LCZdfdA?ext=jpg"
                    alt="drop 2 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 2</div>
              </Link>
              <Link
                href="/awag/drop3"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/E_rF0Y42SUmk8GO9SxMNtQR3twdLkDdGKKhWy1gC7to?ext=jpg"
                    alt="drop 3 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 3</div>
              </Link>
              <Link
                href="/awag/drop4"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/YLJ94Lf11t4ur8SY-KHq1VnqCZ2dRtFtyCN-OzmzH5A?ext=jpg"
                    alt="drop 4 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 4</div>
              </Link>
              <Link
                href="/awag/drop5"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/7CUhipl7iwBth5XXrbdz0mzf627-uS8XZBfS9nRVOhA?ext=jpg"
                    alt="drop 5 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 5</div>
              </Link>
              <Link
                href="/awag/drop6"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/R69-92HFv7y2ziIJAQvDpx2yq0x3o1ulyAxxBUkVUNY?ext=jpg"
                    alt="drop 6 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 6</div>
              </Link>
              <Link
                href="/awag/drop7"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/IWhjtCZye5NY4DNZ0zxm_a33Lz5O3RWwyPoNGy2NJAo?ext=jpg"
                    alt="drop 7 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 7</div>
              </Link>
              <Link
                href="/awag/drop8"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/I5AFfFGzm-VVVHMD4rTA0dD8c4J9OLpirYRZe-KVctI?ext=jpg"
                    alt="drop 8 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 8</div>
              </Link>
              <Link
                href="/awag/drop9"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/QGUJokhu36pRM8cyQDNk91KougjTJGL1uFXWM7jPnBY?ext=jpg"
                    alt="drop 9 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 9</div>
              </Link>
              <Link
                href="/awag/drop10"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/t1s-hck0cGUTc5SsFqEdrxU_3HAbobZV5g1jgkzFZmc?ext=jpg"
                    alt="drop 10 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 10</div>
              </Link>
              <Link
                href="/awag/drop11"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/kHoBX8tHUglmn0GbGUd80b6GUENzdB_MvkpWp7vqM8c?ext=jpg"
                    alt="drop 11 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 11</div>
              </Link>
              <Link
                href="/awag/drop12"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/FyduiflaAc7-ZU2eOhOSk4TES1NwzN4rws9LFddw_qA?ext=JPG"
                    alt="drop 12 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 12</div>
              </Link>
              <Link
                href="/awag/drop13"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/dHAxOQ1aYdaTxtJUjUCLXcdkAD_o_KHDA1ixksKS4Go?ext=jpg"
                    alt="drop 13 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 13</div>
              </Link>
              <Link
                href="/awag/drop14"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/obmEJkEWtHrtLWjN1IARQXLgwW7vRLlNcSXqL79yArE?ext=jpg"
                    alt="drop 14 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 14</div>
              </Link>
              <Link
                href="/awag/drop15"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/3DDZY7r3oVOwzvVmnKOzO7zXdNe-X-HSxDApeCbrALw?ext=gif"
                    alt="drop 15 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 15</div>
              </Link>
              <Link
                href="/awag/drop16"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/pBy0-6eFZB1n1a6u_D3dyEGQTKskh5vZN1GMuj8nqbs?ext=gif"
                    alt="drop 16 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 16</div>
              </Link>
              <Link
                href="/awag/drop17"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/FxPhHY7tFTlatnUXBn07GXFGvQ5LlypCioz4BiAH_yE?ext=jpg"
                    alt="drop 17 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 17</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
