import { FC } from "react";

export const RarityLegend: FC = () => {
  return (
    <div className="mt-4 w-[70%] mx-auto flex justify-end">
      <div className="flex items-center mr-4">
        <span className="bg-[#a5a5a5] mr-2 h-[15px] w-[15px]"></span> Common
      </div>
      <div className="flex items-center mr-4">
        <span className="bg-[#E6C15A] mr-2 h-[15px] w-[15px]"></span> Rare
      </div>
      <div className="flex items-center mr-4">
        <span className="bg-gradient-to-bl from-[#14F195] to-[#9945FF] mr-2 h-[15px] w-[15px]"></span> Legendary
      </div>
    </div>
  );
};
