import { FC } from "react";
import Link from "next/link";
import Text from "./Text";
import NavElement from "./nav-element";
interface Props {
  children: React.ReactNode;
}

export const ContentContainer: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex-1 drawer h-52">
      <input id="my-drawer" type="checkbox" className="grow drawer-toggle" />
      <div className="items-center  drawer-content">{children}</div>
      {/* SideBar / Drawer */}
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay gap-6"></label>

        <ul className="p-4 overflow-y-auto menu w-80 bg-base-100 gap-10 sm:flex items-center">
          <li>
            <Text
              variant="heading"
              className="font-extrabold tracking-tighter text-center text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 to-fuchsia-500 mt-10"
            >
              Menu
            </Text>
          </li>
          <li>
            <NavElement label="Home" href="/" />
            <NavElement label="Season 1" href="/season1/home" />
            <NavElement label="Season 2" href="/season2/home" />
            <NavElement label="Degen Poet" href="/degenpoet/home" />
            <NavElement label="DAA" href="/daa/home" />
            <NavElement label="Vault Music" href="/vault/home" />
            <NavElement label="Floor" href="/floor/home" />
            <NavElement label="Tiiiny" href="/tiiiny/home" />
            <NavElement label="Bangerz" href="/bangerz/home" />
            <NavElement label="Sports Moments by BetDEX" href="/betdex/home" />
            <NavElement label="Maquin" href="/maquin/home" />
            <NavElement label="Geneftee" href="/geneftee/home" />
            <NavElement label="Bork" href="/bork/home" />
            <NavElement label="Comic Reader" href="/reader" />
          </li>
        </ul>
      </div>
    </div>
  );
};
