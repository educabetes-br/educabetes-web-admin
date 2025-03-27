import React from 'react';

interface CardMenuProps {
  titulo: string;
  cardContent: React.ReactNode;
}

const CardMenu: React.FC<CardMenuProps> = ({ cardContent, titulo }) => {
  return (
    <div className="flex flex-col w-full mx-32 h-[95%] rounded-[28px] border border-[#939090] bg-white">
      <header className="flex pl-8 py-4">
        <h1 className="text-[24px] leading-8">{titulo}</h1>
      </header>

      <div className="h-full flex overflow-y-auto scrollbar-hide">{cardContent}</div>

    </div>
  );
};

export default CardMenu;