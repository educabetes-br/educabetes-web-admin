import react from "react";
import { useState } from "react";
import Image from "next/image";

interface CardMenuProps {
  children: React.ReactNode;
}

const CardMenu: React.FC<CardMenuProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen rounded-[28px] my-10 justify-around items-center bg-white">
     <header>
      <h1>Modelos de Receitas e Relatórios</h1>
     </header>
      <div className="overflow-y-auto h-[90%] w-full">
        {children}
      </div>
    </div>
  );
};

export default CardMenu;
