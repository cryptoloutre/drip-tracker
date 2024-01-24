// Next, React
import { FC } from "react";
import Link from "next/link";

export const HomeView: FC = ({}) => {
  return (
    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex justify-center">
        <div className="">
          <h1 className="font-bold text-4xl text-center">DRiP TRACKER</h1>
          <div className="font-bold text-2xl text-center mt-2">
            Track the DRiP NFTs you are missing
          </div>
          <div className="font-bold text-2xl text-center mt-2">
            Choose a season!
          </div>

          <div className="flex justify-center">
            <div className="w-[70%] flex items-center grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
              <Link
                href="/0xgraffito/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/zFzwUszQAlXF-a39X4TV4U6KI0fIFBEUilRQDbS8TU4?ext=svg"
                    alt="0xGRAFFITO preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">0xGRAFFITO</div>
              </Link>
              <Link
                href="/0xgrime/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/OTSEKqP2evTUOm43xuNFrC8O75eK5MeVkt9SYUopzYU?ext=jpg"
                    alt="0xGrime preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">0xGrime</div>
              </Link>
              <Link
                href="/0xStoek/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/E0EH7IqudMKF2oBE3k6wQ5-hBBIAc_F9JYZ6cMi2UzI?ext=png"
                    alt="0xStoek preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">0xStoek</div>
              </Link>
              <Link
                href="/andrewmason/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/yaXmwoRlmKRb12Fb8vjfpDhgo8qDYn87unpLqCclOvo?ext=jpeg"
                    alt="andrew mason preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">
                  Andrew Mason
                </div>
              </Link>
              <Link
                href="/amet/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/TRp45R1aTJTX1hMZmAq3zLRVFWmbvTTYTXFlDeb-E2Y?ext=jpg"
                    alt="amet preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">
                  AMET
                </div>
              </Link>
              <Link
                href="/assetdash/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/rSWkxUaJaCsf6spMhOkoahE7qDhnOEEFPx9xu--ariY?ext=jpg"
                    alt="assetdash preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">AssetDash</div>
              </Link>
              <Link
                href="/awag/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/gytqAuFTQL6C_jTmPhbk5ENRMAVmoGV5JL9mIH5DmjQ?ext=jpg"
                    alt="awag preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">AWAG</div>
              </Link>
              <Link
                href="/backpack/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/6u7YaavlBs-mOFksYWEte1md_mnoElDVgIVB0q8fiGY?ext=png"
                    alt="backpack preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Backpack</div>
              </Link>
              <Link
                href="/bad/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/zfRKRNZSMiu6UGHTKoTjZlu2Ju5zkNrGZLdFj3xBLOg?ext=png"
                    alt="bad preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">
                  BAD* Environment Club
                </div>
              </Link>
              <Link
                href="/bangerz/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/4ICD4z7cPAFa-sIrlLgCw5ehqe6MaZDuGMSgyvgmqdU?ext=gif"
                    alt="bangerz preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Bangerz</div>
              </Link>
              <Link
                href="/becc/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/-SrbneSbKTQ0QEYrI1p3miGPkq-hvQ_rjZbndIArhhE?ext=jpg"
                    alt="Becc preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Becc</div>
              </Link>
              <Link
                href="/betdex/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/AjH_HqLjg9px7KsDGqCg_3zBuMf31MBJCqAccFFw6qI?ext=png"
                    alt="betdex preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Betdex</div>
              </Link>
              <Link
                href="/blockframez/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/ClNg5o8j17eAMYW9E5yGRJHrnAj4riJtqLiFM0IKHdY?ext=jpg"
                    alt="blockframez preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">
                  Blockframez
                </div>
              </Link>
              <Link
                href="/bork/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/47Q5yOtQb2KbTJgSFmnF-Qtnuh9TWTbejroAwP4jQq8?ext=jpeg"
                    alt="Daa preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">
                  Bork The Viking
                </div>
              </Link>
              <Link
                href="/br1/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/ih41mwu70RbU8o0zvJw1OrKBuwZLWlZAik7XYkjz3TA?ext=png"
                    alt="BR1: INFINITE preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">
                BR1: INFINITE
                </div>
              </Link>
              <Link
                href="/bullyzcrew/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/-oe7ePAu5erXo4ieh8AGB7mrwnwxghjd6M2tfIvXduE?ext=jpg"
                    alt="bullyzcrew preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">
                Bullyz Crew
                </div>
              </Link>
              <Link
                href="/bunjil/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/s-w27g6eHQ2fj-IdIDjitJcW6t0cHbI9ZiHC5A7DpYg?ext=png"
                    alt="bunjil preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">
                Bunjil
                </div>
              </Link>
              <Link
                href="/cog/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/XZ2KhwjTiz0IwqofF8atN9LCA2JdpAjXzGb9VUCBHkw?ext=jpg"
                    alt="cog preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">
                City Of Girls
                </div>
              </Link>
              <Link
                href="/coolermint/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/j4pSu_JWXM0J3hjI1QPBmxzjFeeOCtsAwOl3KFQgVC8?ext=png"
                    alt="coolermint preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">
                Coolermint
                </div>
              </Link>
              <Link
                href="/createdbyimrie/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/EQVFb_oJD-hAOznMhQNZcnkFcS5NYM7to8Qf2YEwy3M?ext=png"
                    alt="CreatedbyImrie preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">
                CreatedbyImrie
                </div>
              </Link>
              <Link
                href="/daa/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/H3QxXnA0NV2sZ_1gvnvRgLo_Lc9GSy-DyczvpfLU5Fk?ext=gif"
                    alt="Daa preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">DAA</div>
              </Link>
              <Link
                href="/degenghosty/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/MDUXM-6tJd7x1As80enRZnyN3W2hfvq7CocyhZgbs94?ext=png"
                    alt="degenghosty preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Degen Ghosty</div>
              </Link>
              <Link
                href="/degenpoet/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/LHLqrmVwy3XocG3QpYGk1Vkg4XvB_Tape2UGx5eYqoM?ext=jpg"
                    alt="Degen Poet preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">
                  Degen Poet
                </div>
              </Link>
              <Link
                href="/degenroyale/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/-J9Du70iL3BcpmUy_KVhhD4btdVXofn2T10QedlNHy0?ext=gif"
                    alt="Degen Royale preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">
                  Degen Royale
                </div>
              </Link>
              <Link
                href="/designz/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/ipD7DuOZmp1GvsPBM-iiOVH0SPvJjmc_jOXXvlubyys?ext=jpg"
                    alt="Designz preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Designz</div>
              </Link>
              <Link
                href="/doodledevils/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/Iax4t7sIOZTOMCADLpP2eJBKTjmm_cHYgu062hx-nN4?ext=jpg"
                    alt="Doodle Devils preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Doodle Devils</div>
              </Link>
              <Link
                href="/dreader/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/mkVmzJDPVLZ50wc793qTDcT2Mf6X17dT6n0MU2g9O14?ext=png"
                    alt="Designz preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">dReader</div>
              </Link>
              <Link
                href="/dropnation/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/EsQmR93z6YOhUU0Fc9sFGhZZkfxvE7OTYn3QBBFVapU?ext=jpeg"
                    alt="Designz preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">
                  Drop Nation
                </div>
              </Link>
              <Link
                href="/drpeepee/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/KHbMNkbNvHqqbJIe_dHLkDtRWwliYkezleoM_-0oFGI?ext=gif"
                    alt="Dr. Peepee preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">
                Dr. Peepee
                </div>
              </Link>
              <Link
                href="/drrevel/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/Uvfd_lPFw5Bs9ImSQEg6mnpt0XHEEoiJ_Lwv6oEqb7k?ext=jpg"
                    alt="Dr. Revel preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">
                Dr. Revel
                </div>
              </Link>
              <Link
                href="/duckzzy/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/2RJmAb4aNG_ZJYtpVa_39acr6fPPm6i7aRGeznwv2P0?ext=png"
                    alt="duckzzy preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">
                  DUCKZYY
                </div>
              </Link>
              <Link
                href="/early/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/o9axW5jQOfl8oq-I39l86SFSUCcpX2MKnWt-doj7lL4?ext=gif"
                    alt="Early preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">
                  Early Art
                </div>
              </Link>
              <Link
                href="/earlysaint/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/Z_Z2o_7BoAfpjmbEES-k3hhe23GQpmgM3MyZ6SRZ220?ext=gif"
                    alt="Early saint preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">
                  Early Saint
                </div>
              </Link>
              <Link
                href="/enigma/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/6U2Be02Z2qItdh8MaeoGb3vTj-LR0L2XFBnTSNFjOZM?ext=gif"
                    alt="ENiGMA preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">ENiGMA</div>
              </Link>
              <Link
                href="/ottr/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://epiccryptobattle.s3.us-west-2.amazonaws.com/main/ecb-1.jpg"
                    alt="Epic Crypto Battle preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">
                  Epic Crypto Battle
                </div>
              </Link>
              <Link
                href="/fs/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/4x9Em4xc49DqEIoVRMLlu0KQMmoDLJU-2wLEU1khW2s?ext=png"
                    alt="fs preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">
                  Finding Satoshi
                </div>
              </Link>
              <Link
                href="/floor/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/VEiCkYUKTDruei_US1zclIesMNtsWScycObJ3YCvzMI?ext=png"
                    alt="floor preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Floor</div>
              </Link>
              <Link
                href="/geneftee/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/FLtOiTgaU4W5mSBRtJXgEgixvmiGntTFdJn_2k3M-ZE?ext=jpg"
                    alt="Geneftee preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Geneftee</div>
              </Link>
              <Link
                href="/genopets/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/744o99Gmr5FNF1NpqbpG3Lxs3FhmA8HmOruECXumSyc?ext=gif"
                    alt="Genopets preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Genopets</div>
              </Link>
              <Link
                href="/glowburger/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/z4g_vU9PY0UkJGX-woMQPDXMbqAiUtPqyDC_vVyoKBY?ext=jpeg"
                    alt="glowburger preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Glowburger</div>
              </Link>
              <Link
                href="/grimsyndicate/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/isH26KwZkvQEccVrKlnw2SsMCiUOosANJpJDl7YF0pQ?ext=jpg"
                    alt="grimsyndicate preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">
                  Grim Syndicate
                </div>
              </Link>
              <Link
                href="/huxsterized/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/XOOr8J2e9IU1bgP4nAJGJuh3LezgMa-Ue6bElA8uTSY?ext=jpg"
                    alt="huxsterized preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">
                Huxsterized
                </div>
              </Link>
              <Link
                href="/jakey/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/2RbWolYAz6Mi5OjhMCjHlqjfwkQOGSOBvlYtkgXTFbY?ext=jpg"
                    alt="jakey preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Jakey</div>
              </Link>
              <Link
                href="/juntdoe/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/72r3Or2rUw1-6yPNg4fmLFT3DmQYQZeHpom5LEQujCM?ext=gif"
                    alt="juntdoe preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">JUNTDOE</div>
              </Link>
              <Link
                href="/kevthecactus/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/nRQMTrkpa2tu2vs2P3aO9a9ULtv3QsSFFgdZmoWx850?ext=png"
                    alt="kev the cactus preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">
                  Kev The Cactus
                </div>
              </Link>
              <Link
                href="/kirk/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/U9Z4Oc_vVmphVPaEv64amBt7354Oy60a0Tb8cydVqn0?ext=png"
                    alt="Kirk Englehardt preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">
                Kirk Englehardt
                </div>
              </Link>
              <Link
                href="/lcillustrates/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/9Tn1TPhm_3n_t5HHIvQpg-xs5vfPTq3CDZmBKDHwMJU?ext=jpg"
                    alt="LC Illustrates preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">
                LC Illustrates
                </div>
              </Link>
              <Link
                href="/madhouse/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/E5rnjaeRycuj_AS2GKWsmiPU6JdstxD1ufoT0o6UnR8?ext=png"
                    alt="madhouse preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">MADhouse</div>
              </Link>
              <Link
                href="/mapez/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/FfzYxIm4aPqRp6yWE-ctwDyRzNl5ZM604P_C6XW2Aak?ext=jpg"
                    alt="Mapez preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Mapez</div>
              </Link>
              <Link
                href="/maquin/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/Im4a7mK8xA0J0EGqo3ij_lqkNgDshzDsT81I_JTXvfI?ext=png"
                    alt="maquin preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Maquin</div>
              </Link>
              <Link
                href="/moldy/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/jQvwUcHB1ImaqQk05TdOlUkR8Ry8L9gwcZNXsQ-n1Z0?ext=gif"
                    alt="moldy preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Moldy</div>
              </Link>
              <Link
                href="/moviesticks/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/lQ_HaDOR-cmPQM6CBjTRCJj0IzwXSB96HgeE3mcFTH8?ext=png"
                    alt="moviesticks preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">
                  MovieSticks
                </div>
              </Link>
              <Link
                href="/mugenhachi/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/B13ostFmNNVC-GLZsnLNk719v9lQjOpdBlTipLi_WWw?ext=jpg"
                    alt="Hachi Mugen preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">
                Hachi Mugen
                </div>
              </Link>
              <Link
                href="/nachopcors/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/xDyn_hEemQTAd7gqbc3qtdg3wnzlKh1HDIXTPCAganU?ext=gif"
                    alt="nachopcors preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">
                Nachopcors
                </div>
              </Link>
              <Link
                href="/nanieko/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/Z_5jRjnoIPRTD6_zHOW5uIkKgSSD_BddI7uH_-nOxoc?ext=jpg"
                    alt="nanieko preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">
                Nanieko
                </div>
              </Link>
              <Link
                href="/nofacenocase/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/CqQMVCdy4c5dGuR1FStJQpCQxJiWgwUQLYSiw8F1Q4g?ext=jpg"
                    alt="nfnc preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">
                  No Face-No Case
                </div>
              </Link>
              <Link
                href="/onedopekids/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/AIzKlEwAJdaOTaf0uHPnB2j_78iBmAlxLDEm8bLb0Ig?ext=jpg"
                    alt="One Dope Kids preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">
                One Dope Kids
                </div>
              </Link>
              <Link
                href="/picoplay/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/CEyTzFPxj-zz-zV-mN2WVKCWfoIhTnTzr0Z1SwMvFLI?ext=png"
                    alt="picoplay preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">
                  Picoplay
                </div>
              </Link>
              <Link
                href="/pixelart/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/z7NVhgtPiFh4LfDwLFAEZPNa2ggqOIkgPC8NORKH66U?ext=png"
                    alt="pixelart preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">
                PixelChecks
                </div>
              </Link>
              <Link
                href="/pog/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/KXTPuhLvLCnUPt44K5v6JmVOHTbkdfq8H7l-uQpNyUc?ext=png"
                    alt="POG® preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">POG®</div>
              </Link>
              <Link
                href="/popmonkez/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/KSUnyDRiSea482Gnsuj-nldXZMPbnxtYUlYtF7thcEA?ext=png"
                    alt="Popmonkez preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Popmonkez</div>
              </Link>
              <Link
                href="/portals/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/cL3LU6KR1bTZPCr1g6q-auWaXoDZoqQ0nmB6PXNHVcg?ext=jpg"
                    alt="portals preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Portals</div>
              </Link>
              <Link
                href="/dei/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/xxah-slyAoHI7jKqckQf_eSYDw5FAKYw9ii-duv5jhw?ext=gif"
                    alt="Postmodern Ouroboros preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Postmodern Ouroboros</div>
              </Link>
              <Link
                href="/quietmaybe/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/BD0slANK3inz6ku3-Edw9ldLaId_60Sq-M-5xKQNuzg?ext=png"
                    alt="QuietMaybe preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">QuietMaybe</div>
              </Link>
              <Link
                href="/radiant/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/ZFWWKb0bQ7nGtllkwa2lV8DxctVUdP9ECm8BotSPFFI?ext=jpg"
                    alt="Radiant preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Radiant</div>
              </Link>
              <Link
                href="/rez/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/kWWAcW29z6w2KTeNeAxE0wNuSJBiEGmFljS8hJlt85c?ext=png"
                    alt="Rez_inProgress preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Rez</div>
              </Link>
              <Link
                href="/saturdaymorning/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/pfmj9p9-hbMKFfy1Z3UvcKrr8QtsPTjIKiXVAqlTxRI?ext=png"
                    alt="SATURDAY MORNING preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">SATURDAY MORNING</div>
              </Link>
              <Link
                href="/season1/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://nftstorage.link/ipfs/bafkreih65pxvw4u7cq3g5rm46z5eplt5siuqhv7bmhp3yaqzaie2df5sgu"
                    alt="season 1 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Season 1</div>
              </Link>
              <Link
                href="/season2/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/mMbjcIpM38LnIvv1SoXmZmUgtk-B2OJxjg0Bg4grQmM?ext=jpg"
                    alt="season 2 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Season 2</div>
              </Link>
              <Link
                href="/season3/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/t9nxFMdUzkSREOkbL2q1URdHkuab2XyG1tg9kSspCYE?ext=jpg"
                    alt="season 3 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Season 3</div>
              </Link>
              <Link
                href="/shack/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/z4MLm1FirnzunupI2KBlIuOoeeV5RCyU1iHEGfIxiRo?ext=jpg"
                    alt="shack preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Shack!</div>
              </Link>
              <Link
                href="/silicons/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/jXVIroQgldgL9acjI4YVTQW1Duk5YsgdO8e-3MKFTPc?ext=gif"
                    alt="silicons preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Silicons</div>
              </Link>
              <Link
                href="/silo/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/fljEWkjke8jbbOnP3EqTTejU1_7XDgkC5EtlvOy-LbE?ext=png"
                    alt="silo preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Silo</div>
              </Link>
              <Link
                href="/simplyeto/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/YOSJ3QNOC7ZJaEG3xv5vQOynRUb18Bu2YBcYWRoNIOE?ext=png"
                    alt="SimplyEto preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">SimplyEto</div>
              </Link>
              <Link
                href="/siriuscrocodile/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/ImvEKANSsZw6E5YfMzIvAy4Nc5ge5CUM-IFr7GYqF_U?ext=gif"
                    alt="Sirius Crocodile preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Sirius Crocodile</div>
              </Link>
              <Link
                href="/solcity/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/N7RdnIRCtbMpbGkMmu1lQrHdrSOROlW6ce9Ct_Vr9m8?ext=png"
                    alt="SolCity preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">SolCity</div>
              </Link>
              <Link
                href="/studionx/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/NQFhI7b_uRTpobNjzd1evV63O_lQ0qACV_kUYDEN8uo?ext=jpg"
                    alt="StudioNX preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">StudioNX</div>
              </Link>
              <Link
                href="/tarimosi/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/3cmu1In8s1e9miimgW6JLjleXfM_kh2ks8nRY9uPnmY?ext=jpg"
                    alt="Tarimosi preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Tarimosi</div>
              </Link>
              <Link
                href="/tflo/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/Zjk9u2Hlwcg2BOiCLZ850vsVBxMguhhPNOEUsIEmmfw?ext=png"
                    alt="tflo preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Tflo</div>
              </Link>
              <Link
                href="/thefew/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/uOjrmBnd7pss3qNKMCqoLqjvksjgZtyA3SSIEEZN2ug?ext=png"
                    alt="thefew preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">The Few</div>
              </Link>
              <Link
                href="/wave/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/YvOmR66T136dZfwTjc3yQHKZKVpfaWABqTJthsuBvWk?ext=png"
                    alt="The Wave preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">
                  The Wave
                </div>
              </Link>
              <Link
                href="/thewhales/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/TJHHuZn5qNquXiPFKij6hKlupLHXVv-6uKubtX69pr4?ext=png"
                    alt="The Whales preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">The Whales</div>
              </Link>
              <Link
                href="/tiiiny/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/XrqAEZBX5ITZDuy_N2BBWc94Hfc2HUNElK5o3FeZVjg?ext=png"
                    alt="Daa preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">
                  Tiiinydenise
                </div>
              </Link>

              <Link
                href="/vault/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/EfEugwCN7pHv0XJp9o1VTlcpTVkv18BUiMbR-nTtdEs?ext=jpg"
                    alt="vault music preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">
                  Vault Music
                </div>
              </Link>
              <Link
                href="/vfxfreek/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/QkpLoOyqvOhoWtBU8i5hEPEjXZzpMWWl6eqDrbW_Fok?ext=png"
                    alt="vfxfreek preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">VFXFREEK</div>
              </Link>
              <Link
                href="/wabalaba/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/2dTcyVvNcE2RQwy9JbP8n7DcWQeZO63yp4M-0VQOa88?ext=jpg"
                    alt="Wabalaba preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Wabalaba</div>
              </Link>
              <Link
                href="/wetiko/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/ee3RZiyUwYU4Y_frAmQQ3PEv1q5lisexuhE4NuD10qM?ext=png"
                    alt="vfxfreek preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Wetiko</div>
              </Link>
              <Link
                href="/willustrator/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/S5XAzFvLikkkymyf0u-QhtbnaEVYColmdEBWazIb_08?ext=jpg"
                    alt="willustrator preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">willustrator</div>
              </Link>
              <Link
                href="/wilsenway/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/r26anUMoWAZW1PzIycn0iMcrpKuqb1-Bz9QVzZcPC0M?ext=jpg"
                    alt="wilsenway preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Wilsen Way</div>
              </Link>
              <Link
                href="/wiwitaek/home"
                className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className="md:w-[300px] px-2 py-2"
                    src="https://arweave.net/vQ90e9nrR4tpq1AiQ0yyg3hs1dGEqY_h6fyVJl9lae8?ext=jpeg"
                    alt="Wiwitaek’s World preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Wiwitaek’s World</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
