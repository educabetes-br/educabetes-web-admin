import React from 'react';

interface CardMenuProps {
  titulo: string;
  children: React.ReactNode;
  children2: React.ReactNode;
}

const CardMenu: React.FC<CardMenuProps> = ({ children, children2, titulo }) => {
  return (
    <div className="flex flex-col w-full mx-32 h-[95%] rounded-[28px] border border-[#939090] bg-white">
      <header className="flex pl-8 py-4">
        <h1 className="text-[24px] leading-8">{titulo}</h1>
      </header>

      <div className="my-6 overflow-y-auto">{children}</div>

      <div className="bg-[#F3EDF7] w-full flex mt-auto pr-4 py-3 justify-end rounded-b-[28px]">
        {children2}
      </div>
    </div>
  );
};

export default CardMenu;
