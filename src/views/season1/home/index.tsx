// Next, React
import { FC, useEffect, useState } from "react";
import Link from "next/link";

// Wallet
import { useWallet } from "@solana/wallet-adapter-react";

import { Metadata, Metaplex, PublicKey } from "@metaplex-foundation/js";
import {
  DRiPCollection,
  spacesCollection,
} from "../../../../lib/collectionAddresses";
import { Connection } from "@solana/web3.js";
import { Loader } from "components/Loader";
import { WrapperConnection } from "../../../../ReadApi/WrapperConnection";
import { DropInfo } from "./DropInfo";

export const Season1Home: FC = ({}) => {
  const wallet = useWallet();
  const connection = new WrapperConnection(
    "https://mainnet.helius-rpc.com/?api-key=1d8740dc-e5f4-421c-b823-e1bad1889eff"
  );
  const metaplex = new Metaplex(connection);
  const nfts = metaplex.nfts();
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

    // dropNFTs will store all the NFTs of the user (DRiP collection and misprint but not the "lights x solana spaces")
    const _dropNFTs = [];
    // userDrop will store the drops the user has (we don't count the misprint)
    const _userDrop = [];
    // dripCollectionUserNFTs store all the DRiP collection NFTs of the user (we don't count the misprint)
    const dripCollectionUserNFTs = [];
    // store the drop the user hasn't
    const dropMissing = [];
    // store the uri of the user NFTs (allow to filter the duplicates)
    const uris = [];
    setIsFetched(false);

    // const userNFTs = await metaplex
    //   .nfts()
    //   .findAllByOwner({ owner: publickey }, { commitment: "processed" });

    const _userNFTs = await connection.getAssetsByOwner({
      ownerAddress: publickey.toBase58(),
    });

    const spacesCollectionNFTs = _userNFTs.items.filter(
      (asset) =>
        asset.grouping[0] != undefined &&
        asset.grouping[0].group_value == spacesCollection.toBase58()
    );

    const DRiPCollectionNFTs = _userNFTs.items.filter(
      (asset) =>
        asset.grouping[0] != undefined &&
        asset.grouping[0].group_value == DRiPCollection.toBase58()
    );

    const _userSpacesURI = await Promise.all(
      spacesCollectionNFTs.map(async (asset) => {
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

    const _userDRiPURI = await Promise.all(
      DRiPCollectionNFTs.map(async (asset) => {
        let attributes: any;
        const uri = asset.content.json_uri;
        if (asset.content.metadata.attributes) {
          attributes = asset.content.metadata.attributes;
        } else {
          const response = await fetch(uri);
          const responseData = await response.json();
          attributes = responseData.attributes;
        }
        let drop;
        if (
          uri ==
          "https://nftstorage.link/ipfs/bafkreife2g63t72go6ygrkbziy7xeoxlpasyesje3jjdfibu4tkf75og24"
        ) {
          drop = "19";
        } else {
          drop = attributes.find((nft) => nft.trait_type == "drop").value;
        }
        return {
          uri,
          drop,
        };
      })
    );

    const _alluserDRiPURI = _userSpacesURI.concat(_userDRiPURI);

    // we filter to eliminate the doublons
    const userNFTs = _alluserDRiPURI.filter((value: any, index: any) => {
      const _value = JSON.stringify(value);
      return (
        index ===
        _alluserDRiPURI.findIndex((obj: any) => {
          return JSON.stringify(obj) === _value;
        })
      );
    });

    console.log("Got their S1 NFTs!", userNFTs);

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

    // spacesCollectionNFTs.map((nft) => {
    //   if (!uris.includes(nft.uri)) {
    //     _dropNFTs.push(nft);
    //     uris.push(nft.uri);
    //   }
    // });

    // // Load the JSON for each NFT
    // const loadedSpacesNfts = await Promise.all(
    //   spacesCollectionNFTs.map((metadata) => {
    //     return nfts.load({ metadata: metadata as Metadata });
    //       })
    //     );

    // console.log("Got their Spaces NFTs!", spacesCollectionNFTs);

    // const DRiPCollectionNFTs = userNFTs.filter(
    //   (metadata) =>
    //     metadata.collection !== null &&
    //     metadata.collection.verified &&
    //     metadata.collection.address.toBase58() === DRiPCollection.toBase58()
    // );

    // DRiPCollectionNFTs.map((nft) => {
    //   if (!uris.includes(nft.uri)) {
    //     _dropNFTs.push(nft);
    //     uris.push(nft.uri);
    //   }
    // });

    // console.log("Got their DRiP NFTs!", DRiPCollectionNFTs);

    // const dropNFTs = _dropNFTs.filter((x, i) => _dropNFTs.indexOf(x) === i);

    // console.log("Got their DRiP collection NFTs!", dropNFTs);
    // setNbUserNFTs(dropNFTs.length);

    // // Load the JSON for each NFT
    // const loadedNfts = await Promise.all(
    //   dropNFTs.map((metadata) => {
    //     return nfts.load({ metadata: metadata as Metadata });
    //   })
    // );

    // loadedNfts.map((nft) => {
    //   const drop = nft.json.attributes.find(
    //     (nft) => nft.trait_type == "drop"
    //   ).value;
    //   if (
    //     nft.uri !=
    //       "https://nftstorage.link/ipfs/bafkreibxuxr4njvum4hnpvmnrwysvpwuxwgaekny3mssbuqzcfntfl3zsq" &&
    //     nft.uri !=
    //       "https://nftstorage.link/ipfs/bafkreiel2ovzjkljfaeyuj63ed2lydii6pffqgra5eji4tzkevm4ryl4du" && // Solana Space Knight is not part of the collection
    //     nft.uri !=
    //       "https://nftstorage.link/ipfs/bafkreihksqwi5hkqqiywf6rpebwzgoupbjaabpu4s2lpyjndpm7q2spama" // Legendary Solana Spaceman is not part of the collection
    //   ) {
    //     dripCollectionUserNFTs.push(nft.uri);
    //     if (drop == "18") {
    //       _userDrop.push(nft.name);
    //     } else {
    //       _userDrop.push(drop);
    //     }
    //   }
    // });

    // const userDrop = _userDrop.filter((x, i) => _userDrop.indexOf(x) === i);

    // console.log("User collection", dripCollectionUserNFTs);
    // console.log("User drop", userDrop);

    // if (userDrop.length == nbDrop) {
    //   setRareEligibility(true);
    // } else {
    //   setRareEligibility(false);
    // }

    // if (dripCollectionUserNFTs.length == nbTotalNFTsInCollection) {
    //   setLegendaryEligibility(true);
    // } else {
    //   setLegendaryEligibility(false);
    // }

    // if (!userDrop.includes("1")) {
    //   dropMissing.push("1");
    // }
    // if (!userDrop.includes("2")) {
    //   dropMissing.push("2");
    // }
    // if (!userDrop.includes("3")) {
    //   dropMissing.push("3");
    // }
    // if (!userDrop.includes("4")) {
    //   dropMissing.push("4");
    // }
    // if (!userDrop.includes("5")) {
    //   dropMissing.push("5");
    // }
    // if (!userDrop.includes("6")) {
    //   dropMissing.push("6");
    // }
    // if (!userDrop.includes("7")) {
    //   dropMissing.push("7");
    // }
    // if (!userDrop.includes("8")) {
    //   dropMissing.push("8");
    // }
    // if (!userDrop.includes("9")) {
    //   dropMissing.push("9");
    // }
    // if (!userDrop.includes("10")) {
    //   dropMissing.push("10");
    // }
    // if (!userDrop.includes("11")) {
    //   dropMissing.push("11");
    // }
    // if (!userDrop.includes("12")) {
    //   dropMissing.push("12");
    // }
    // if (!userDrop.includes("13")) {
    //   dropMissing.push("13");
    // }
    // if (!userDrop.includes("14")) {
    //   dropMissing.push("14");
    // }
    // if (!userDrop.includes("15")) {
    //   dropMissing.push("15");
    // }
    // if (!userDrop.includes("16")) {
    //   dropMissing.push("16");
    // }
    // if (!userDrop.includes("17")) {
    //   dropMissing.push("17");
    // }
    // if (!userDrop.includes("Ascension of Toonies")) {
    //   dropMissing.push("18");
    // }
    // if (!userDrop.includes("iSolmetric")) {
    //   dropMissing.push("19");
    // }
    // if (!userDrop.includes("20")) {
    //   dropMissing.push("20");
    // }
    // if (!userDrop.includes("21")) {
    //   dropMissing.push("21");
    // }
    // if (!userDrop.includes("22")) {
    //   dropMissing.push("22");
    // }
    // if (!userDrop.includes("23")) {
    //   dropMissing.push("23");
    // }
    // setDropsMissing(dropMissing);
    // console.log("You are missing", dropMissing);

    setIsFetched(true);
  }

  useEffect(() => {
    if (wallet.publicKey || isXNFT) {
      getUserNFT();
    }
  }, [wallet.publicKey, isXNFT]);

  return (
    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex">
        <div className="">
          <h1 className="font-bold text-4xl text-center">SEASON 1</h1>
          <div className="font-bold text-2xl text-center mt-2">
            Track the DRiP NFTs you are missing
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
            <div className="w-[70%] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4 flex items-center">
              {/* <Link
                href="/season1/drop0"
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
                href="/season1/drop1"
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
                href="/season1/drop2"
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
                href="/season1/drop3"
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
                href="/season1/drop4"
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
                href="/season1/drop5"
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
                href="/season1/drop6"
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
                href="/season1/drop7"
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
                href="/season1/drop8"
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
                href="/season1/drop9"
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
                href="/season1/drop10"
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
                href="/season1/drop11"
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
                href="/season1/drop12"
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
                href="/season1/drop13"
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
                href="/season1/drop14"
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
                href="/season1/drop15"
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
                href="/season1/drop16"
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
                href="/season1/drop17"
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
                href="/season1/drop18"
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
                href="/season1/drop19"
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
                href="/season1/drop20"
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
                href="/season1/drop21"
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
                href="/season1/drop22"
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
                href="/season1/drop23"
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
