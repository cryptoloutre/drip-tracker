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

export const DegenHome: FC = ({}) => {
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
          "DGPTxgKaBPJv3Ng7dc9AFDpX6E7kgUMZEgyTm3VGWPW6"
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
        const drop = attributes.find((nft) => nft.trait_type == "drop").value;
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
          <h1 className="font-bold text-4xl text-center">Degen Poet Drop</h1>
          <div className="text-center text-3xl font-bold">
            Track the Degen Poet DRiP NFTs you are missing
          </div>
          <div className="mt-8 sm:w-[70%] mx-auto">
            <a
              target="_blank"
              rel="noreferrer"
              className="text-[#9945FF] font-bold"
              href={"https://twitter.com/degenpoet"}
            >
              Degen Poet
            </a>{" "}
            is a Typewriter NFT artist based on Solana. Degen Poet creates NFTs
            on the Solana blockchain by physically typing images on a vintage
            typewriter and then scanning them. <br />
            To enhance the typewriter work, Degen Poet uses a variety of
            techniques, including watercolor, pen, permanent marker, collage,
            and animation. <br/>Sign up{" "}
            <a
              target="_blank"
              rel="noreferrer"
              className="text-[#9945FF] font-bold"
              href={"https://drip.haus/degenpoet"}
            >
              here
            </a>{" "}
            to never miss a{" "}
            <a
              target="_blank"
              rel="noreferrer"
              className="text-[#9945FF] font-bold"
              href={"https://twitter.com/degenpoet"}
            >
              @degenpoet
            </a>{" "}
            DRiP drop.
            <div className="mt-4 flex text-xl">
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] underline font-bold mr-4"
                href={"https://www.instagram.com/squarespace/"}
              >
                Instagram
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] underline font-bold"
                href={"https://twitter.com/degenpoet"}
              >
                Twitter
              </a>
            </div>
            <div className="flex justify-center">
              <a
                href="https://drip.haus/degenpoet"
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
                href="/degenpoet/drop1"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/LHLqrmVwy3XocG3QpYGk1Vkg4XvB_Tape2UGx5eYqoM?ext=jpg"
                    alt="drop 1 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 1</div>
              </Link>
              <Link
                href="/degenpoet/drop2"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/HUwnz831lJeTAub2N9XHfz7NyTOG7o2-P99hZzArpj0?ext=png"
                    alt="drop 2 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 2</div>
              </Link>
              <Link
                href="/degenpoet/drop3"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/ajGN6m7znkSAr9CBr2VoYTzyaqa8_QJpF8oKq-gJo0Y?ext=jpg"
                    alt="drop 3 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 3</div>
              </Link>
              <Link
                href="/degenpoet/drop4"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/5PgWehZpDsehu_9O0HwtaUNGdl2K8ZMX1ZbLOESfuEM?ext=gif"
                    alt="drop 4 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 4</div>
              </Link>
              <Link
                href="/degenpoet/drop5"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://cdn.helius.services/cdn-cgi/image//https://arweave.net/IN8v-gRKL8o2keJA_hZ3_sgYITdiZjddH6wNHjipku0?ext=jpg"
                    alt="drop 5 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 5</div>
              </Link>
              <Link
                href="/degenpoet/drop6"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/MKWCddkRDMxamYBIsEvj5SEETgID4SB1RXQyo50xloU?ext=gif"
                    alt="drop 6 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 6</div>
              </Link>
              <Link
                href="/degenpoet/drop7"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/ElEngGVx2cn40XKk5ZMUkyX2rI3Po33iWj3Oyd48NV8?ext=gif"
                    alt="drop 7 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 7</div>
              </Link>
              <Link
                href="/degenpoet/drop8"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/KK_Fu3oRPTo4EOZYbXdSfA4r4nXQxLVK2XXRm_aOvtA?ext=gif"
                    alt="drop 8 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 8</div>
              </Link>
              <Link
                href="/degenpoet/drop9"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/sFEWQ1xCBzD2SCNx2s6lXd5YW1qEqnefUquWPq0Xy1I?ext=gif"
                    alt="drop 9 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 9</div>
              </Link>
              <Link
                href="/degenpoet/drop10"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/ABK_8lcRKi2510FymPN3kHe52oBKTd2Ux5VYyMCWLPM?ext=gif"
                    alt="drop 10 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 10</div>
              </Link>
              <Link
                href="/degenpoet/drop11"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/EPszf-omgPBeVKcKtlP0OrIDms7liTv-MPAkdCSQilw?ext=gif"
                    alt="drop 11 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 11</div>
              </Link>
              <Link
                href="/degenpoet/drop12"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/kzH-BEJcdM8gO-R6JI2QhiyYWpELEkVVNL8D8OaII5s?ext=gif"
                    alt="drop 12 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 12</div>
              </Link>
              <Link
                href="/degenpoet/drop13"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/VDGYVfvCl-ARU1RdPyu9BbSbn3sSeohP0JA432SOnEw?ext=jpg"
                    alt="drop 13 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 13</div>
              </Link>
              <Link
                href="/degenpoet/drop14"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/qxFbIk1TUWTE6rmb0hjrmadUIqNURQg_EwUAN_9iuo0?ext=jpg"
                    alt="drop 14 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 14</div>
              </Link>
              <Link
                href="/degenpoet/drop15"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/CAV372m6c2bgO5fa4q-VIt6z5cuIFtCcg9tAaMT-NNs?ext=jpg"
                    alt="drop 15 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 15</div>
              </Link>
              <Link
                href="/degenpoet/drop16"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/Jef88_6QLjZ646ysEF1rqMFnpCsIYMto0DAn2yEoHfI?ext=jpg"
                    alt="drop 16 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 16</div>
              </Link>
              <Link
                href="/degenpoet/drop17"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/bwrTzGDiNzLsNWYNJL5iWpe4O8GhSNoaY4OoNkK9FEE?ext=jpg"
                    alt="drop 17 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 17</div>
              </Link>
              <Link
                href="/degenpoet/drop18"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/QgX1JFxQzSIqo7YTleAIySoNLW0olDvQ0Nal97WpF0E?ext=gif"
                    alt="drop 18 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 18</div>
              </Link>
              <Link
                href="/degenpoet/drop19"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/iolmoPY6QdbaAyw5vs_Z3qIjYNi91U6WJoXaSer0zfY?ext=jpg"
                    alt="drop 19 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 19</div>
              </Link>
              <Link
                href="/degenpoet/drop20"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/67DvvbbDgo976C8GxdoLJ8c8AVOX9hfUK22o4ghd6aw?ext=gif"
                    alt="drop 20 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 20</div>
              </Link>
              <Link
                href="/degenpoet/drop21"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/oU853oc62Kw89TfM6ZVq4maL4J2uaCLI2W5NTSDn41E?ext=gif"
                    alt="drop 21 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 21</div>
              </Link>
              <Link
                href="/degenpoet/drop22"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/8tVVvEuJkF_wWNw48FSUSvSgVe2MyGoclhAUVUSHXbI?ext=gif"
                    alt="drop 22 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 22</div>
              </Link>
              <Link
                href="/degenpoet/drop23"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/XNPoPt4FiWai93MZz3Men0iYAoZkLwfvU0J399Ezbkk?ext=gif"
                    alt="drop 23 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 23</div>
              </Link>
              <Link
                href="/degenpoet/drop24"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/lKmhyMtZ5K75EJul23zlEZmeR6XsRaNT6RiRvHnglzM?ext=jpg"
                    alt="drop 24 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 24</div>
              </Link>
              <Link
                href="/degenpoet/drop25"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/YJ1jZj2R42GQRFavioCTe1BH8cJK8f_H_3gOfgmq9-M?ext=jpg"
                    alt="drop 25 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 25</div>
              </Link>
              <Link
                href="/degenpoet/drop26"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/E15gz5PXeIrPlMZsJScFA_8kCV0-4bavHIGDJNa0iFc?ext=jpg"
                    alt="drop 26 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 26</div>
              </Link>
              <Link
                href="/degenpoet/drop27"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/DFlbLAHf3vYKGbRz9TU9loA2vmnAn0LZ0drchNS8oCM?ext=jpg"
                    alt="drop 27 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 27</div>
              </Link>
              <Link
                href="/degenpoet/drop28"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/ldCVrYa-HS43JFzMoFkXngucxdyjShj9dJxtYRf6KNA?ext=jpg"
                    alt="drop 28 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 28</div>
              </Link>
              <Link
                href="/degenpoet/drop29"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/5b_p7qN5w_ogTzdT1luPxqJ0CfYCXwiy9d3tN70SyVU?ext=jpg"
                    alt="drop 29 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 29</div>
              </Link>
              <Link
                href="/degenpoet/drop30"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/tNAYOlZrNZO_mmkAkJ_QqDKh-2cQjx1YWTt5dJN3VZw?ext=jpg"
                    alt="drop 30 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 30</div>
              </Link>
              <Link
                href="/degenpoet/drop31"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/cAWBypvjfJ8hKdsecl_1j5oi_6XXb9IASYunT3AC2IM?ext=gif"
                    alt="drop 31 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 31</div>
              </Link>
              <Link
                href="/degenpoet/drop32"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/8mTjkix3Uz8TFaNtOxCOHMjQ-eXxl0Lqqf2Olc0QSZg?ext=jpg"
                    alt="drop 32 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 32</div>
              </Link>
              <Link
                href="/degenpoet/drop33"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/FGwCaeiIeonZwD1L0amW-LnmCIdcyT-JxX8Gx9pL_cI?ext=jpg"
                    alt="drop 33 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 33</div>
              </Link>
              <Link
                href="/degenpoet/drop34"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/wVWlsLPN38G61UJrYhwnilYm54dZvOE45ppfShAK9iQ?ext=jpg"
                    alt="drop 34 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 34</div>
              </Link>
              <Link
                href="/degenpoet/drop35"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/61R3vG-mFsR1uP7SdTrW7dozqozpYCwbpsZGflnI5dg?ext=jpg"
                    alt="drop 35 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 35</div>
              </Link>
              <Link
                href="/degenpoet/drop36"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/3o9Qe0jD0Ur9Q4aNQHWMs7n1avd29KoWyN14aYBAFe0?ext=jpg"
                    alt="drop 36 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 36</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
