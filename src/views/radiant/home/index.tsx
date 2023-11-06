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

export const RadiantHome: FC = ({}) => {
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

    const _userNFTsGenesis = allUserNFTs.filter(
      (asset) =>
        asset.compression.compressed &&
        asset.grouping[0] != undefined &&
        asset.grouping[0].group_value ==
          "RDNTmiKRLE2W4aRbd1Xw6sX9bZTgnPUhX3hH2Cov6sY"
    );

    const _userNFTsURIGenesis = await Promise.all(
      _userNFTsGenesis.map(async (asset) => {
        let attributes: any;
        const uri = asset.content.json_uri;
        if (asset.content.metadata.attributes) {
          attributes = asset.content.metadata.attributes;
        } else {
          const response = await fetch(uri);
          const responseData = await response.json();
          attributes = responseData.attributes;
        }
        let drop: string;
        const _drop = attributes.find((nft) => nft.trait_type == "Drop").value;
        if (_drop == "Genesis") {
          drop = _drop;
        } else if (_drop == "2") {
          drop = "4";
        } else if (_drop == "3") {
          drop = "8";
        }
        return {
          uri,
          drop,
        };
      })
    );

    const _userNFTsCelestial = allUserNFTs.filter(
      (asset) =>
        asset.compression.compressed &&
        asset.grouping[0] != undefined &&
        asset.grouping[0].group_value ==
          "RTCSTqZ9FrnZ3wbwPRYzzHLwH8zukU4Dyq3HeAdqPWV"
    );

    const _userNFTsURICelestial = await Promise.all(
      _userNFTsCelestial.map(async (asset) => {
        let attributes: any;
        const uri = asset.content.json_uri;
        if (asset.content.metadata.attributes) {
          attributes = asset.content.metadata.attributes;
        } else {
          const response = await fetch(uri);
          const responseData = await response.json();
          attributes = responseData.attributes;
        }
        const _drop = attributes.find((nft) => nft.trait_type == "Drop").value;
        const drop = ["1", "2"].find((dropNumber) => dropNumber == _drop)
          ? (Number(_drop) + 1).toString()
          : (Number(_drop) + 2).toString();
        return {
          uri,
          drop,
        };
      })
    );

    const _userNFTsURI = _userNFTsURIGenesis.concat(_userNFTsURICelestial);

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

    console.log("Got their DAA NFTs!", userNFTs);

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
          <h1 className="font-bold text-4xl text-center">Radiant Drop</h1>
          <div className="text-center text-3xl font-bold">
            Track the Radiant NFTs you are missing
          </div>
          <div className="mt-8 sm:w-[70%] mx-auto">
            Rayaan is a landscape, astro and sport photographer. Rayaan is based
            in New Zealand, where he has the opportunity to capture unique
            photos.
            <br />
            <br />
            Sign up{" "}
            <a
              target="_blank"
              rel="noreferrer"
              className="text-[#9945FF] font-bold"
              href={"https://drip.haus/radiant"}
            >
              here
            </a>{" "}
            to never miss a{" "}
            <a
              target="_blank"
              rel="noreferrer"
              className="text-[#9945FF] font-bold"
              href={"https://twitter.com/Front4th"}
            >
              Radiant
            </a>{" "}
            DRiP drop.
            <div className="mt-4 flex text-xl">
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] underline font-bold mr-4"
                href={"https://rayaanrajabally.com/"}
              >
                Website
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] underline font-bold mr-4"
                href={"https://twitter.com/Front4th"}
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
                href="/radiant/drop1"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/lYQXr9uOSPoApjiZmyL5wq_1ImZUc2ptzR0Ecc1qH1E?ext=jpg"
                    alt="drop 1 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">
                  Drop Genesis
                </div>
              </Link>
              <Link
                href="/radiant/drop2"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/kpFEiGu59hyV1QqLGpyAIiVhVy8YR0b3l3HBP2cwL3Q?ext=png"
                    alt="drop 2 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 2</div>
              </Link>
              <Link
                href="/radiant/drop3"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/iM0UO_ToIX6Q3V9RcOmLCrD-xOvuK6DQ3-OmMUGWdtg?ext=png"
                    alt="drop 3 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 3</div>
              </Link>
              <Link
                href="/radiant/drop4"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/6xsz1QN5UWmOtxfJIW2MUl87paf2KOW6Js4DkNjlh24?ext=png"
                    alt="drop 4 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 4</div>
              </Link>
              <Link
                href="/radiant/drop5"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/o-5hLFgYV2C7E_pg2PbdXEsTmMoPP_FCozhf_6iiSys?ext=png"
                    alt="drop 5 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 5</div>
              </Link>
              <Link
                href="/radiant/drop6"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/wBH7-LetkR1goRBOGTToWpqV1LgUHoJIt94B0fGvt6s?ext=png"
                    alt="drop 6 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 6</div>
              </Link>
              <Link
                href="/radiant/drop7"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/MSOQ57uGcPTCLKAs6Yv7dQ6ExPtGt51kEBOJKpu2fOw?ext=png"
                    alt="drop 7 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 7</div>
              </Link>
              <Link
                href="/radiant/drop8"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/XJAPml44hA368kLEnKYw-BiZAKVPkcTAjPaWDWqNt-0?ext=png"
                    alt="drop 8 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 8</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
