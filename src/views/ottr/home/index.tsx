// Next, React
import { FC, useEffect, useState } from "react";
import Link from "next/link";

// Wallet
import { useWallet } from "@solana/wallet-adapter-react";

import { Metadata, Metaplex } from "@metaplex-foundation/js";
import { Connection } from "@solana/web3.js";
import { Loader } from "components/Loader";
import { WrapperConnection } from "../../../../ReadApi/WrapperConnection";
import { CardsAvailable } from "./CardsAvailable";
import { RarityLegend } from "components/RarityLegend";

export const OttrHome: FC = ({}) => {
  const wallet = useWallet();
  const connection = new WrapperConnection(
    "https://mainnet.helius-rpc.com/?api-key=1d8740dc-e5f4-421c-b823-e1bad1889eff"
  );
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [isXNFT, setIsXNFT] = useState(false);
  const [userCards, setUserCards] = useState<any[]>();
  const [traitsToFilter, setTraitsToFilter] = useState<any[]>([]);
  const [toDisplay, setToDisplay] = useState<any>(CardsAvailable);
  const [showFilterOptions, setShowFilterOptions] = useState<boolean>(false);

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
          "BJ8Kk23t7YkkB6oc6mQcKHLWawg3rTGvrw5ff6eXWxrE"
    );
    const _userNFTsURI = await Promise.all(
      _userNFTs.map(async (asset) => {
        const uri = asset.content.json_uri;
        return uri;
      })
    );
    // store the drops and the number of NFTs of this drop owned by the user
    const userCardsAndCount = [];

    for (let uri of _userNFTsURI) {
      const index = userCardsAndCount.find((_nft: any) => _nft.uri == uri);
      if (index) {
        index.nbNFT += 1;
      } else {
        userCardsAndCount.push({
          uri: uri,
          nbNFT: 1,
        });
      }
    }

    console.log(userCardsAndCount);
    setUserCards(userCardsAndCount);
    setIsFetched(true);
  }

  useEffect(() => {
    if (wallet.publicKey || isXNFT) {
      getUserNFT();
    }
  }, [wallet.publicKey, isXNFT]);

  async function addFilter(trait: string) {
    const _traits = traitsToFilter;

    if (_traits.find((_trait) => _trait == trait)) {
      _traits.splice(_traits.indexOf(trait), 1);
    } else {
      _traits.push(trait);
      setTraitsToFilter(_traits);
    }
    console.log(traitsToFilter);

    const CardsToDisplay = [];

    for (const card of CardsAvailable) {
      const hasTraits = traitsToFilter.every((trait) =>
        card.Attributes.includes(trait)
      );

      if (hasTraits) {
        CardsToDisplay.push(card);
      }
    }

    setToDisplay(CardsToDisplay);
  }

  return (
    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex justify-center">
        <div className="">
          <h1 className="font-bold text-4xl text-center">
            Epic Crypto Battle ⚔️
          </h1>
          <div className="mt-8 sm:w-[100%] mx-auto">
            Playable NFT cards dropped every week to build your Epic Crypto
            Battle deck. <br />
            Epic Crypto Battle is a free-to-play collectible card game based on
            the deep lore of your favorite blockchains, NFTs, and crypto world
            characters. Whether you&apos;re new to crypto or a seasoned degen,
            find your community with ECB.
            <br />
            <br />
            How to redeem the cards in your pack: <br />
            1. Download the Ottr app 🦦 <br />
            2. Bring your Battle Pack NFT to your Ottr wallet <br />
            3. Reveal your first 3 playable NFT cards
            <br />
            <br />
            Sign up{" "}
            <a
              target="_blank"
              rel="noreferrer"
              className="text-[#9945FF] font-bold"
              href={"https://drip.haus/ottr"}
            >
              here
            </a>{" "}
            to never miss a{" "}
            <a
              target="_blank"
              rel="noreferrer"
              className="text-[#9945FF] font-bold"
              href={"https://twitter.com/ottrfinance"}
            >
              Epic Crypto Battle
            </a>{" "}
            DRiP drop.
            <div className="mt-4 flex text-xl">
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] underline font-bold mr-4"
                href={"https://ottr.finance/"}
              >
                Download
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] underline font-bold mr-4"
                href={"https://epiccryptobattle.com/"}
              >
                Website
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#9945FF] underline font-bold mr-4"
                href={"https://twitter.com/ottrfinance"}
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
          <RarityLegend />

          <button
            className="mt-4 px-2 py-1 bg-[#005566] rounded-xl font-bold text-xl uppercase"
            onClick={() => setShowFilterOptions(!showFilterOptions)}
          >
            Filter
          </button>
          {showFilterOptions && (
            <div className="mt-4">
              <div>
                <div className="font-bold underline my-2">Allegiance</div>
                <div className="mt-2 grid sm:grid-cols-5 grid-cols-3 gap-2 ">
                  <button
                    className={`mx-2 px-2 py-1 bg-[#005555] hover:bg-[#008080] rounded-xl ${
                      traitsToFilter.find((_trait) => _trait == "Bitcoin") &&
                      " border border-2 border-#109090"
                    }`}
                    onClick={() => addFilter("Bitcoin")}
                  >
                    Bitcoin
                  </button>
                  <button
                    className={`mx-2 px-2 py-1 bg-[#005555] hover:bg-[#008080] rounded-xl ${
                      traitsToFilter.find((_trait) => _trait == "Ethereum") &&
                      " border border-2 border-#109090"
                    }`}
                    onClick={() => addFilter("Ethereum")}
                  >
                    Ethereum
                  </button>
                  <button
                    className={`mx-2 px-2 py-1 bg-[#005555] hover:bg-[#008080] rounded-xl ${
                      traitsToFilter.find((_trait) => _trait == "Neutral") &&
                      " border border-2 border-#109090"
                    }`}
                    onClick={() => addFilter("Neutral")}
                  >
                    Neutral
                  </button>
                  <button
                    className={`mx-2 px-2 py-1 bg-[#005555] hover:bg-[#008080] rounded-xl ${
                      traitsToFilter.find((_trait) => _trait == "Polygon") &&
                      " border border-2 border-#109090"
                    }`}
                    onClick={() => addFilter("Polygon")}
                  >
                    Polygon
                  </button>
                  <button
                    className={`mx-2 px-2 py-1 bg-[#005555] hover:bg-[#008080] rounded-xl ${
                      traitsToFilter.find((_trait) => _trait == "Solana") &&
                      " border border-2 border-#109090"
                    }`}
                    onClick={() => addFilter("Solana")}
                  >
                    Solana
                  </button>
                </div>
              </div>
              <div>
                <div className="font-bold underline my-2">Damage</div>
                <div className="mt-2 grid sm:grid-cols-5 grid-cols-3 gap-2 ">
                  <button
                    className={`mx-2 px-2 py-1 bg-[#005555] hover:bg-[#008080] rounded-xl ${
                      traitsToFilter.find((_trait) => _trait == "Damage0") &&
                      " border border-2 border-#109090"
                    }`}
                    onClick={() => addFilter("Damage0")}
                  >
                    0
                  </button>
                  <button
                    className={`mx-2 px-2 py-1 bg-[#005555] hover:bg-[#008080] rounded-xl ${
                      traitsToFilter.find((_trait) => _trait == "Damage1") &&
                      " border border-2 border-#109090"
                    }`}
                    onClick={() => addFilter("Damage1")}
                  >
                    1
                  </button>
                  <button
                    className={`mx-2 px-2 py-1 bg-[#005555] hover:bg-[#008080] rounded-xl ${
                      traitsToFilter.find((_trait) => _trait == "Damage2") &&
                      " border border-2 border-#109090"
                    }`}
                    onClick={() => addFilter("Damage2")}
                  >
                    2
                  </button>
                  <button
                    className={`mx-2 px-2 py-1 bg-[#005555] hover:bg-[#008080] rounded-xl ${
                      traitsToFilter.find((_trait) => _trait == "Damage3") &&
                      " border border-2 border-#109090"
                    }`}
                    onClick={() => addFilter("Damage3")}
                  >
                    3
                  </button>
                  <button
                    className={`mx-2 px-2 py-1 bg-[#005555] hover:bg-[#008080] rounded-xl ${
                      traitsToFilter.find((_trait) => _trait == "Damage4") &&
                      " border border-2 border-#109090"
                    }`}
                    onClick={() => addFilter("Damage4")}
                  >
                    4
                  </button>
                  <button
                    className={`mx-2 px-2 py-1 bg-[#005555] hover:bg-[#008080] rounded-xl ${
                      traitsToFilter.find((_trait) => _trait == "Damage5") &&
                      " border border-2 border-#109090"
                    }`}
                    onClick={() => addFilter("Damage5")}
                  >
                    5
                  </button>
                  <button
                    className={`mx-2 px-2 py-1 bg-[#005555] hover:bg-[#008080] rounded-xl ${
                      traitsToFilter.find((_trait) => _trait == "Damage6") &&
                      " border border-2 border-#109090"
                    }`}
                    onClick={() => addFilter("Damage6")}
                  >
                    6
                  </button>
                  <button
                    className={`mx-2 px-2 py-1 bg-[#005555] hover:bg-[#008080] rounded-xl ${
                      traitsToFilter.find((_trait) => _trait == "Damage7") &&
                      " border border-2 border-#109090"
                    }`}
                    onClick={() => addFilter("Damage7")}
                  >
                    7
                  </button>
                  <button
                    className={`mx-2 px-2 py-1 bg-[#005555] hover:bg-[#008080] rounded-xl ${
                      traitsToFilter.find((_trait) => _trait == "Damage8") &&
                      " border border-2 border-#109090"
                    }`}
                    onClick={() => addFilter("Damage8")}
                  >
                    8
                  </button>
                  <button
                    className={`mx-2 px-2 py-1 bg-[#005555] hover:bg-[#008080] rounded-xl ${
                      traitsToFilter.find((_trait) => _trait == "Damage15") &&
                      " border border-2 border-#109090"
                    }`}
                    onClick={() => addFilter("Damage15")}
                  >
                    15
                  </button>
                </div>
              </div>
              <div>
                <div className="font-bold underline my-2">Gas</div>
                <div className="mt-2 grid sm:grid-cols-5 grid-cols-3 gap-2 ">
                  <button
                    className={`mx-2 px-2 py-1 bg-[#005555] hover:bg-[#008080] rounded-xl ${
                      traitsToFilter.find((_trait) => _trait == "Gas0") &&
                      " border border-2 border-#109090"
                    }`}
                    onClick={() => addFilter("Gas0")}
                  >
                    0
                  </button>
                  <button
                    className={`mx-2 px-2 py-1 bg-[#005555] hover:bg-[#008080] rounded-xl ${
                      traitsToFilter.find((_trait) => _trait == "Gas1") &&
                      " border border-2 border-#109090"
                    }`}
                    onClick={() => addFilter("Gas1")}
                  >
                    1
                  </button>
                  <button
                    className={`mx-2 px-2 py-1 bg-[#005555] hover:bg-[#008080] rounded-xl ${
                      traitsToFilter.find((_trait) => _trait == "Gas2") &&
                      " border border-2 border-#109090"
                    }`}
                    onClick={() => addFilter("Gas2")}
                  >
                    2
                  </button>
                  <button
                    className={`mx-2 px-2 py-1 bg-[#005555] hover:bg-[#008080] rounded-xl ${
                      traitsToFilter.find((_trait) => _trait == "Gas3") &&
                      " border border-2 border-#109090"
                    }`}
                    onClick={() => addFilter("Gas3")}
                  >
                    3
                  </button>
                  <button
                    className={`mx-2 px-2 py-1 bg-[#005555] hover:bg-[#008080] rounded-xl ${
                      traitsToFilter.find((_trait) => _trait == "Gas4") &&
                      " border border-2 border-#109090"
                    }`}
                    onClick={() => addFilter("Gas4")}
                  >
                    4
                  </button>
                  <button
                    className={`mx-2 px-2 py-1 bg-[#005555] hover:bg-[#008080] rounded-xl ${
                      traitsToFilter.find((_trait) => _trait == "Gas5") &&
                      " border border-2 border-#109090"
                    }`}
                    onClick={() => addFilter("Gas5")}
                  >
                    5
                  </button>
                  <button
                    className={`mx-2 px-2 py-1 bg-[#005555] hover:bg-[#008080] rounded-xl ${
                      traitsToFilter.find((_trait) => _trait == "Gas6") &&
                      " border border-2 border-#109090"
                    }`}
                    onClick={() => addFilter("Gas6")}
                  >
                    6
                  </button>
                </div>
              </div>
              <div>
                <div className="font-bold underline my-2">Type</div>
                <div className="mt-2 grid sm:grid-cols-5 grid-cols-3 gap-2 ">
                  <button
                    className={`mx-2 px-2 py-1 bg-[#005555] hover:bg-[#008080] rounded-xl ${
                      traitsToFilter.find((_trait) => _trait == "Hero") &&
                      " border border-2 border-#109090"
                    }`}
                    onClick={() => addFilter("Hero")}
                  >
                    Hero
                  </button>
                  <button
                    className={`mx-2 px-2 py-1 bg-[#005555] hover:bg-[#008080] rounded-xl ${
                      traitsToFilter.find((_trait) => _trait == "NFT") &&
                      " border border-2 border-#109090"
                    }`}
                    onClick={() => addFilter("NFT")}
                  >
                    NFT
                  </button>
                  <button
                    className={`mx-2 px-2 py-1 bg-[#005555] hover:bg-[#008080] rounded-xl ${
                      traitsToFilter.find((_trait) => _trait == "Token") &&
                      " border border-2 border-#109090"
                    }`}
                    onClick={() => addFilter("Token")}
                  >
                    Token
                  </button>
                </div>
              </div>
            </div>
          )}

          {(wallet.publicKey || isXNFT) && !isFetched && <Loader />}
          {(wallet.publicKey || isXNFT) && isFetched && (
            <div className="flex justify-center mt-4">
              <div className="sm:w-[100%] flex items-center grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {toDisplay.map((currentNft) => {
                  const index = userCards.find(
                    (_cards: any) => _cards.uri == currentNft.uri
                  );

                  console.log(index);

                  return (
                    <div key={currentNft.uri}>
                      <div
                        className={`bg-[#000000] border border-4 ${
                          currentNft.rarity == "Common" && "border-[#a5a5a5]"
                        } ${
                          currentNft.rarity == "Rare" && "border-[#E6C15A]"
                        } ${
                          currentNft.rarity == "Legendary" &&
                          "border-t-[#14F195] border-r-[#14F195] border-b-[#9945FF] border-l-[#9945FF]"
                        }
                        `}
                      >
                        <a
                          target="_blank"
                          rel="noreferrer"
                          href={
                            "https://www.tensor.trade/trade/epic_crypto_battle"
                          }
                        >
                          <div
                            className={`"flex justify-center" ${
                              index == undefined &&
                              "grayscale hover:grayscale-0"
                            }`}
                          >
                            <div className="relative ">
                              <img className="" src={currentNft.image}></img>
                              {index ? (
                                <div className="absolute bottom-2 right-2 font-bold text-xl">x{index.nbNFT}</div>
                              ) : (
                                <div className="absolute bottom-2 right-2 font-bold text-xl">x0</div>
                              )}
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
