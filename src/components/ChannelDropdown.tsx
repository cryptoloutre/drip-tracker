import type { FC } from "react";
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";

export const ChannelDropdown: FC = () => {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLUListElement>(null);

  const openDropdown = useCallback(() => {
    setActive(true);
  }, []);

  const closeDropdown = useCallback(() => {
    setActive(false);
  }, []);

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const node = ref.current;

      // Do nothing if clicking dropdown or its descendants
      if (!node || node.contains(event.target as Node)) return;

      closeDropdown();
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, closeDropdown]);

  return (
    <div className="wallet-adapter-dropdown">
      <button
        aria-expanded={active}
        className="text-lg font-medium sm:text-xl"
        onClick={openDropdown}
      >
        <div className="flex items-center">
          <div>Channels</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            className="ml-1 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
      </button>
      <ul
        aria-label="dropdown-list"
        className={`wallet-adapter-dropdown-list  w-[400px] ${
          active && "wallet-adapter-dropdown-list-active bg-[#000000] mt-4 border"
        }`}
        ref={ref}
        role="menu"
      >
        <div className="grid grid-cols-2">
        <li className="wallet-adapter-dropdown-list-item px-2" role="menuitem">
          <Link href="/0xgrime/home">0xGrime</Link>
        </li>
        <li className="wallet-adapter-dropdown-list-item px-2" role="menuitem">
          <Link href="/0xStoek/home">0xStoek</Link>
        </li>
        <li className="wallet-adapter-dropdown-list-item px-2" role="menuitem">
          <Link href="/andrewmason/home">Andrew Mason</Link>
        </li>
        <li className="wallet-adapter-dropdown-list-item px-2" role="menuitem">
          <Link href="/awag/home">AWAG</Link>
        </li>
        <li className="wallet-adapter-dropdown-list-item px-2" role="menuitem">
          <Link href="/backpack/home">Backpack</Link>
        </li>
        <li className="wallet-adapter-dropdown-list-item px-2" role="menuitem">
          <Link href="/bad/home">BAD* Environment Club</Link>
        </li>
        <li className="wallet-adapter-dropdown-list-item px-2" role="menuitem">
          <Link href="/bangerz/home">Bangerz Origins</Link>
        </li>
        <li className="wallet-adapter-dropdown-list-item px-2" role="menuitem">
          <Link href="/blockframez/home">Blockframez</Link>
        </li>
        <li className="wallet-adapter-dropdown-list-item px-2" role="menuitem">
          <Link href="/bork/home">Bork The Viking Pug</Link>
        </li>
        <li className="wallet-adapter-dropdown-list-item px-2" role="menuitem">
          <Link href="/cog/home">City Of Girls</Link>
        </li>
        <li className="wallet-adapter-dropdown-list-item px-2" role="menuitem">
          <Link href="/daa/home">DAA</Link>
        </li>
        <li className="wallet-adapter-dropdown-list-item px-2" role="menuitem">
          <Link href="/degenpoet/home">Degen Poet</Link>
        </li>
        <li className="wallet-adapter-dropdown-list-item px-2" role="menuitem">
          <Link href="/degenroyale/home">Degen Royale</Link>
        </li>
        <li className="wallet-adapter-dropdown-list-item px-2" role="menuitem">
          <Link href="/designz/home">Designz</Link>
        </li>
        <li className="wallet-adapter-dropdown-list-item px-2" role="menuitem">
          <Link href="/dreader/home">dReader</Link>
        </li>
        <li className="wallet-adapter-dropdown-list-item px-2" role="menuitem">
          <Link href="/dropnation/home">Drop Nation</Link>
        </li>
        <li className="wallet-adapter-dropdown-list-item px-2" role="menuitem">
          <Link href="/early/home">Early Art</Link>
        </li>
        <li className="wallet-adapter-dropdown-list-item px-2" role="menuitem">
          <Link href="/enigma/home">ENiGMA</Link>
        </li>
        <li className="wallet-adapter-dropdown-list-item px-2" role="menuitem">
          <Link href="/ottr/home">Epic Crypto Battle</Link>
        </li>
        <li className="wallet-adapter-dropdown-list-item px-2" role="menuitem">
          <Link href="/fs/home">Finding Satoshi</Link>
        </li>
        <li className="wallet-adapter-dropdown-list-item px-2" role="menuitem">
          <Link href="/floor/home">Floor</Link>
        </li>
        <li className="wallet-adapter-dropdown-list-item px-2" role="menuitem">
          <Link href="/geneftee/home">Geneftee</Link>
        </li>
        <li className="wallet-adapter-dropdown-list-item px-2" role="menuitem">
          <Link href="/genopets/home">Genopets</Link>
        </li>
        <li className="wallet-adapter-dropdown-list-item px-2" role="menuitem">
          <Link href="/grimsyndicate/home">Grim Syndicate</Link>
        </li>
        <li className="wallet-adapter-dropdown-list-item px-2" role="menuitem">
          <Link href="/jakey/home">Jakey</Link>
        </li>
        <li className="wallet-adapter-dropdown-list-item px-2" role="menuitem">
          <Link href="/kevthecactus/home">Kev The Cactus</Link>
        </li>
        <li className="wallet-adapter-dropdown-list-item px-2" role="menuitem">
          <Link href="/madhouse/home">MADhouse</Link>
        </li>
        <li className="wallet-adapter-dropdown-list-item px-2" role="menuitem">
          <Link href="/maquin/home">Maquin</Link>
        </li>
        <li className="wallet-adapter-dropdown-list-item px-2" role="menuitem">
          <Link href="/moviesticks/home">MovieSticks</Link>
        </li>
        <li className="wallet-adapter-dropdown-list-item px-2" role="menuitem">
          <Link href="/nofacenocase/home">No Face-No Case</Link>
        </li>
        <li className="wallet-adapter-dropdown-list-item px-2" role="menuitem">
          <Link href="/onedopekids/home">One Dope Kids</Link>
        </li>
        <li className="wallet-adapter-dropdown-list-item px-2" role="menuitem">
          <Link href="/picoplay/home">Picoplay</Link>
        </li>
        <li className="wallet-adapter-dropdown-list-item px-2" role="menuitem">
          <Link href="/pixelart/home">PixelChecks</Link>
        </li>
        <li className="wallet-adapter-dropdown-list-item px-2" role="menuitem">
          <Link href="/pog/home">POG® Digital</Link>
        </li>
        <li className="wallet-adapter-dropdown-list-item px-2" role="menuitem">
          <Link href="/portals/home">Portals</Link>
        </li>
        <li className="wallet-adapter-dropdown-list-item px-2" role="menuitem">
          <Link href="/radiant/home">Radiant</Link>
        </li>
        {/* <li className="wallet-adapter-dropdown-list-item px-2" role="menuitem">
          <Link href="/saturdaymorning/home">SATURDAY MORNING</Link>
        </li> */}
        <li className="wallet-adapter-dropdown-list-item px-2" role="menuitem">
          <Link href="/season1/home">Season 1</Link>
        </li>
        <li className="wallet-adapter-dropdown-list-item px-2" role="menuitem">
          <Link href="/season2/home">Season 2</Link>
        </li>
        <li className="wallet-adapter-dropdown-list-item px-2" role="menuitem">
          <Link href="/season3/home">Season 3</Link>
        </li>
        <li className="wallet-adapter-dropdown-list-item px-2" role="menuitem">
          <Link href="/silicons/home">Silicons</Link>
        </li>
        <li className="wallet-adapter-dropdown-list-item px-2" role="menuitem">
          <Link href="/simplyeto/home">SimplyEto</Link>
        </li>
        <li className="wallet-adapter-dropdown-list-item px-2" role="menuitem">
          <Link href="/siriuscrocodile/home">Sirius Crocodile</Link>
        </li>
        <li className="wallet-adapter-dropdown-list-item px-2" role="menuitem">
          <Link href="/solcity/home">SolCity</Link>
        </li>
        <li className="wallet-adapter-dropdown-list-item px-2" role="menuitem">
          <Link href="/studionx/home">StudioNX</Link>
        </li>
        <li className="wallet-adapter-dropdown-list-item px-2" role="menuitem">
          <Link href="/betdex/home">Sports Moments by BetDEX</Link>
        </li>
        <li className="wallet-adapter-dropdown-list-item px-2" role="menuitem">
          <Link href="/wave/home">The Wave</Link>
        </li>
        <li className="wallet-adapter-dropdown-list-item px-2" role="menuitem">
          <Link href="/tiiiny/home">Tiiinydenise</Link>
        </li>
        <li className="wallet-adapter-dropdown-list-item px-2" role="menuitem">
          <Link href="/vault/home">Vault Music</Link>
        </li>
        <li className="wallet-adapter-dropdown-list-item px-2" role="menuitem">
          <Link href="/vfxfreek/home">VFXFREEK</Link>
        </li>
        <li className="wallet-adapter-dropdown-list-item px-2" role="menuitem">
          <Link href="/wetiko/home">Wetiko</Link>
        </li>
        </div>
      </ul>
    </div>
  );
};
