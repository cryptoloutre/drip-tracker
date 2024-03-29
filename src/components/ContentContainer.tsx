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
            <NavElement label="0xGraffito" href="/0xgraffito/home" />
            <NavElement label="0xGrime" href="/0xgrime/home" />
            <NavElement label="0xStoek" href="/0xStoek/home" />
            <NavElement label="Andrew Mason" href="/andrewmason/home" />
            <NavElement label="AMET" href="/amet/home" />
            <NavElement label="AssetDash" href="/assetdash/home" />
            <NavElement label="AWAG" href="/awag/home" />
            <NavElement label="Backpack" href="/backpack/home" />
            <NavElement label="BAD* Environment Club" href="/bad/home" />
            <NavElement label="Bangerz" href="/bangerz/home" />
            <NavElement label="Becc" href="/becc/home" />
            <NavElement label="Blockframez" href="/blockframez/home" />
            <NavElement label="Bork" href="/bork/home" />
            <NavElement label="BR1: INFINITE" href="/br1/home" />
            <NavElement label="Bullyz Crew" href="/bullyzcrew/home" />
            <NavElement label="Bunjil" href="/bunjil/home" />
            <NavElement label="City Of Girls" href="/cog/home" />
            <NavElement label="Coolermint" href="/coolermint/home" />
            <NavElement label="CreatedbyImrie" href="/createdbyimrie/home" />
            <NavElement label="Comic Reader" href="/reader" />
            <NavElement label="DAA" href="/daa/home" />
            <NavElement label="Degen Ghosty" href="/degenghosty/home" />
            <NavElement label="Degen Poet" href="/degenpoet/home" />
            <NavElement label="Degen Royale" href="/degenroyale/home" />
            <NavElement label="Designz" href="/designz/home" />
            <NavElement label="Designz" href="/designz/home" />
            <NavElement label="Doodle Devils" href="/doodledevils/home" />
            <NavElement label="Drop Nation" href="/dropnation/home" />
            <NavElement label="Dr. Peepee" href="/drpeepee/home" />
            <NavElement label="Dr. Revel" href="/drrevel/home" />
            <NavElement label="DUCKZZY" href="/duckzzy/home" />
            <NavElement label="Early Art" href="/early/home" />
            <NavElement label="Early Saint" href="/earlysaint/home" />
            <NavElement label="ENiGMA" href="/enigma/home" />
            <NavElement label="Epic Crypto Battle" href="/ottr/home" />
            <NavElement label="Finding Satoshi" href="/fs/home" />
            <NavElement label="Floor" href="/floor/home" />
            <NavElement label="Geneftee" href="/geneftee/home" />
            <NavElement label="Genopets" href="/genopets/home" />
            <NavElement label="Glowburger" href="/glowburger/home" />
            <NavElement label="Grim Syndicate" href="/grimsyndicate/home" />
            <NavElement label="Huxsterized" href="/huxsterized/home" />
            <NavElement label="Jakey" href="/jakey/home" />
            <NavElement label="JUNTDOE" href="/juntdoe/home" />
            <NavElement label="Kev The Cactus" href="/kevthecactus/home" />
            <NavElement label="Kirk Englehardt" href="/kirk/home" />
            <NavElement label="LC Illustrates" href="/lcillustrates/home" />
            <NavElement label="MADhouse" href="/madhouse/home" />
            <NavElement label="Mapez" href="/mapez/home" />
            <NavElement label="Maquin" href="/maquin/home" />
            <NavElement label="Moldy" href="/moldy/home" />
            <NavElement label="MovieSticks" href="/moviesticks/home" />
            <NavElement label="Hachi Mugen" href="/mugenhachi/home" />
            <NavElement label="Nachopcors" href="/nachopcors/home" />
            <NavElement label="Nanieko" href="/nanieko/home" />
            <NavElement label="No Face-No Case" href="/nofacenocase/home" />
            <NavElement label="One Dope Kids" href="/onedopekids/home" />
            <NavElement label="Picoplay" href="/picoplay/home" />
            <NavElement label="PixelChecks" href="/pixelart/home" />
            <NavElement label="POG® Digital" href="/pog/home" />
            <NavElement label="Popmonkez" href="/popmonkez/home" />
            <NavElement label="Portals" href="/portals/home" />
            <NavElement label="Postmodern Ouroboros" href="/dei/home" />
            <NavElement label="QuietMaybe" href="/quietmaybe/home" />
            <NavElement label="Radiant" href="/radiant/home" />
            <NavElement label="Rafaqin" href="/rafaqin/home" />
            <NavElement label="Rez" href="/rez/home" />
            <NavElement label="SATURDAY MORNING" href="/saturdaymorning/home" />
            <NavElement label="Season 1" href="/season1/home" />
            <NavElement label="Season 2" href="/season2/home" />
            <NavElement label="Season 3" href="/season3/home" />
            <NavElement label="Shack!" href="/shack/home" />
            <NavElement label="Silicons" href="/silicons/home" />
            <NavElement label="Silo" href="/silo/home" />
            <NavElement label="SimplyEto" href="/simplyeto/home" />
            <NavElement label="Sirius Crocodile" href="/siriuscrocodile/home" />
            <NavElement label="SolCity" href="/solcity/home" />
            <NavElement label="StudioNX" href="/studionx/home" />
            <NavElement label="Sports Moments by BetDEX" href="/betdex/home" />
            <NavElement label="Tarimosi" href="/tarimosi/home" />
            <NavElement label="Tflo" href="/tflo/home" />
            <NavElement label="The Few" href="/thefew/home" />
            <NavElement label="The Wave" href="/wave/home" />
            <NavElement label="The Whales" href="/thewhales/home" />
            <NavElement label="Tiiiny" href="/tiiiny/home" />
            <NavElement label="Vault Music" href="/vault/home" />
            <NavElement label="VFXFREEK" href="/vfxfreek/home" />
            <NavElement label="Wabalaba" href="/wabalaba/home" />
            <NavElement label="Wetiko" href="/wetiko/home" />
            <NavElement label="willustrator" href="/willustrator/home" />
            <NavElement label="Wilsen Way" href="/wilsenway/home" />
            <NavElement label="Wiwitaek’s World" href="/wiwitaek/home" />
          </li>
        </ul>
      </div>
    </div>
  );
};
