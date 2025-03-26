import React from 'react';

interface CardMenuProps {
  titulo: string;
  cardContent: React.ReactNode;
  addButton: React.ReactNode;
}

const CardMenu: React.FC<CardMenuProps> = ({ cardContent, addButton, titulo }) => {
  return (
    <div className="flex flex-col w-full mx-32 h-[95%] mb-10 mt-10 rounded-[28px] border border-[#939090] bg-white">
      <header className="flex pl-8 py-4">
        <h1 className="text-[24px] leading-8">{titulo}</h1>
      </header>

      <div className="my-6 overflow-y-auto">{cardContent}</div>

      <div className="bg-[#F3EDF7] w-full flex mt-auto pr-4 py-3 justify-end rounded-b-[28px]">
        {addButton}
      </div>
    </div>
  );
};

export default CardMenu;
