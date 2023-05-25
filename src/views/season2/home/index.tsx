// Next, React
import { FC, useEffect, useState } from "react";
import Link from "next/link";

// Wallet
import { useWallet } from "@solana/wallet-adapter-react";

import { Metadata, Metaplex } from "@metaplex-foundation/js";
import {
  DRiPCollection,
  spacesCollection,
} from "../../../../lib/collectionAddresses";
import { Connection } from "@solana/web3.js";
import { Loader } from "components/Loader";
import { WrapperConnection } from "../../../../ReadApi/WrapperConnection";

export const Season2Home: FC = ({}) => {
  const wallet = useWallet();
  const connection = new WrapperConnection(
    "https://rpc.helius.xyz/?api-key=e2ff09e4-d800-4b10-bb34-40f6044c1191"
  );
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [nbUserNFTs, setNbUserNFTs] = useState<number>();
  const nbTotalNFTsInDrop = 63;

  async function getUserNFT() {
    if (!wallet.publicKey) {
      return;
    }
    const publickey = wallet.publicKey;

    setIsFetched(false)

    const allUserNFTs = await connection.getAssetsByOwner({
      ownerAddress: publickey.toBase58(),
    });

    const _userNFTs = allUserNFTs.items.filter(
      (asset) =>
        asset.compression.compressed &&
        asset.grouping[0] != undefined &&
        asset.grouping[0].group_value ==
          "DRiP2Pn2K6fuMLKQmt5rZWyHiUZ6WK3GChEySUpHSS4x"
    );

    
    const userNFTs = _userNFTs.filter((x, i) => _userNFTs.indexOf(x) === i);

    console.log("Got their DRiP season 2 NFTs!", userNFTs);

    setNbUserNFTs(userNFTs.length);


    setIsFetched(true);
  }

  useEffect(() => {
    if (wallet.publicKey) {
      getUserNFT();
    }
  }, [wallet.publicKey]);

  return (
    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex justify-center">
        <div className="">
          <h1 className="font-bold text-4xl text-center">SEASON 2</h1>
          <div className="font-bold text-2xl text-center mt-2">
            Track the DRiP NFTs you are missing
          </div>
          {!wallet.publicKey && (
            <div className="text-center font-bold text-xl my-6">
              Please, connect your wallet to see your progression!
            </div>
          )}
          {wallet.publicKey && isFetched && (
            <div className="text-center font-bold text-xl my-6">
              You have{" "}
              <span className="font-black text-[#14F195]">{nbUserNFTs}</span>{" "}
              out of{" "}
              <span className="font-black text-[#14F195]">
                {nbTotalNFTsInDrop}
              </span>{" "}
              NFTs!
              <br />
              Choose a drop to see which NFTs you miss.
            </div>
          )}
          {wallet.publicKey && !isFetched && <Loader />}
          <div className="flex justify-center">
          <div className="w-[70%] flex items-center grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
              <Link
                href="/season2/drop1"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/Z4oPJsuflCd73GggjxZbu8i-1BoqeO-J_O22pAZFtQ4?ext=png"
                    alt="drop 1 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 1</div>
              </Link>
              <Link
                href="/season2/drop2"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/oIc8PZRD76R19TfPpGAwnjFUxozbaLDHQ5rOXiLQxD4?ext=png"
                    alt="drop 2 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 2</div>
              </Link>
              <Link
                href="/season2/drop3"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/vgJQIXwu7WWklD8QWOfI7Ods9F1p_eod3fRGHaqJEXU?ext=png"
                    alt="drop 3 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 3</div>
              </Link>
              <Link
                href="/season2/drop4"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/AqFf-BMGHFvMaeBJZE0OSEQY3uqiJWQInNXIOinL1V0?ext=jpg"
                    alt="drop 4 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 4</div>
              </Link>
              <Link
                href="/season2/drop5"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/b3eADEHgKW8fz3ENtYG53vXoYYrya1oqwFpAU2bixxM?ext=gif"
                    alt="drop 5 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 5</div>
              </Link>
              <Link
                href="/season2/drop6"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/4vmwXle9snHPvk4a3oJAwKQnQRhOsPogxEeUVoXnsBM?ext=gif"
                    alt="drop 6 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 6</div>
              </Link>
              <Link
                href="/season2/drop7"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/PqLgrJ-SJiDNKvW8-zvHu9_7ik3boXktaKJj6LbJdyY?ext=jpg"
                    alt="drop 7 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 7</div>
              </Link>
              <Link
                href="/season2/drop8"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/0umEJ_7t92C2EmJUOcOpk2pCuP4SnfG2cA7nloktKls?ext=gif"
                    alt="drop 8 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 8</div>
              </Link>
              <Link
                href="/season2/drop9"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/Ky1jqk6f6QEBR0kztZ41M1GJA40HU6lmL22aYiT6QYI?ext=png"
                    alt="drop 9 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 9</div>
              </Link>
              <Link
                href="/season2/drop10"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/VBsR0Mt4GhBYKrisWmRMH_xQRfVOHEDWA4V6_2DZk8o?ext=jpg"
                    alt="drop 10 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 10</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
