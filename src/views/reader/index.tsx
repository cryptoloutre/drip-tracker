// Next, React
import { FC, useEffect, useState } from "react";

// Wallet
import { useWallet } from "@solana/wallet-adapter-react";
import { Loader } from "components/Loader";
import { WrapperConnection } from "../../../ReadApi/WrapperConnection";
import { getUserNFTs } from "utils/getUserNFTs";

export const Reader: FC = ({}) => {
  const wallet = useWallet();
  const connection = new WrapperConnection(
    "https://mainnet.helius-rpc.com/?api-key=1d8740dc-e5f4-421c-b823-e1bad1889eff"
  );
  const [userComics, setUserComics] = useState<any[]>();
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [nbUserNFTs, setNbUserNFTs] = useState<number>();
  const [toDisplay, setToDisplay] = useState<{
    name: string;
    image: string;
    chapter: string;
    rarity: string;
    slides: any[];
  } | null>(null);

  const [isXNFT, setIsXNFT] = useState(false);

  const rarityIndexMatch = [
    { rarity: "Common", index: 1 },
    { rarity: "Rare", index: 2 },
    { rarity: "Legendary", index: 3 },
  ];

  const ChapterIndexMatch = [
    { chapter: "One", index: 1 },
    { chapter: "Two", index: 2 },
    { chapter: "Three", index: 3 },
    { chapter: "Four", index: 4 },
    { chapter: "Five", index: 5 },
    { chapter: "Six", index: 6 },
    { chapter: "Seven", index: 7 },
    { chapter: "Eight", index: 8 },
    { chapter: "Nine", index: 9 },
    { chapter: "Ten", index: 10 },
    { chapter: "Eleven", index: 11 },
    { chapter: "Twelve", index: 12 },
    { chapter: "Thirteen", index: 13 },
    { chapter: "Fourteen", index: 14 },
    { chapter: "Fifteen", index: 15 },
  ];

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

    const allUserNFTs = await getUserNFTs(publickey.toBase58())

    const borkNFT = allUserNFTs.filter(
      (asset) =>
        asset.compression.compressed &&
        asset.grouping[0] != undefined &&
        asset.grouping[0].group_value ==
          "BoRKkxKPoAt7LcyVRPa9ZZT5MztkJuc4PiGrUXAgDHPH"
    );

    console.log(borkNFT);

    const _userBork = [];

    await Promise.all(
      borkNFT.map(async (asset) => {
        let attributes: any;
        if (asset.content.metadata.attributes) {
          attributes = asset.content.metadata.attributes;
        } else {
          const uri = asset.content.json_uri;
          const response = await fetch(uri);
          const responseData = await response.json();
          attributes = responseData.attributes;
        }

        const name = asset.content.metadata.name;
        const chapter = attributes.find(
          (nft) => nft.trait_type == "Chapter"
        ).value;
        const rarity = attributes.find(
          (nft) => nft.trait_type == "Rarity"
        ).value;


        const rarityIndex = rarityIndexMatch.find((rarityPair) => rarityPair.rarity == rarity).index;
        const chapterIndex = ChapterIndexMatch.find((chapterPair) => chapterPair.chapter == chapter).index;

        let image;
        let slides;
        // @ts-ignore
        const files = asset.content.files;

        if (files.length != 0) {
          image = files[0].uri;
          slides = files.slice(1);
        } else {
          const uri = asset.content.json_uri;
          const response = await fetch(uri);
          const responseData = await response.json();
          image = responseData.properties.files[0].uri;
          slides = responseData.properties.files.slice(1);
        }

        _userBork.push({
          name: name,
          image: image,
          chapter: chapter,
          rarity: rarity,
          slides: slides,
          chapterIndex: chapterIndex,
          rarityIndex: rarityIndex,
        });
      })
    );

    // we filter to eliminate the doublons
    const userBork = _userBork.filter((value: any, index: any) => {
      const _value = JSON.stringify(value);
      return (
        index ===
        _userBork.findIndex((obj: any) => {
          return JSON.stringify(obj) === _value;
        })
      );
    });

    userBork.sort(function (a: any, b: any) {
      if (a.chapterIndex < b.chapterIndex) {
        return -1;
      }
      if (a.chapterIndex > b.chapterIndex) {
        return 1;
      }
      if (a.chapterIndex == b.chapterIndex && a.rarityIndex < b.rarityIndex) {
        return -1;
      }
      if (a.chapterIndex == b.chapterIndex && a.rarityIndex > b.rarityIndex) {
        return 1;
      }
      return 0;
    });

    console.log("Fetch user comics", userBork);

    
    const studioNXNFT = allUserNFTs.filter(
      (asset) =>
        asset.compression.compressed &&
        asset.grouping[0] != undefined &&
        asset.grouping[0].group_value ==
          "STCo3cwNqZEfH7ayBcv71yr2xAAvMpzq6WEuwcd2mZs"
    );

    console.log(studioNXNFT);

    const _userStudioNX = [];


    await Promise.all(
      studioNXNFT.map(async (asset) => {
        let attributes: any;
        if (asset.content.metadata.attributes) {
          attributes = asset.content.metadata.attributes;
        } else {
          const uri = asset.content.json_uri;
          const response = await fetch(uri);
          const responseData = await response.json();
          attributes = responseData.attributes;
        }

        const name = asset.content.metadata.name;
        const chapter = attributes.find(
          (nft) => nft.trait_type == "Drop"
        ).value;
        const rarity = attributes.find(
          (nft) => nft.trait_type == "Rarity"
        ).value;


        const rarityIndex = rarityIndexMatch.find((rarityPair) => rarityPair.rarity == rarity).index;

        let image;
        let slides;
        // @ts-ignore
        const files = asset.content.files;

        if (files.length != 0) {
          image = files[0].uri;
          slides = files.slice(1);
        } else {
          const uri = asset.content.json_uri;
          const response = await fetch(uri);
          const responseData = await response.json();
          image = responseData.properties.files[0].uri;
          slides = responseData.properties.files.slice(1);
        }

        _userStudioNX.push({
          name: name,
          image: image,
          chapter: chapter,
          rarity: rarity,
          slides: slides,
          chapterIndex: chapter,
          rarityIndex: rarityIndex,
        });
      })
    );


        // we filter to eliminate the doublons
        const userStudioNX = _userStudioNX.filter((value: any, index: any) => {
          const _value = JSON.stringify(value);
          return (
            index ===
            _userStudioNX.findIndex((obj: any) => {
              return JSON.stringify(obj) === _value;
            })
          );
        });
    
        userStudioNX.sort(function (a: any, b: any) {
          if (a.chapterIndex < b.chapterIndex) {
            return -1;
          }
          if (a.chapterIndex > b.chapterIndex) {
            return 1;
          }
          if (a.chapterIndex == b.chapterIndex && a.rarityIndex < b.rarityIndex) {
            return -1;
          }
          if (a.chapterIndex == b.chapterIndex && a.rarityIndex > b.rarityIndex) {
            return 1;
          }
          return 0;
        });
    
        console.log("Fetch user comics", userStudioNX);


        const echoMagazineNFT = allUserNFTs.filter(
          (asset) =>
            asset.compression.compressed &&
            asset.grouping[0] != undefined &&
            asset.grouping[0].group_value ==
              "DRiP2Pn2K6fuMLKQmt5rZWyHiUZ6WK3GChEySUpHSS4x"
        );
    
        console.log(echoMagazineNFT);
    
        const _echoMagazineNFT = [];

        await Promise.all(
          echoMagazineNFT.map(async (asset) => {
            let attributes: any;
            if (asset.content.metadata.attributes) {
              attributes = asset.content.metadata.attributes;
            } else {
              const uri = asset.content.json_uri;
              const response = await fetch(uri);
              const responseData = await response.json();
              attributes = responseData.attributes;
            }
    
            const name = asset.content.metadata.name;
            const chapter = attributes.find(
              (nft) => nft.trait_type == "Drop"
            )?.value;
            const rarity = attributes.find(
              (nft) => nft.trait_type == "Rarity"
            )?.value;
    
    
            const rarityIndex = rarityIndexMatch.find((rarityPair) => rarityPair.rarity == rarity).index;
    
            if (chapter == "27") {

              let image;
              let slides;
              // @ts-ignore
              const files = asset.content.files;
      
              if (files.length != 0) {
                image = files[0].uri;
                slides = files.slice(1);
              } else {
                const uri = asset.content.json_uri;
                const response = await fetch(uri);
                const responseData = await response.json();
                image = responseData.properties.files[0].uri;
                slides = responseData.properties.files.slice(1);
              }
      
              _echoMagazineNFT.push({
                name: name,
                image: image,
                chapter: chapter,
                rarity: rarity,
                slides: slides,
                chapterIndex: chapter,
                rarityIndex: rarityIndex,
              });
            }

          })
        );

                // we filter to eliminate the doublons
        const userEchoMagazine = _echoMagazineNFT.filter((value: any, index: any) => {
          const _value = JSON.stringify(value);
          return (
            index ===
            _echoMagazineNFT.findIndex((obj: any) => {
              return JSON.stringify(obj) === _value;
            })
          );
        });
    
        userEchoMagazine.sort(function (a: any, b: any) {
          if (a.chapterIndex < b.chapterIndex) {
            return -1;
          }
          if (a.chapterIndex > b.chapterIndex) {
            return 1;
          }
          if (a.chapterIndex == b.chapterIndex && a.rarityIndex < b.rarityIndex) {
            return -1;
          }
          if (a.chapterIndex == b.chapterIndex && a.rarityIndex > b.rarityIndex) {
            return 1;
          }
          return 0;
        });

        console.log("Fetch user comics", userEchoMagazine);

        const _comics = userStudioNX.concat(userBork)
        const comics = _comics.concat(userEchoMagazine)

    setNbUserNFTs(comics.length);

    setUserComics(comics);

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
          <h1 className="font-bold text-4xl text-center">Comic Reader</h1>
          {!toDisplay && (
            <div className="text-center text-3xl font-bold">
              Read the comics you have collected
            </div>
          )}

          {!toDisplay && isFetched && (
            <div className="text-center text-xl mt-4 font-bold">
              You have {nbUserNFTs} comics in your collection!
            </div>
          )}

          {toDisplay && (
            <button
              className="mt-14 mb-4 font-extrabold px-2 py-2 bg-[#696969] rounded-xl border-4 border-[#FFFFFF] hover:border-[#14F195]"
              onClick={() => {
                setToDisplay(null);
              }}
            >
              ← Back
            </button>
          )}
          {!wallet.publicKey && !isXNFT && (
            <div className="text-center font-bold text-xl my-6">
              Please, connect your wallet to see your comics!
            </div>
          )}
          {(wallet.publicKey || isXNFT) && !isFetched && !toDisplay && (
            <div className="mt-[50%]">
              <Loader />
            </div>
          )}
          <div className="flex justify-center">
            {!toDisplay && (
              <div className="w-[70%] mt-12 md:w-[50%] flex items-center grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                {isFetched &&
                  userComics.map((currentNft) => (
                    <div key={currentNft.name}>
                      <button
                        onClick={() => {
                          setToDisplay(currentNft);
                        }}
                        className={`bg-[#000000] border border-4 hover:border-[#14F195] ${
                          currentNft.rarity == "Common" && "border-[#a5a5a5]"
                        } ${
                          currentNft.rarity == "Rare" && "border-[#E6C15A]"
                        } ${
                          currentNft.rarity == "Legendary" &&
                          "border-t-[#14F195] border-r-[#14F195] border-b-[#9945FF] border-l-[#9945FF]"
                        }`}
                      >
                        <div className="flex justify-center">
                          <img className="" src={currentNft.image}></img>
                        </div>
                        <h1 className="font-bold mt-2">{currentNft.name}</h1>
                      </button>
                    </div>
                  ))}
              </div>
            )}

            {toDisplay && <DisplayComics toDisplay={toDisplay} />}
          </div>
          {toDisplay && (
            <button
              className="my-4 font-extrabold px-2 py-2 bg-[#696969] rounded-xl border-4 border-[#FFFFFF] hover:border-[#14F195]"
              onClick={() => {
                setToDisplay(null);
              }}
            >
              ← Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

type Props = {
  toDisplay: {
    name: string;
    image: string;
    chapter: string;
    rarity: string;
    slides: any[];
  };
};

const DisplayComics: FC<Props> = ({ toDisplay }) => {
  const _slides = [];
  _slides.push(toDisplay.image);

  const pages = [];

  toDisplay.slides.map((slide) => {
    if (slide.uri != "") {
      pages.push(slide.uri);
    }
  });

  pages.sort(function (a: any, b: any) {
    if (a.slice(-1) < b.slice(-1)) {
      return -1;
    }
    if (a.slice(-1) > b.slice(-1)) {
      return 1;
    }
    return 0;
  });

  const slides = _slides.concat(pages);

  return (
    <div>
      <div className="text-center font-extrabold text-2xl mb-2">
        Chapter {toDisplay.chapter}
      </div>
      {slides.map((uri) => (
        <img className="mb-2 w-[600px] " key={uri} src={uri}></img>
      ))}
    </div>
  );
};
