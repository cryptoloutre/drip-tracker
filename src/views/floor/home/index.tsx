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

export const FloorHome: FC = ({}) => {
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

    const allUserNFTs = await connection.getAssetsByOwner({
      ownerAddress: publickey.toBase58(),
    });

    const _userNFTs = allUserNFTs.items.filter(
      (asset) =>
        asset.compression.compressed &&
        asset.grouping[0] != undefined &&
        asset.grouping[0].group_value ==
          "FLRxZJb7Kpd5i9Q7WdH7r5uRqDL7oJVpqW3ew8FpE336"
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
          <h1 className="font-bold text-4xl text-center">Floor Drop</h1>
          <div className="text-center text-3xl font-bold">
            Track the Floor DRiP NFTs you are missing
          </div>
          <div className="mt-8 sm:w-[70%] mx-auto">
            Built for the web3 community - Floor aims to make NFTs simpler, and
            more accessible. <br /><br />
            Every week, Floor DRiP will be sharing some of the latest Solana NFT
            trends and content directly to your wallet. <br /><br />
            Floor app users have a higher probability of getting a Legendary
            Drip!
            <br /><br />
            Sign up{" "}
            <a
              target="_blank"
              rel="noreferrer"
              className="text-[#9945FF] font-bold"
              href={"https://drip.haus/floor"}
            >
              here
            </a>{" "}
            to never miss a{" "}
            <a
              target="_blank"
              rel="noreferrer"
              className="text-[#9945FF] font-bold"
              href={"https://twitter.com/floor"}
            >
              @floor
            </a>{" "}
            DRiP drop.
            <div className="mt-4 flex text-xl">
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] underline font-bold mr-4"
                href={"https://www.floornfts.io/invite-code/driphaus"}
              >
                Get Invite
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] underline font-bold mr-4"
                href={"https://www.floornfts.io/app-pass/guide"}
              >
                Download
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] underline font-bold"
                href={"https://twitter.com/floor"}
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
                href="/floor/drop1"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/xoTYzlnPGXrtEwz9sqWjvHWgsqR0oC7qITP-IABMWoU?ext=png"
                    alt="drop 1 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Week of 6.6.2023</div>
              </Link>
              <Link
                href="/floor/drop2"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/EUOm0NRguHP_t--ApwBwMYg5alJa7YRhI8uNiJ8U-BY?ext=png"
                    alt="drop 2 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Week of 6.13.2023</div>
              </Link>
              <Link
                href="/floor/drop3"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/QDhWzH4NuJntoPwpiOsGyM0g8skVZzwv-Dc5iDcR-bI?ext=png"
                    alt="drop 3 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Week of 6.20.2023</div>
              </Link>
              <Link
                href="/floor/drop4"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/FGD45DZ2XMZZQTHHoll5JXAxmzzEyv8fu74W5_7o49o?ext=png"
                    alt="drop 4 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Week of 6.27.2023</div>
              </Link>
              <Link
                href="/floor/drop5"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/_MAo00nvVbhO7LKEoSA9JjEJingsPBzlnMeQseColaA?ext=jpg"
                    alt="drop 5 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Week of 7.4.2023</div>
              </Link>
              <Link
                href="/floor/drop6"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/PFn5JPl6JqzK9KZ43OfKr7UjGi2brg_RAJhsburxPq4?ext=jpg"
                    alt="drop 6 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Week of 7.11.2023</div>
              </Link>
              <Link
                href="/floor/drop7"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/OJiA03CSinzy6CoJjkPaWx6n3BhdeBndQrbjlK6fX4g?ext=jpg"
                    alt="drop 7 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Week of 7.18.2023</div>
              </Link>
              <Link
                href="/floor/drop8"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/_ayY4K_0jmRM38zufNWhwk-SVM73RsSVJtyR8n93HwU?ext=jpg"
                    alt="drop 8 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Week of 7.25.2023</div>
              </Link>
              <Link
                href="/floor/drop9"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/iPu_gd5sLR62vNjebqHV6WBIjGuFEH8QUWS-iJIj7VI?ext=jpg"
                    alt="drop 9 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Week of 8.1.2023</div>
              </Link>
              <Link
                href="/floor/drop10"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/LDTr4YgDfn6-6ojqzqFG2K2B4Vfgqn2aC1dhU_z0oKA?ext=jpg"
                    alt="drop 10 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Week of 8.8.2023</div>
              </Link>
              <Link
                href="/floor/drop11"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/mRs7vPigKYS6Y4J2oyQ7KCba_KKq9n-VefksTgGZcWA?ext=jpg"
                    alt="drop 11 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Week of 8.15.2023</div>
              </Link>
              <Link
                href="/floor/drop12"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/5AWBM2Vwk7QfvFqe0d_V1MC6KO7pl3R_3qIrPp08zjo?ext=jpg"
                    alt="drop 12 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Week of 8.22.2023</div>
              </Link>
              <Link
                href="/floor/drop13"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/oTd8cbIOxKvyLp0ucCPPMd_bHbp9LfR9zSfAXAqmOHI?ext=jpg"
                    alt="drop 13 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Week of 8.29.2023</div>
              </Link>
              <Link
                href="/floor/drop14"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/XtX5WuvVJuZ8VbJrembhHcjFTjnN0_QZuT55A55j1UI?ext=jpg"
                    alt="drop 14 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Week of 9.5.2023</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
