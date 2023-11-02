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
                <div className="text-center font-bold mt-1 pb-1">Saison 1</div>
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
                <div className="text-center font-bold mt-1 pb-1">Saison 2</div>
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
                <div className="text-center font-bold mt-1 pb-1">Saison 3</div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
