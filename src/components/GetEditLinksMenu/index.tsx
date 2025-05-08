"use client";

import React, { useState, useEffect } from "react";
import Modal from "components/ui/edit-links-modal";
import { getLinks } from 'services/Links/GetLink';
import { updateLinks } from "services/Links/PutLinks";

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
    setLink(ketoacidosisLink); // Define o link atual no modal
    setIsModalOpen(true);
  };

  const handleOpenModal2 = () => {
    setSelectedLink("Insulina");
    setLink(insulinLink); // Define o link atual no modal
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
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <span className="text-2xl font-bold">Cetoacidose:</span>
              <div className="flex items-center gap-4">
              <div className="border p-4 min-w-[300px] rounded text-lg">
                <span className="text-black">{ketoacidosisLink}</span>
                </div>
                <button
                  className="bg-blue-500 text-black px-6 py-3 rounded text-lg bg-gray-400"
                  onClick={handleOpenModal}
                >
                  Alterar
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-2xl font-bold">Insulina:</span>
              <div className="flex items-center gap-4">
                <div className="border p-4 min-w-[300px] rounded text-lg">
                  <span>{insulinLink}</span>
                </div>
                <button
                  className="bg-blue-500 text-black px-6 py-3 rounded text-lg bg-gray-400"
                  onClick={handleOpenModal2}
                >
                  Alterar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para Cetoacidose */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2>Alterar Link - Cetoacidose</h2>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="border p-2 w-full"
          />
          <div className="flex justify-end gap-4 mt-4">
            <button
              className="bg-gray-500 text-black px-4 py-2 rounded"
              onClick={() => setIsModalOpen(false)}
            >
              Cancelar
            </button>
            <button
              className="bg-green-500 text-black px-4 py-2 rounded"
              onClick={handleSave}
            >
              Salvar
            </button>
          </div>
        </Modal>
      )}

      {/* Modal para Insulina */}
      {isModalOpen2 && (
        <Modal onClose={() => setIsModalOpen2(false)}>
          <h2>Alterar Link - Insulina</h2>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="border p-2 w-full"
          />
          <div className="flex justify-end gap-4 mt-4">
            <button
              className="bg-gray-500 text-black px-4 py-2 rounded"
              onClick={() => setIsModalOpen2(false)}
            >
              Cancelar
            </button>
            <button
              className="bg-green-500 text-black px-4 py-2 rounded"
              onClick={handleSave}
            >
              Salvar
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default GetEditLinksMenu;