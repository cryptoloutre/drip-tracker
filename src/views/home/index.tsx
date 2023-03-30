// Next, React
import { FC, useEffect, useState } from "react";
import Link from "next/link";

// Wallet
import { useWallet } from "@solana/wallet-adapter-react";

import { Metadata, Metaplex } from "@metaplex-foundation/js";
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
  const nfts = metaplex.nfts();
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [nbUserNFTs, setNbUserNFTs] = useState<number>();
  const [dropsMissing, setDropsMissing] = useState([]);
  const [rareEligibility, setRareEligibility] = useState<boolean>(false);
  const [legendaryEligibility, setLegendaryEligibility] =
    useState<boolean>(false);
  const nbTotalNFTsInDrop = 83;
  const nbTotalNFTsInCollection = 82;
  const nbDrop = 23;

  async function getUserNFT() {
    if (!wallet.publicKey) {
      return;
    }
    const publickey = wallet.publicKey;
    // dropNFTs will store all the NFTs of the user (DRiP collection and misprint but not the "lights x solana spaces")
    const _dropNFTs = [];
    // userDrop will store the drops the user has (we don't count the misprint)
    const _userDrop = [];
    // dripCollectionUserNFTs store all the DRiP collection NFTs of the user (we don't count the misprint)
    const dripCollectionUserNFTs = [];
    // store the drop the user hasn't
    const dropMissing = [];
    setIsFetched(false);

    const userNFTs = await metaplex
      .nfts()
      .findAllByOwner({ owner: publickey }, { commitment: "processed" });

    const spacesCollectionNFTs = userNFTs.filter(
      (metadata) =>
        metadata.collection !== null &&
        metadata.collection.verified &&
        metadata.collection.address.toBase58() ===
          spacesCollection.toBase58() &&
        metadata.uri !==
          "https://arweave.net/7jFIXO9oT2M0LFmtvf7l8dgC6RSHrjtOvQSN6cM13rI"
    );

    spacesCollectionNFTs.map((nft) => _dropNFTs.push(nft));

    // // Load the JSON for each NFT
    // const loadedSpacesNfts = await Promise.all(
    //   spacesCollectionNFTs.map((metadata) => {
    //     return nfts.load({ metadata: metadata as Metadata });
    //       })
    //     );

    console.log("Got their Spaces NFTs!", spacesCollectionNFTs);

    const DRiPCollectionNFTs = userNFTs.filter(
      (metadata) =>
        metadata.collection !== null &&
        metadata.collection.verified &&
        metadata.collection.address.toBase58() === DRiPCollection.toBase58()
    );

    DRiPCollectionNFTs.map((nft) => _dropNFTs.push(nft));

    console.log("Got their DRiP NFTs!", DRiPCollectionNFTs);

    const dropNFTs = _dropNFTs.filter((x, i) => _dropNFTs.indexOf(x) === i);

    console.log("Got their DRiP collection NFTs!", dropNFTs);

    setNbUserNFTs(dropNFTs.length);

    // Load the JSON for each NFT
    const loadedNfts = await Promise.all(
      dropNFTs.map((metadata) => {
        return nfts.load({ metadata: metadata as Metadata });
      })
    );

    loadedNfts.map((nft) => {
      const drop = nft.json.attributes.find(
        (nft) => nft.trait_type == "drop"
      ).value;
      if (
        nft.uri !=
        "https://nftstorage.link/ipfs/bafkreibxuxr4njvum4hnpvmnrwysvpwuxwgaekny3mssbuqzcfntfl3zsq"
      ) {
        dripCollectionUserNFTs.push(nft.uri);
        if (drop == "18") {
          _userDrop.push(nft.name);
        } else {
          _userDrop.push(drop);
        }
      }
    });

    const userDrop = _userDrop.filter((x, i) => _userDrop.indexOf(x) === i);

    console.log("User collection", dripCollectionUserNFTs);
    console.log("User drop", userDrop);

    if (userDrop.length == nbDrop) {
      setRareEligibility(true);
    } else {
      setRareEligibility(false);
    }

    if (dripCollectionUserNFTs.length == nbTotalNFTsInCollection) {
      setLegendaryEligibility(true);
    } else {
      setLegendaryEligibility(false);
    }

    if (!userDrop.includes("1")) {
      dropMissing.push("Drop 1");
    }
    if (!userDrop.includes("2")) {
      dropMissing.push("Drop 2");
    }
    if (!userDrop.includes("3")) {
      dropMissing.push("Drop 3");
    }
    if (!userDrop.includes("4")) {
      dropMissing.push("Drop 4");
    }
    if (!userDrop.includes("5")) {
      dropMissing.push("Drop 5");
    }
    if (!userDrop.includes("6")) {
      dropMissing.push("Drop 6");
    }
    if (!userDrop.includes("7")) {
      dropMissing.push("Drop 7");
    }
    if (!userDrop.includes("8")) {
      dropMissing.push("Drop 8");
    }
    if (!userDrop.includes("9")) {
      dropMissing.push("Drop 9");
    }
    if (!userDrop.includes("10")) {
      dropMissing.push("Drop 10");
    }
    if (!userDrop.includes("11")) {
      dropMissing.push("Drop 11");
    }
    if (!userDrop.includes("12")) {
      dropMissing.push("Drop 12");
    }
    if (!userDrop.includes("13")) {
      dropMissing.push("Drop 13");
    }
    if (!userDrop.includes("14")) {
      dropMissing.push("Drop 14");
    }
    if (!userDrop.includes("15")) {
      dropMissing.push("Drop 15");
    }
    if (!userDrop.includes("16")) {
      dropMissing.push("Drop 16");
    }
    if (!userDrop.includes("17")) {
      dropMissing.push("Drop 17");
    }
    if (!userDrop.includes("Ascension of Toonies")) {
      dropMissing.push("Drop 18");
    }
    if (!userDrop.includes("iSolmetric")) {
      dropMissing.push("Drop 19");
    }
    if (!userDrop.includes("20")) {
      dropMissing.push("Drop 20");
    }
    if (!userDrop.includes("21")) {
      dropMissing.push("Drop 21");
    }
    if (!userDrop.includes("22")) {
      dropMissing.push("Drop 22");
    }
    if (!userDrop.includes("23")) {
      dropMissing.push("Drop 23");
    }
    setDropsMissing(dropMissing);
    console.log("You are missing", dropMissing);

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
              {legendaryEligibility && rareEligibility && (
                <div className="mt-2">
                  You{" "}
                  <span className="font-extrabold underline text-[#00FF00]">
                    are eligible
                  </span>{" "}
                  for the{" "}
                  <span className="font-black underline">
                    Season 1 Legendary Reward
                  </span>
                  . See
                  <a
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#9945FF] font-extrabold"
                    href={
                      "https://twitter.com/drip_haus/status/1640794895295320064"
                    }
                  >
                    {" "}
                    announcement
                  </a>
                  .
                </div>
              )}
              {!legendaryEligibility && rareEligibility && (
                <div className="mt-2">
                  You{" "}
                  <span className="font-extrabold underline text-[#00FF00]">
                    are eligible
                  </span>{" "}
                  for the{" "}
                  <span className="font-black underline">
                    Season 1 Rare Reward
                  </span>
                  . See
                  <a
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#9945FF] font-extrabold"
                    href={
                      "https://twitter.com/drip_haus/status/1640794895295320064"
                    }
                  >
                    {" "}
                    announcement
                  </a>
                  .
                </div>
              )}
              {!legendaryEligibility && !rareEligibility && (
                <div className="mt-2">
                  You{" "}
                  <span className="font-extrabold underline text-[#FF0000]">
                    are not eligible
                  </span>{" "}
                  for the{" "}
                  <span className="font-black underline">Season 1 Reward</span>.
                  See
                  <a
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#9945FF] font-extrabold"
                    href={
                      "https://twitter.com/drip_haus/status/1640794895295320064"
                    }
                  >
                    {" "}
                    announcement
                  </a>.
                  
                  <div className="mt-2">You are missing:</div>
                  <div className="flex justify-center mt-2">
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 w-[70%]">
                    {dropsMissing.map((drop) => (
                      <div key={drop} className="">{drop}</div>
                    ))}
                  </div>
                  </div>
                </div>
              )}
            </div>
          )}
          {wallet.publicKey && !isFetched && <Loader />}
          <div className="flex justify-center">
            <div className="w-[70%] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4 flex items-center">
              {/* <Link
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
              </Link> */}
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
