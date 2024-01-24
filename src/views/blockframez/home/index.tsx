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

export const BlockframezHome: FC = ({}) => {
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

    const userNFTsBlockframez = allUserNFTs.filter(
      (asset) =>
        asset.compression.compressed &&
        asset.grouping[0] != undefined &&
        asset.grouping[0].group_value ==
          "BLKDQXqcvpPabVjaAsWbW91f5BVFuAffbCAXemYiZdCJ"
    );

    const userNFTsUri = await Promise.all(
      userNFTsBlockframez.map(async (asset) => {
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
        if (drop) {
          drop = drop.value;
        }
        else {
          drop = attributes.find((nft) => nft.trait_type == "Chapter").value;
        }
        return {
          uri,
          drop,
        };
      })
    );

    // we filter to eliminate the doublons
    const userNFTs = userNFTsUri.filter((value: any, index: any) => {
      const _value = JSON.stringify(value);
      return (
        index ===
        userNFTsUri.findIndex((obj: any) => {
          return JSON.stringify(obj) === _value;
        })
      );
    });

    console.log("Got their floor NFTs!", userNFTs);

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
          <h1 className="font-bold text-4xl text-center">Blockframez Drop</h1>
          <div className="text-center text-3xl font-bold">
            Track the Blockframez DRiP NFTs you are missing
          </div>
          <div className="mt-8 sm:w-[70%] mx-auto">
            California-based Blockframez is a member of URS and a professional
            OG photographer + filmmaker on Solana with an eye for urban
            textures. An IRL music composer for tv and video games. A true
            multi-disciplinary artist with over a decade of experience in the
            entertainment industry.
            <br />
            Sign up{" "}
            <a
              target="_blank"
              rel="noreferrer"
              className="text-[#9945FF] font-bold"
              href={"https://drip.haus/blockframez"}
            >
              here
            </a>{" "}
            to never miss a{" "}
            <a
              target="_blank"
              rel="noreferrer"
              className="text-[#9945FF] font-bold"
              href={"https://twitter.com/blockframez"}
            >
              Blockframez
            </a>{" "}
            DRiP drop.
            <div className="mt-4 flex text-xl">
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] underline font-bold mx-2"
                href={"https://www.blockframez.com/"}
              >
                Website
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] underline font-boldm x-2"
                href={"https://twitter.com/blockframez"}
              >
                Twitter
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] underline font-bold mx-2"
                href={"https://www.instagram.com/blockframez"}
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
                href="/blockframez/drop1"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/wPaZkXa7ivAZJKNJuJfU3NLPpT89cNAIjUrKPHwcBfY?ext=png"
                    alt="drop 1 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 1</div>
              </Link>
              <Link
                href="/blockframez/drop2"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/XUGDkJ3K9QVgD7wOFLAjsAY7PQHEHQgppyuN8byOXsI?ext=png"
                    alt="drop 2 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 2</div>
              </Link>
              <Link
                href="/blockframez/drop3"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/2NTHrTwH_3iusylwZ52Hk2Cjep-E6p6yWM_livMZtVI?ext=png"
                    alt="drop 3 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 3</div>
              </Link>
              <Link
                href="/blockframez/drop4"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/8iSV6BydcjutWMvtMY9bWSQZ9piKNPosTr2TKe-zy4M?ext=png"
                    alt="drop 4 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 4</div>
              </Link>
              <Link
                href="/blockframez/drop5"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/qnl2Ve6LdSXd5bllZ4fhysYZZrqD4EaM17qrf-gkPo0?ext=png"
                    alt="drop 5 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 5</div>
              </Link>
              <Link
                href="/blockframez/drop6"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/eY9BSn6lq9yoTgj6L_mKpgEXrtDS5s3PALk2qu3LJDs?ext=png"
                    alt="drop 6 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 6</div>
              </Link>
              <Link
                href="/blockframez/drop7"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/uxj92QnZng8uzZVeQW9J5yhF9b0jTuHJxujZCQwwI34?ext=png"
                    alt="drop 7 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 7</div>
              </Link>
              <Link
                href="/blockframez/drop8"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/nNyfSOK82ZhZecZYiUE4BcUWV9n0mnDL0jfewlmBbyc?ext=png"
                    alt="drop 8 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 8</div>
              </Link>
              <Link
                href="/blockframez/drop9"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/0EQruFuEodBuZEGmOiDTbW_5CC6ZiQTCz8VfEI7kG5E?ext=png"
                    alt="drop 9 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 9</div>
              </Link>
              <Link
                href="/blockframez/drop10"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/Y8Z0RQcI9VRTViIRUAtxyA3ZZCdTDnk1Kke4dJ-f0Mk?ext=png"
                    alt="drop 10 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 10</div>
              </Link>
              <Link
                href="/blockframez/drop11"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/EkwHkQxOE3SSeUq-Gs9U1utRlRahvtpqKfWOE4xeJ08?ext=png"
                    alt="drop 11 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 11</div>
              </Link>
              <Link
                href="/blockframez/drop12"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/UmuHMWPUas-9Ah2gre97WIwcc-2YcZBZYTo2pHuY4nE?ext=png"
                    alt="drop 12 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 12</div>
              </Link>
              <Link
                href="/blockframez/drop13"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/cRZPBFAGR-0P8VSmr0G1lh1Gp0mK7DgrxFFMcQkMbgw?ext=png"
                    alt="drop 13 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 13</div>
              </Link>
              <Link
                href="/blockframez/drop14"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/VylTZ7NlNG-j1pI_DJJScrj4NeyvzNL311FwYdyd6kw?ext=png"
                    alt="drop 14 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 14</div>
              </Link>
              <Link
                href="/blockframez/drop15"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/GoElfxc8a5cGi2TO-H6jFSo32xFY1HKPFYUk8DHRDfc?ext=png"
                    alt="drop 15 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 15</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
