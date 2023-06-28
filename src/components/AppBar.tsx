import { FC, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { useAutoConnect } from "../contexts/AutoConnectProvider";
import NavElement from "./nav-element";
import { ChannelDropdown } from "./ChannelDropdown";

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

export const AppBar: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isXNFT, setIsXNFT] = useState(false);

  useEffect(() => {
    // @ts-ignore
    if (window.xnft.solana.isXnft) {
      setIsXNFT(true);
    }
  }, []);

  return (
    <div>
      {/* NavBar / Header */}
      <div className="navbar flex h-20 flex-row md:mb-2 shadow-lg bg-black text-neutral-content border-b border-zinc-600 bg-opacity-66">
        <div className="navbar-start align-items-center">
          <div className="hidden sm:inline w-22 h-22 md:p-2 ml-10">
            <Link href="/" className="text-white">
              <div className="lg:text-3xl text-xl font-black">DRiP TRACKER</div>
            </Link>
          </div>
          {!isXNFT && (
            <WalletMultiButtonDynamic className="btn-ghost btn-sm relative flex md:hidden text-lg " />
          )}
        </div>

        {/* Nav Links */}
        {/* Wallet & Settings */}
        <div className="navbar-end">
          <div className={`hidden md:inline-flex align-items-center justify-items gap-2 lg:gap-4 ${!isXNFT ? "" : "mr-20" }`}>
            <NavElement
              label="Home"
              href="/"
              navigationStarts={() => setIsNavOpen(false)}
            />
            <ChannelDropdown />
            <NavElement
              label="Comic Reader"
              href="/reader"
              navigationStarts={() => setIsNavOpen(false)}
            />
            {!isXNFT && (
              <WalletMultiButtonDynamic className="btn-ghost btn-sm rounded-btn text-lg mr-6" />
            )}
          </div>
          <label
            htmlFor="my-drawer"
            className={`btn-gh items-center justify-between md:hidden ${!isXNFT ? "mr-6" : "mr-20" }`}
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <div className={`HAMBURGER-ICON space-y-2.5 ${!isXNFT ? "ml-5" : "ml-8" }`}>
              <div
                className={`h-0.5 w-8 bg-purple-600 ${
                  isNavOpen ? "hidden" : ""
                }`}
              />
              <div
                className={`h-0.5 w-8 bg-purple-600 ${
                  isNavOpen ? "hidden" : ""
                }`}
              />
              <div
                className={`h-0.5 w-8 bg-purple-600 ${
                  isNavOpen ? "hidden" : ""
                }`}
              />
            </div>
            <div
              className={`absolute block h-0.5 w-8 animate-pulse bg-purple-600 ${
                isNavOpen ? "" : "hidden"
              }`}
              style={{ transform: "rotate(45deg)" }}
            ></div>
            <div
              className={`absolute block h-0.5 w-8 animate-pulse bg-purple-600 ${
                isNavOpen ? "" : "hidden"
              }`}
              style={{ transform: "rotate(135deg)" }}
            ></div>
          </label>
        </div>
      </div>
    </div>
  );
};
