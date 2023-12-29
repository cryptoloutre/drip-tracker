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

export const MaquinHome: FC = ({}) => {
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
          "MAQNiWAYh5yGCQKeWFzHLypThEjfTJfBQxwiF8P5Vax"
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
        const drop = attributes.find((nft) => nft.trait_type == "Drop").value;
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
          <h1 className="font-bold text-4xl text-center">Maquin Drop</h1>
          <div className="text-center text-3xl font-bold">
            Track the Maquin NFTs you are missing
          </div>
          <div className="mt-8 sm:w-[70%] mx-auto">
            Embark on a Miniature Journey: Explore Microscopic Art Every Week
            with Maquin! <br />
            <br />
            <a
              target="_blank"
              rel="noreferrer"
              className="text-[#9945FF] font-bold"
              href={"https://twitter.com/maquinNFT"}
            >
              Maquin
            </a>{" "}
            is an artist on Solana specializing in the art of microscopic
            creations. He skillfully utilizes a diverse array of techniques,
            including engraving, collage, drawing, painting, and digital
            recoloring, to craft tiny pieces that hold hidden complexities.
            These intricacies are beautifully unraveled when the creations are
            magnified under the lens of a microscope.
            <br />
            <br />
            Sign up{" "}
            <a
              target="_blank"
              rel="noreferrer"
              className="text-[#9945FF] font-bold"
              href={"https://drip.haus/maquin"}
            >
              here
            </a>{" "}
            to never miss a{" "}
            <a
              target="_blank"
              rel="noreferrer"
              className="text-[#9945FF] font-bold"
              href={"https://twitter.com/maquinNFT"}
            >
              Maquin
            </a>{" "}
            DRiP drop.
            <div className="mt-4 flex text-xl">
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] underline font-bold mr-4"
                href={"https://twitter.com/maquinNFT"}
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
                href="/maquin/drop1"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/zAhUc8w6kQUDEa8KKGlECUYpdFCIBCh-nlvLcDtJHNg?ext=jpeg"
                    alt="drop 1 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 1</div>
              </Link>
              <Link
                href="/maquin/drop2"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/hz1WE_PEw00ccx09-6m65nOgfrvIKTa9xuuMRxz2AVw?ext=jpg"
                    alt="drop 2 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 2</div>
              </Link>
              <Link
                href="/maquin/drop3"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/GldmbaMcz2FOhuob5rx2ZtWz3MbRF3DVZSDCqd9vb3Y?ext=jpg"
                    alt="drop 3 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 3</div>
              </Link>
              <Link
                href="/maquin/drop4"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/t9op1VSL1tCzkqmPbnfKWf-JuUXURnnRnUtIb8iAqlc?ext=jpg"
                    alt="drop 4 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 4</div>
              </Link>
              <Link
                href="/maquin/drop5"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/EVyaz3sz3aFRBP72yjvks0wOGYEDIDupUMVMoKewioA?ext=jpg"
                    alt="drop 5 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 5</div>
              </Link>
              <Link
                href="/maquin/drop6"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/Sn6VnDqaxJCqWEQJrPjQd2TsmO8DW6Pjy5ZabaKqmmQ?ext=jpg"
                    alt="drop 6 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 6</div>
              </Link>
              <Link
                href="/maquin/drop7"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/KuhSgZ_2n1iRFayv8vt-bqORShSV0hmwih2gxSUgHQ4?ext=jpg"
                    alt="drop 7 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 7</div>
              </Link>
              <Link
                href="/maquin/drop8"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/4-2hlh1SwmGX8m9Qf4IQHN8WUCd3jU6cuyq11FUPuTg?ext=jpg"
                    alt="drop 8 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 8</div>
              </Link>
              <Link
                href="/maquin/drop9"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/RmEXyWuMUWVbIsI_8lRkeTzHAMLj-O0MYF01gQ3--q0?ext=jpg"
                    alt="drop 9 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 9</div>
              </Link>
              <Link
                href="/maquin/drop10"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/ZiuetcQiVrKxxvr0aHsqURPqbQ3mENzvk3VEKhBNiEQ?ext=jpg"
                    alt="drop 10 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 10</div>
              </Link>
              <Link
                href="/maquin/drop11"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/PH6v6UkwVCJN1lHTZ9ON5-Nmk1iR88CMj8OLuSmz4YA?ext=jpg"
                    alt="drop 11 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 11</div>
              </Link>
              <Link
                href="/maquin/drop12"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/Bi2YqNxQ95G48dWk-2RLoLmhCD0ZDm-jxLia6nFs9ZY?ext=jpg"
                    alt="drop 12 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 12</div>
              </Link>
              <Link
                href="/maquin/drop13"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/iYhuEK_MbQAcRjYVMVPN6NYh8OJJ9MtR-w9oUcUOQo4?ext=jpg"
                    alt="drop 13 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 13</div>
              </Link>
              <Link
                href="/maquin/drop14"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/uLbiVlq-0ee4cZgzAlghdwq6qRRV0NkfNViLkNL6Dd8?ext=jpg"
                    alt="drop 14 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 14</div>
              </Link>
              <Link
                href="/maquin/drop15"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/q0kczEU8kyc7s6XiIHf4oUrBZFyNrEiCT1L_o6mfp0k?ext=jpg"
                    alt="drop 15 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 15</div>
              </Link>
              <Link
                href="/maquin/drop16"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/x344jUEGIQFkMhAg-sPSysvk3KhfK7e_GXmBZw7tquY?ext=jpg"
                    alt="drop 16 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 16</div>
              </Link>
              <Link
                href="/maquin/drop17"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/KiEDYs114mp-M1MmB1Jf1e4HcDva1fBpzDFCOgrBRf0?ext=jpg"
                    alt="drop 17 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 17</div>
              </Link>
              <Link
                href="/maquin/drop18"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/uXLFWGu5C3fPgZbsVDXIJtCLty1_8zbFwu-d1DOSd20?ext=jpg"
                    alt="drop 18 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 18</div>
              </Link>
              <Link
                href="/maquin/drop19"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/OsYRvAycVebpPK6pX61xRuzsVh_nXDBxqOHtyuqyQWI?ext=jpg"
                    alt="drop 19 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 19</div>
              </Link>
              <Link
                href="/maquin/drop20"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/plIo5DD3ysdCGkofkhpIoMLnuzgEafR3N0cDK5EjK9c?ext=jpg"
                    alt="drop 20 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 20</div>
              </Link>
              <Link
                href="/maquin/drop21"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/OwCnT20HyCwUnnPE_mI6URFts-BRRdKoQ1FtBV3fE3k?ext=jpg"
                    alt="drop 21 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 21</div>
              </Link>
              <Link
                href="/maquin/drop22"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/Mvu8-UsE3gdHGQ6qZtpO41f0lndB_hxgg45E9SaFggI?ext=jpg"
                    alt="drop 22 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 22</div>
              </Link>
              <Link
                href="/maquin/drop23"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/Lf7GGyOzZUzZeKGt_AShM7lvlMuCnM-pawLyUdAn9yM?ext=jpg"
                    alt="drop 23 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 23</div>
              </Link>
              <Link
                href="/maquin/drop24"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/xW0HUSzXvsKAuRL2SfwnrlJdtyFXohWYR9j-gxAm668?ext=jpeg"
                    alt="drop 24 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 24</div>
              </Link>
              <Link
                href="/maquin/drop25"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/ShoPGgYnSpr7skEWiMy89nqvb_hSjua5gYLOEsm_x8I?ext=jpg"
                    alt="drop 25 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 25</div>
              </Link>
              <Link
                href="/maquin/drop26"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/HR77-WEZ2G0RRIidTD53Da1F7P1YpvSTDxcGXK_r_B4?ext=jpg"
                    alt="drop 26 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 26</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
