import { FC } from "react";

type Props = {
  nbDropComplete: number;
  nbTotalDrop: number;
  nbUserNFTs: number;
  nbTotalNFTsInDrop: number;
  dropIncomplete: any[];
  dropMissing: any[];
};
export const Completion: FC<Props> = ({ nbTotalDrop, nbTotalNFTsInDrop, nbDropComplete, nbUserNFTs, dropIncomplete, dropMissing }) => {
  return (
    <div className="text-center sm:w-[70%] mx-auto font-bold text-xl my-6">
    <div className="text-left">
      You have:
      <div className="">
        <div>
          • completed{" "}
          <span className="font-black text-[#14F195]">
            {nbDropComplete}
          </span>
          /
          <span className="font-black text-[#14F195]">
            {nbTotalDrop}
          </span>{" "}
          drops!
        </div>
        <div>
          •{" "}
          <span className="font-black text-[#14F195]">
            {nbUserNFTs}
          </span>
          /
          <span className="font-black text-[#14F195]">
            {nbTotalNFTsInDrop}
          </span>{" "}
          NFTs!
        </div>
        {dropIncomplete.length != 0 && (
          <div>
            Drops incomplete:
            <div className="flex ml-4">
              →
              {dropIncomplete.map((drop) => (
                <div key={drop} className="mx-1 text-[#ff0000]">
                  {drop}
                </div>
              ))}
            </div>
          </div>
        )}
        {dropMissing.length != 0 && (
          <div>
            Drop missed:
            <div className="flex ml-4">
              →
              {dropMissing.map((drop) => (
                <div key={drop} className="mx-1 text-[#ff0000] ">
                  {drop}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    <br />
    <div>Choose a drop to see which NFTs you miss.</div>
  </div>
  );
};