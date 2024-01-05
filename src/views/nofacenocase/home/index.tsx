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

export const NFNCHome: FC = ({}) => {
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
          "NfNcsoekvshD5eXiyqgs5rC9Ak7zAfb6ngiJrDXCFea"
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

    console.log("Got their NFTs!", _userNFTs);

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
          <h1 className="font-bold text-4xl text-center">
            No Face-No Case Drop
          </h1>
          <div className="text-center text-3xl font-bold">
            Track the No Face-No Case NFTs you are missing
          </div>
          <div className="mt-8 sm:w-[70%] mx-auto">
            Over time the No Face No Case legend grows, inspiring future
            generations to embrace their weirdness and use their talents to make
            a difference. <br/><br/>The Underground is a beacon of creativity led by
            graffiti artist Crackthetoy from Indonesia.
            <br />
            <br />
            Sign up{" "}
            <a
              target="_blank"
              rel="noreferrer"
              className="text-[#9945FF] font-bold"
              href={"https://drip.haus/nofacenocase"}
            >
              here
            </a>{" "}
            to never miss a{" "}
            <a
              target="_blank"
              rel="noreferrer"
              className="text-[#9945FF] font-bold"
              href={"https://twitter.com/NFNC_art"}
            >
              No Face-No Case
            </a>{" "}
            DRiP drop.
            <div className="mt-4 flex text-xl">
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] underline font-bold mr-4"
                href={"https://linktr.ee/crackthetoy"}
              >
                Linktree
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] underline font-bold mr-4"
                href={"https://twitter.com/NFNC_art"}
              >
                Twitter
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] underline font-bold mr-4"
                href={"https://www.instagram.com/crackthetoy/"}
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
                href="/nofacenocase/drop1"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/ZeZ6_fyG_pch-ihs_A2KQFYChrHsyzsApMX30nCACM8?ext=png"
                    alt="drop 1 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 1</div>
              </Link>
              <Link
                href="/nofacenocase/drop2"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/iAHW9aG_2T5b4d-oRonzJUOEfkMVGutkByVqKlWOrzA?ext=png"
                    alt="drop 2 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 2</div>
              </Link>
              <Link
                href="/nofacenocase/drop3"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/r09nNr7-JhyWEaht8J2D4zP-KRED4xMljkK83OPt2ps?ext=JPG"
                    alt="drop 3 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 3</div>
              </Link>
              <Link
                href="/nofacenocase/drop4"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/LSW0QwIpW6F_lI3WdhXWFgN7ercsmwkg3NDHiTFelFE?ext=png"
                    alt="drop 4 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 4</div>
              </Link>
              <Link
                href="/nofacenocase/drop5"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/bT3MC3F1NUjdt33qtxfbyEY4gfgjsxWAj4fNMnFaq7I?ext=JPG"
                    alt="drop 5 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 5</div>
              </Link>
              <Link
                href="/nofacenocase/drop6"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/nO32-PeAFmRkJ0PE0ydp9HauOXszHtIcFz34hnj13zg?ext=PNG"
                    alt="drop 6 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 6</div>
              </Link>
              <Link
                href="/nofacenocase/drop7"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/_FZek2NoWEc9oHPA88G9X8TszItpjnzJHoTeNcEHjEI?ext=JPG"
                    alt="drop 7 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 7</div>
              </Link>
              <Link
                href="/nofacenocase/drop8"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/CTUl0XIO0duoD93gUdPozcE0ZYnR4DQEBzw0ZHkxcrI?ext=JPG"
                    alt="drop 8 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 8</div>
              </Link>
              <Link
                href="/nofacenocase/drop9"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/vm4RYt4Af27D_d9q0t4XnsoQmQ2MtPCD9PUF3K7Enoc?ext=jpg"
                    alt="drop 9 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 9</div>
              </Link>
              <Link
                href="/nofacenocase/drop10"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/iffMgGkFAniXvGRgkUjN2o39_OSfublQrZx6_V5oDKM?ext=jpeg"
                    alt="drop 10 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 10</div>
              </Link>
              <Link
                href="/nofacenocase/drop11"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/YFxzGrRbPWSvvgLT0ZB1ZQk_S7QD2DO25yO2zv7ReNg?ext=png"
                    alt="drop 11 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 11</div>
              </Link>
              <Link
                href="/nofacenocase/drop12"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/UT5A4aOE_eQIXBJEM868Lnxix3M6eQLj9Ar3TxR_GuY?ext=jpeg"
                    alt="drop 12 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 12</div>
              </Link>
              <Link
                href="/nofacenocase/drop13"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/fYHtFTvYw2fjYFx9oFeeEkUW0LJPK5XsXILbx-tEvGU?ext=png"
                    alt="drop 12 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 13</div>
              </Link>
              <Link
                href="/nofacenocase/drop14"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/0zUQvasGI0xSWn9pWKT3oByfe_rEHpsWTOGBuErZOy4?ext=png"
                    alt="drop 14 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 14</div>
              </Link>
              <Link
                href="/nofacenocase/drop15"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/RsIuaW4tBWBCvXnbHv72GIw1abLhvMROrZt6ck8njxU?ext=jpeg"
                    alt="drop 15 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 15</div>
              </Link>
              <Link
                href="/nofacenocase/drop16"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/GeYrBX8tfy-KkxT6VCw8Zu3hEnrLVzmjS-Rz1uw19rI?ext=jpg"
                    alt="drop 16 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 16</div>
              </Link>
              <Link
                href="/nofacenocase/drop17"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/Gixnl6RzNBoDn74NMPgglXImn7U8qyq4gEUrZSCcWQk?ext=jpg"
                    alt="drop 17 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 17</div>
              </Link>
              <Link
                href="/nofacenocase/drop18"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/6NCpugAURiuLUGIPwwI5NPexz15dyofykJr2pS5eLjY?ext=png"
                    alt="drop 18 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 18</div>
              </Link>
              <Link
                href="/nofacenocase/drop19"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/Icnf03RWPyndq0icgxYOQH8NxloCCUOihpy9etBxrM4?ext=jpg"
                    alt="drop 19 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 19</div>
              </Link>
              <Link
                href="/nofacenocase/drop20"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/nwzgT31XoOX0grEV3xYKWL7H02Ed_gQA9VuAv7SNRn8?ext=png"
                    alt="drop 20 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 20</div>
              </Link>
              <Link
                href="/nofacenocase/drop21"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/i0o6k6iut2w47kGhPH6XxD__VV5ftBJt1AwzIAyErV4?ext=jpg"
                    alt="drop 21 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 21</div>
              </Link>
              <Link
                href="/nofacenocase/drop22"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/KDxsmD3ZKTaEVC4Wkxu3X5xDQO-TWp7XU3R0Wp6YQbg?ext=png"
                    alt="drop 22 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 22</div>
              </Link>
              <Link
                href="/nofacenocase/drop23"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/PwECsK5fUEPaJkqTQ54qqDbs1no8vaiCxnWkXo4E3fI?ext=jpg"
                    alt="drop 23 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Drop 23</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
