"use client";

import React, { useState } from "react";

interface Material {
  id: number;
  titulo: string;
  descricao: string;
  imgPATH: string;
  acessos: number;
}

const EducationalMaterials: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const materials: Material[] = [
    {
      id: 1,
      titulo: "Introdução à Programação",
      descricao: "Conceitos básicos de lógica de programação",
      imgPATH: "",
      acessos: 1545
    },
    {
      id: 2,
      titulo: "Matemática Financeira",
      descricao: "Aprenda cálculos de juros e investimentos",
      imgPATH: "",
      acessos: 114
    },
    {
      id: 3,
      titulo: "História do Brasil",
      descricao: "Principais eventos da história brasileira",
      imgPATH: "",
      acessos: 2555
    },
    {
      id: 4,
      titulo: "Biologia Celular",
      descricao: "Estrutura e função das células",
      imgPATH: "",
      acessos: 100
    },
    {
      id: 5,
      titulo: "Química Orgânica",
      descricao: "Compostos de carbono e suas reações",
      imgPATH: "",
      acessos: 39000
    },
    {
      id: 6,
      titulo: "Física Moderna",
      descricao: "Teorias da relatividade e mecânica quântica",
      imgPATH: "",
      acessos: 100
    },
    {
      id: 7,
      titulo: "Literatura Brasileira",
      descricao: "Principais autores e obras nacionais",
      imgPATH: "",
      acessos: 100
    },
    {
      id: 8,
      titulo: "Geografia Mundial",
      descricao: "Características físicas dos continentes",
      imgPATH: "",
      acessos: 22
    },
    {
      id: 9,
      titulo: "Educação Financeira",
      descricao: "Como administrar seu dinheiro",
      imgPATH: "",
      acessos: 1
    },
    {
      id: 10,
      titulo: "Arte Contemporânea",
      descricao: "Movimentos artísticos do século XXI",
      imgPATH: "",
      acessos: 30
    }
  ];

  const filteredMaterials = materials.filter(material =>
    material.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    material.descricao.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredMaterials.length / itemsPerPage);
  const paginatedMaterials = filteredMaterials.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-white">
      <div className="w-[800px] h-[800px] border-2 border-gray-300 rounded-xl p-6 flex flex-col">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Materiais Educativos</h1>
        
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Buscar Materiais"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="flex-grow">
          {paginatedMaterials.map((material) => (
            <div 
              key={material.id}
              className="flex items-center justify-between h-14 mb-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="flex items-center">
          <div className="w-10 h-10 rounded-md bg-gray-600 mr-3"></div>
          <div>
            <h3 className="font-medium text-gray-800">{material.titulo}</h3>
            <p className="text-sm text-gray-500">{material.descricao}</p>
          </div>
              </div>
              <span className="text-sm text-gray-500">{material.acessos} Acessos</span>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-start mt-4 space-x-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-full disabled:opacity-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-full disabled:opacity-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EducationalMaterials;