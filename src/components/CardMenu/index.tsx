import react from "react";
import { useState } from "react";
import Image from "next/image";
import NewModelDialog from "components/ModelList/NewModelDialog";

interface CardMenuProps {
  children: React.ReactNode;
  children2: React.ReactNode;
}

const CardMenu: React.FC<CardMenuProps> = ({ children, children2 }) => {
  return (
    <div className="flex flex-col w-full mx-32 h-[80%] rounded-[28px] border border-[#939090] bg-white">
     <header className="flex pl-8 py-4 justify-start border-b border-gray-300">
      <h1 className="text-[24px] ">Modelos de Receitas e Relatórios</h1>
     </header>

     {/* Get do back para cada página */}
      <div className="my-6 overflow-y-auto">
        {children}
      </div>

      <div className="bg-[#F3EDF7] w-full flex mt-auto p-4 justify-end rounded-b-[28px]">
        {children2}
      </div>
    </div>
  );
};

export default CardMenu;
