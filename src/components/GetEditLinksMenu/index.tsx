"use client";

import React, { useState, useEffect } from "react";
import { getLinks } from 'services/Links/GetLink';
import { updateLinks } from "services/Links/PutLinks";
import Image from 'next/image';
import { reportIcon, pencil, eyeMenu } from '../../assets/index';
import {Link as LinkIcon} from 'lucide-react';

const GetEditLinksMenu: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [link, setLink] = useState("");
  const [selectedLink, setSelectedLink] = useState("");
  const [ketoacidosisLink, setKetoacidosisLink] = useState("");
  const [insulinLink, setInsulinLink] = useState("");

  useEffect(() => {
    const loadLinks = async () => {
      try {
        const { ketoacidosisLink, insulinLink } = await getLinks();
        setKetoacidosisLink(ketoacidosisLink);
        setInsulinLink(insulinLink);
      } catch (error) {
        console.error("Erro ao carregar os links:", error);
      }
    };


    loadLinks();
  }, []);

  const handleOpenModal = () => {
    setSelectedLink("Cetoacidose");
    setLink(ketoacidosisLink); // Garante que o input sempre mostra o valor mais recente do backend
    setIsModalOpen(true);
  };

  const handleOpenModal2 = () => {
    setSelectedLink("Insulina");
    setLink(insulinLink); // Garante que o input sempre mostra o valor mais recente do backend
    setIsModalOpen2(true);
  };

  const handleSave = async () => {
    try {
      if (selectedLink === "Cetoacidose") {
        await updateLinks({ ketoacidosisLink: link });
      } else if (selectedLink === "Insulina") {
        await updateLinks({ insulinLink: link });
      }
      alert("Links atualizados com sucesso!");
      setIsModalOpen(false);
      setIsModalOpen2(false);
    } catch (error) {
      console.error("Erro ao atualizar os links:", error);
      alert("Erro ao atualizar os links.");
    }
  };

  return (
    <div className="bg-white font-firaSans flex-1 rounded-[28px] text-black flex flex-col">
      <div className="sticky top-0 ml-8 w-[60%] bg-white pb-6">
        <div className="relative flex mt-5">
          <div className="flex flex-col gap-4 w-full">
            {/* Card de Cetoacidose */}
            <div className="flex flex-row items-center font-firaSans py-4 px-8 border-b border-gray-200 last:border-b-0 bg-white rounded-xl shadow-sm transition hover:shadow-md">
              <div className="flex-shrink-0">
                <LinkIcon size={36} strokeWidth={2} className="text-[#404AA0]" />
              </div>
              <div className="flex flex-col flex-1 pl-4 min-w-0">
                <p className="text-[#49454F] text-lg font-semibold leading-5">Cetoacidose</p>
                <p className="text-[#1A1847] text-base font-firaSansCondensed leading-6 break-all truncate max-w-full">{ketoacidosisLink}</p>
              </div>
              <div className="flex flex-row ml-auto gap-2 pl-4">
                <button onClick={handleOpenModal} className="p-2 rounded-full hover:bg-[#ECE6F0] transition" title="Editar link">
                  <Image src={pencil} alt="Editar link" width={24} height={24} />
                </button>
                <button onClick={() => window.open(ketoacidosisLink, '_blank')} className="p-2 rounded-full hover:bg-[#ECE6F0] transition" title="Visualizar link">
                  <Image src={eyeMenu} alt="Visualizar link" width={24} height={24} />
                </button>
              </div>
            </div>
            {/* Card de Insulina */}
            <div className="flex flex-row items-center font-firaSans py-4 px-8 border-b border-gray-200 last:border-b-0 bg-white rounded-xl shadow-sm transition hover:shadow-md">
              <div className="flex-shrink-0">
                <LinkIcon size={36} strokeWidth={2} className="text-[#404AA0]" />
              </div>
              <div className="flex flex-col flex-1 pl-4 min-w-0">
                <p className="text-[#49454F] text-lg font-semibold leading-5">Insulina</p>
                <p className="text-[#1A1847] text-base font-firaSansCondensed leading-6 break-all truncate max-w-full">{insulinLink}</p>
              </div>
              <div className="flex flex-row ml-auto gap-2 pl-4">
                <button onClick={handleOpenModal2} className="p-2 rounded-full hover:bg-[#ECE6F0] transition" title="Editar link">
                  <Image src={pencil} alt="Editar link" width={24} height={24} />
                </button>
                <button onClick={() => window.open(insulinLink, '_blank')} className="p-2 rounded-full hover:bg-[#ECE6F0] transition" title="Visualizar link">
                  <Image src={eyeMenu} alt="Visualizar link" width={24} height={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal para Cetoacidose */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-[560px] bg-white rounded-[28px] overflow-hidden shadow-xl">
            <div className="flex w-full bg-[#ECE6F0] pt-6 pb-2 items-start pl-6">
              <h2 className="text-[24px] text-[#1A1847] leading-8 font-firaSans">Alterar Link - Cetoacidose</h2>
            </div>
            <form className="flex flex-col gap-4 py-2 px-6 font-firaSansCondensed" onSubmit={e => { e.preventDefault(); handleSave(); }}>
              <label className="font-medium leading-[20px] text-[14px] text-[#1A1847]">Link:</label>
              <input
                type="text"
                value={link}
                onChange={e => setLink(e.target.value)}
                className="w-full focus:outline-none focus:ring-[1.5px] focus:ring-[#404AA0] focus:border-[#404AA0] border border-[#8D8BC1] p-4 rounded-sm placeholder:text-[16px]"
                placeholder="Cole ou edite o link aqui"
              />
              <div className="flex gap-4 justify-end p-0 font-firaSansCondensed mt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="text-[#404AA0] leading-5 font-medium text-[14px] px-4 py-2 rounded-[100px] border border-transparent hover:border-[#404AA0] transition-all">Cancelar</button>
                <button type="submit" className="bg-[#404AA0] text-[#DFE0FF] leading-5 font-medium text-[14px] px-4 py-2 rounded-[100px] transition-all hover:bg-[#303880]">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Modal para Insulina */}
      {isModalOpen2 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-[560px] bg-white rounded-[28px] overflow-hidden shadow-xl">
            <div className="flex w-full bg-[#ECE6F0] pt-6 pb-2 items-start pl-6">
              <h2 className="text-[24px] text-[#1A1847] leading-8 font-firaSans">Alterar Link - Insulina</h2>
            </div>
            <form className="flex flex-col gap-4 py-2 px-6 font-firaSansCondensed" onSubmit={e => { e.preventDefault(); handleSave(); }}>
              <label className="font-medium leading-[20px] text-[14px] text-[#1A1847]">Link:</label>
              <input
                type="text"
                value={link}
                onChange={e => setLink(e.target.value)}
                className="w-full focus:outline-none focus:ring-[1.5px] focus:ring-[#404AA0] focus:border-[#404AA0] border border-[#8D8BC1] p-4 rounded-sm placeholder:text-[16px]"
                placeholder="Cole ou edite o link aqui"
              />
              <div className="flex gap-4 justify-end p-0 font-firaSansCondensed mt-4">
                <button type="button" onClick={() => setIsModalOpen2(false)} className="text-[#404AA0] leading-5 font-medium text-[14px] px-4 py-2 rounded-[100px] border border-transparent hover:border-[#404AA0] transition-all">Cancelar</button>
                <button type="submit" className="bg-[#404AA0] text-[#DFE0FF] leading-5 font-medium text-[14px] px-4 py-2 rounded-[100px] transition-all hover:bg-[#303880]">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetEditLinksMenu;