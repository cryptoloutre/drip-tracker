import Link from "next/link";
import { FC } from "react";

type Props = {
  dropInfo: {
    dropNb: string;
    NFTs: {
      name: string;
      uri: string;
      rarity: string;
      image: string;
      description: string;
      magicEdenLink: string;
    }[];
  }[];
  artist: string;
};
export const DropCards: FC<Props> = ({ artist, dropInfo }) => {
  return (
    <div className="flex justify-center">
      <div className="w-[70%] md:w-[50%] flex items-center grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
        {dropInfo.map((drop, index) => {
          const dropNb = drop.dropNb;
          const page = (index + 1).toString();
          const href = "/" + artist + "/drop" + page;
          const src = drop.NFTs[drop.NFTs.length - 1].image;
          return (
            <Link
              key={dropNb}
              href={href}
              className="bg-[#000000] pt-1 rounded-xl border-2 border-[#FFFFFF] hover:border-[#14F195]"
            >
              <div className="flex justify-center">
                <img className="" src={src} alt="drop preview"></img>
              </div>
              <div className="text-center font-bold mt-1 pb-1">
                Drop {dropNb}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};