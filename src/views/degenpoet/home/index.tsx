// Next, React
import { FC, useEffect, useState } from "react";
import Link from "next/link";

// Wallet
import { useWallet } from "@solana/wallet-adapter-react";

import { Metadata, Metaplex } from "@metaplex-foundation/js";
import { Connection } from "@solana/web3.js";
import { Loader } from "components/Loader";
import { WrapperConnection } from "../../../../ReadApi/WrapperConnection";

export const DegenHome: FC = ({}) => {
  const wallet = useWallet();
  const connection = new WrapperConnection(
    "https://rpc.helius.xyz/?api-key=e2ff09e4-d800-4b10-bb34-40f6044c1191"
  );
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [nbUserNFTs, setNbUserNFTs] = useState<number>();
  const nbTotalNFTsInDrop = 4;

  async function getUserNFT() {
    if (!wallet.publicKey) {
      return;
    }
    const publickey = wallet.publicKey;

    setIsFetched(false);

    const allUserNFTs = await connection.getAssetsByOwner({
      ownerAddress: publickey.toBase58(),
    });

    const _userNFTs = allUserNFTs.items.filter(
      (asset) =>
        asset.compression.compressed &&
        asset.grouping[0] != undefined &&
        asset.grouping[0].group_value ==
          "DGPTxgKaBPJv3Ng7dc9AFDpX6E7kgUMZEgyTm3VGWPW6"
    );

    const userNFTs = _userNFTs.filter((x, i) => _userNFTs.indexOf(x) === i);

    console.log("Got their Degen Poet NFTs!", userNFTs);

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
          <h1 className="font-bold text-4xl text-center">Degen Poet Drop</h1>
          <div className="text-center text-3xl font-bold">
            Track the Degen Poet DRiP NFTs you are missing
          </div>
          <div className="mt-8 w-[70%] mx-auto">
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
            and animation.
            <div className="mt-4 flex text-xl">
              <a target="_blank"
              rel="noreferrer"
              className="text-[#9945FF] underline font-bold mr-4"
              href={"https://www.instagram.com/squarespace/"}>Instagram</a>
              <a target="_blank"
              rel="noreferrer"
              className="text-[#9945FF] underline font-bold"
              href={"https://twitter.com/degenpoet"}>Twitter</a>
            </div>
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
          <div className="w-[70%] md:w-[50%] flex items-center grid grid-cols-2 sm:grid-cols-2 gap-4 mt-4">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
