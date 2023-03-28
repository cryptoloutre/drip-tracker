// Next, React
import { FC, useEffect, useState } from "react";
import Link from "next/link";

// Wallet
import { useWallet} from "@solana/wallet-adapter-react";

import { Metaplex } from "@metaplex-foundation/js";
import {
  DRiPCollection,
  spacesCollection,
} from "../../../lib/collectionAddresses";
import { Connection } from "@solana/web3.js";
import { Loader } from "components/Loader";

export const HomeView: FC = ({}) => {
  const wallet = useWallet();
  const connection = new Connection(
    "https://try-rpc.mainnet.solana.blockdaemon.tech"
  );
  const metaplex = new Metaplex(connection);
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [nbUserNFTs, setNbUserNFTs] = useState<number>();
  const nbTotalNFTsInDrop = 84;

  async function getUserNFT() {
    if (!wallet.publicKey) {
      return;
    }
    const publickey = wallet.publicKey;
    const _dropNFTs = [];
    setIsFetched(false);

    const userNFTs = await metaplex
      .nfts()
      .findAllByOwner({ owner: publickey }, { commitment: "processed" });

    const spacesCollectionNFTs = userNFTs.filter(
      (metadata) =>
        metadata.collection !== null &&
        metadata.collection.verified &&
        metadata.collection.address.toBase58() === spacesCollection.toBase58()
    );

    console.log("Got their Spaces NFTs!", spacesCollectionNFTs);

    const DRiPCollectionNFTs = userNFTs.filter(
      (metadata) =>
        metadata.collection !== null &&
        metadata.collection.verified &&
        metadata.collection.address.toBase58() === DRiPCollection.toBase58()
    );

    console.log("Got their DRiP NFTs!", DRiPCollectionNFTs);

    spacesCollectionNFTs.map((nft) => _dropNFTs.push(nft.uri));
    DRiPCollectionNFTs.map((nft) => _dropNFTs.push(nft.uri));

    const dropNFTs = _dropNFTs.filter((x, i) => _dropNFTs.indexOf(x) === i);
    setNbUserNFTs(dropNFTs.length);
    setIsFetched(true);
  }

  useEffect(() => {
    if (wallet.publicKey) {
      getUserNFT();
    }
  }, [wallet.publicKey]);

  return (
    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex">
        <div className="">
          <h1 className="font-bold text-4xl text-center">DRiP TRACKER</h1>
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
            <div className="w-[70%] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4 flex items-center">
              <Link
                href="/drop0"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="h-[130px] sm:h-[110px] lg:h-[150px]"
                    src="https://jusqlq2kbt7vvlfrbxo6uwfer63fhd4wkxicicix5a2ibnauhwwa.arweave.net/TSUFw0oM_1qssQ3d6likj7ZTj5ZV0CQJF-g0gLQUPaw"
                    alt="drop 0 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 0</div>
              </Link>
              <Link
                href="/drop1"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="h-[130px] sm:h-[110px] lg:h-[150px]"
                    src="https://arweave.net/zvY7qNPUKOXmn8HPDA2zn5UKZXJLqcgSLf_lNVJ40pY"
                    alt="drop 1 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 1</div>
              </Link>
              <Link
                href="/drop2"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="h-[130px] sm:h-[110px] lg:h-[150px]"
                    src="https://shdw-drive.genesysgo.net/52zh6ZjiUQ5UKCwLBwob2k1BC3KF2qhvsE7V4e8g2pmD/MonsterBags.gif"
                    alt="drop 2 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 2</div>
              </Link>
              <Link
                href="/drop3"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="h-[130px] sm:h-[110px] lg:h-[150px]"
                    src="https://shdw-drive.genesysgo.net/52zh6ZjiUQ5UKCwLBwob2k1BC3KF2qhvsE7V4e8g2pmD/TO_THE_UNKNOWN.jpg"
                    alt="drop 3 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 3</div>
              </Link>
              <Link
                href="/drop4"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="h-[130px] sm:h-[110px] lg:h-[150px]"
                    src="https://shdw-drive.genesysgo.net/52zh6ZjiUQ5UKCwLBwob2k1BC3KF2qhvsE7V4e8g2pmD/hanaknight_solanaspaces_16Nov.png"
                    alt="drop 4 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 4</div>
              </Link>
              <Link
                href="/drop5"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="h-[130px] sm:h-[110px] lg:h-[150px]"
                    src="https://shdw-drive.genesysgo.net/52zh6ZjiUQ5UKCwLBwob2k1BC3KF2qhvsE7V4e8g2pmD/Come%20Back%20Boomerang.jpg"
                    alt="drop 5 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 5</div>
              </Link>
              <Link
                href="/drop6"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="h-[130px] sm:h-[110px] lg:h-[150px]"
                    src="https://shdw-drive.genesysgo.net/52zh6ZjiUQ5UKCwLBwob2k1BC3KF2qhvsE7V4e8g2pmD/Edith%20Drip.png"
                    alt="drop 6 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 6</div>
              </Link>
              <Link
                href="/drop7"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="h-[130px] sm:h-[110px] lg:h-[150px]"
                    src="https://shdw-drive.genesysgo.net/52zh6ZjiUQ5UKCwLBwob2k1BC3KF2qhvsE7V4e8g2pmD/Creative%20Observation.jpg"
                    alt="drop 7 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 7</div>
              </Link>
              <Link
                href="/drop8"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="h-[130px] sm:h-[110px] lg:h-[150px]"
                    src="https://shdw-drive.genesysgo.net/52zh6ZjiUQ5UKCwLBwob2k1BC3KF2qhvsE7V4e8g2pmD/Stillness%20On%20Taggart.jpg"
                    alt="drop 8 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-2 pb-1">DROP 8</div>
              </Link>
              <Link
                href="/drop9"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="h-[130px] sm:h-[110px] lg:h-[150px]"
                    src="https://shdw-drive.genesysgo.net/52zh6ZjiUQ5UKCwLBwob2k1BC3KF2qhvsE7V4e8g2pmD/waterfall.jpg"
                    alt="drop 9 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 9</div>
              </Link>
              <Link
                href="/drop10"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="h-[130px] sm:h-[110px] lg:h-[150px]"
                    src="https://shdw-drive.genesysgo.net/52zh6ZjiUQ5UKCwLBwob2k1BC3KF2qhvsE7V4e8g2pmD/00002.png"
                    alt="drop 10 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 10</div>
              </Link>
              <Link
                href="/drop11"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="h-[130px] sm:h-[110px] lg:h-[150px]"
                    src="https://shdw-drive.genesysgo.net/52zh6ZjiUQ5UKCwLBwob2k1BC3KF2qhvsE7V4e8g2pmD/SolanaSpaceman.png"
                    alt="drop 11 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 11</div>
              </Link>
              <Link
                href="/drop12"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="h-[130px] sm:h-[110px] lg:h-[150px]"
                    src="https://shdw-drive.genesysgo.net/52zh6ZjiUQ5UKCwLBwob2k1BC3KF2qhvsE7V4e8g2pmD/Ode%20to%20those%20still%20here.jpg"
                    alt="drop 12 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 12</div>
              </Link>
              <Link
                href="/drop13"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="h-[130px] sm:h-[110px] lg:h-[150px]"
                    src="https://shdw-drive.genesysgo.net/52zh6ZjiUQ5UKCwLBwob2k1BC3KF2qhvsE7V4e8g2pmD/knittable_centurion.gif"
                    alt="drop 13 preview"
                  />
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 13</div>
              </Link>
              <Link
                href="/drop14"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="h-[130px] sm:h-[110px] lg:h-[150px]"
                    src="https://shdw-drive.genesysgo.net/52zh6ZjiUQ5UKCwLBwob2k1BC3KF2qhvsE7V4e8g2pmD/up_only_cet.jpg"
                    alt="drop 14 preview"
                  />
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 14</div>
              </Link>
              <Link
                href="/drop15"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="h-[130px] sm:h-[110px] lg:h-[150px]"
                    src="https://shdw-drive.genesysgo.net/52zh6ZjiUQ5UKCwLBwob2k1BC3KF2qhvsE7V4e8g2pmD/Female-Alien-Trainer-PilotHat.png"
                    alt="drop 15 preview"
                  />
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 15</div>
              </Link>
              <Link
                href="/drop16"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="h-[130px] sm:h-[110px] lg:h-[150px]"
                    src="https://shdw-drive.genesysgo.net/52zh6ZjiUQ5UKCwLBwob2k1BC3KF2qhvsE7V4e8g2pmD/eaa68e59-b79c-46cb-b246-064d85cf3af7-Metropolis%20Cover.JPG"
                    alt="drop 16 preview"
                  />
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 16</div>
              </Link>
              <Link
                href="/drop17"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="h-[130px] sm:h-[110px] lg:h-[150px]"
                    src="https://shdw-drive.genesysgo.net/52zh6ZjiUQ5UKCwLBwob2k1BC3KF2qhvsE7V4e8g2pmD/Shibuya%20After%20Dark.jpg"
                    alt="drop 17 preview"
                  />
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 17</div>
              </Link>
              <Link
                href="/drop18"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="h-[130px] sm:h-[110px] lg:h-[150px]"
                    src="https://shdw-drive.genesysgo.net/52zh6ZjiUQ5UKCwLBwob2k1BC3KF2qhvsE7V4e8g2pmD/Ascension%20of%20Toonies.gif"
                    alt="drop 18 preview"
                  />
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 18</div>
              </Link>
              <Link
                href="/drop19"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="h-[130px] sm:h-[110px] lg:h-[150px]"
                    src="https://shdw-drive.genesysgo.net/52zh6ZjiUQ5UKCwLBwob2k1BC3KF2qhvsE7V4e8g2pmD/Fevra---Isolmetric.png"
                    alt="drop 19 preview"
                  />
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 19</div>
              </Link>
              <Link
                href="/drop20"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="h-[130px] sm:h-[110px] lg:h-[150px]"
                    src="https://shdw-drive.genesysgo.net/52zh6ZjiUQ5UKCwLBwob2k1BC3KF2qhvsE7V4e8g2pmD/animation.gif"
                    alt="drop 20 preview"
                  />
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 20</div>
              </Link>
              <Link
                href="/drop21"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="h-[130px] sm:h-[110px] lg:h-[150px]"
                    src="https://shdw-drive.genesysgo.net/52zh6ZjiUQ5UKCwLBwob2k1BC3KF2qhvsE7V4e8g2pmD/Chimera.jpg"
                    alt="drop 21 preview"
                  />
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 21</div>
              </Link>
              <Link
                href="/drop22"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="h-[130px] sm:h-[110px] lg:h-[150px]"
                    src="https://shdw-drive.genesysgo.net/52zh6ZjiUQ5UKCwLBwob2k1BC3KF2qhvsE7V4e8g2pmD/1.%20Static%20Banner%20-%20Common.png"
                    alt="drop 22 preview"
                  />
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 22</div>
              </Link>
              <Link
                href="/drop23"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="h-[130px] sm:h-[110px] lg:h-[150px]"
                    src="https://shdw-drive.genesysgo.net/52zh6ZjiUQ5UKCwLBwob2k1BC3KF2qhvsE7V4e8g2pmD/Tarsier%20Viking.png"
                    alt="drop 23 preview"
                  />
                </div>
                <div className="text-center font-bold mt-1 pb-1">DROP 23</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
