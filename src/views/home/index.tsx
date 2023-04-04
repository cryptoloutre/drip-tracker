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
            <div className="md:hero-content flex justify-center gap-2 mt-4">
              <Link
                href="/season1/home"
                className="bg-[#000000] w-[150px] sm:w-[200px] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://nftstorage.link/ipfs/bafkreih65pxvw4u7cq3g5rm46z5eplt5siuqhv7bmhp3yaqzaie2df5sgu"
                    alt="season 1 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Saison 1</div>
              </Link>
              <Link
                href="/season2/home"
                className="bg-[#000000] w-[150px] sm:w-[200px] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src="https://arweave.net/mMbjcIpM38LnIvv1SoXmZmUgtk-B2OJxjg0Bg4grQmM?ext=jpg"
                    alt="season 2 preview"
                  ></img>
                </div>
                <div className="text-center font-bold mt-1 pb-1">Saison 2</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
