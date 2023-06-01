// Next, React
import { FC, useEffect, useState } from "react";
import Link from "next/link";

// Wallet
import { useWallet } from "@solana/wallet-adapter-react";

import { Metadata, Metaplex } from "@metaplex-foundation/js";
import { Connection } from "@solana/web3.js";
import { Loader } from "components/Loader";
import { WrapperConnection } from "../../../../ReadApi/WrapperConnection";

export const DAAHome: FC = ({}) => {
  const wallet = useWallet();
  const connection = new WrapperConnection(
    "https://rpc.helius.xyz/?api-key=e2ff09e4-d800-4b10-bb34-40f6044c1191"
  );
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [nbUserNFTs, setNbUserNFTs] = useState<number>();
  const nbTotalNFTsInDrop = 2;

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
          "DAA1jBEYj2w4DgMRDVaXg5CWfjmTry5t8VEvLJQ9R8PY"
    );


    const _userNFTsURI = _userNFTs.map((NFT) => NFT.content.json_uri)
    const userNFTs = _userNFTsURI.filter((x, i) => _userNFTsURI.indexOf(x) === i);

    console.log("Got their DAA NFTs!", userNFTs);

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
          <h1 className="font-bold text-4xl text-center">
            Degenerate Ape Academy Drop
          </h1>
          <div className="text-center text-3xl font-bold">
            Track the DAA DRiP NFTs you are missing
          </div>
          <div className="mt-8 w-[70%] mx-auto">
            Cool stuff every week (okay maybe not every week) from the{" "}
            <a
              target="_blank"
              rel="noreferrer"
              className="text-[#9945FF] font-bold"
              href={"https://twitter.com/DegenApeAcademy"}
            >
              Degenerate Ape Academy
            </a>
            .<br />
            <br />
            The Degenerate Ape Academy is an NFT project based on Solana, widely
            recognized as having brought life to the ecosystem in August 2021,
            and remaining a bastion of the space ever since.
            <br />
            <br />
            Join them on their journey and receive free comics, animations,
            illustrations, Degeniverse alpha, and whatever else they feel like.
            Sign up{" "}
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
              href={"https://twitter.com/DegenApeAcademy"}
            >
              Degenerate Ape Academy
            </a>{" "}
              DRiP drop.
            <div className="mt-4 flex text-xl">
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] underline font-bold mr-4"
                href={"https://www.degenape.academy/"}
              >
                Website
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] underline font-bold mr-4"
                href={"https://discord.com/invite/degenapeacademy"}
              >
                Discord
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] underline font-bold"
                href={"https://twitter.com/DegenApeAcademy"}
              >
                Twitter
              </a>
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
            <div className="w-[70%] md:w-[50%] flex items-center grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
              <Link
                href="/daa/drop1"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/H3QxXnA0NV2sZ_1gvnvRgLo_Lc9GSy-DyczvpfLU5Fk?ext=gif"
                    alt="drop 1 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 1</div>
              </Link>
              <Link
                href="/daa/drop2"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/TVyfp_HSLOy84ln_CapIVU1IcTKrDIUnX-4JKG8xwkA?ext=jpg"
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
