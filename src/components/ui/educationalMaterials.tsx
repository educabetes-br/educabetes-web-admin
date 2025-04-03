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
      titulo: "O que é diabetes?",
      descricao: "Ainda há muito a aprender sobre o que exatamente desencadeia o...",
      imgPATH: "",
      acessos: 1545
    },
    {
      id: 2,
      titulo: "Diabetes na adolescência",
      descricao: "A adolescência é marcada por intensas mudanças hormonais...",
      imgPATH: "",
      acessos: 114
    },
    {
      id: 3,
      titulo: "Lidando com as emoções",
      descricao: "Para adaptar-se ao diagnóstico e tratamento do diabetes é...",
      imgPATH: "",
      acessos: 2555
    },
    {
      id: 4,
      titulo: "Hipoglicemia",
      descricao: "Hipoglicemia, ou açúcar baixo no sangue, é quando o sangue fica...",
      imgPATH: "",
      acessos: 100
    },
    {
      id: 5,
      titulo: "Hiperglicemia",
      descricao: "Hiperglicemia acontece quando há muita glicose (açúcar) no sangue.",
      imgPATH: "",
      acessos: 39000
    },
    {
      id: 6,
      titulo: "Como agem as insulinas",
      descricao: "No diabetes tipo 1, os anticorpos que deveriam nos proteger e...",
      imgPATH: "",
      acessos: 100
    },
    {
      id: 7,
      titulo: "Insulinas: Parte Prática",
      descricao: "Existem diferentes formas de administrar insulina e cada uma...",
      imgPATH: "",
      acessos: 100
    },
    {
      id: 8,
      titulo: "Cuidados com a Pele",
      descricao: "Muita gente apresenta alergias com os dispositivos utilizados...",
      imgPATH: "",
      acessos: 22
    },
    {
      id: 9,
      titulo: "Contagem de Carboidratos",
      descricao: "A necessidade de nutrientes para a criança com diabetes tipo 1 é...",
      imgPATH: "",
      acessos: 1
    },
    {
      id: 10,
      titulo: "Monitoração e Metas",
      descricao: "A sua principal seta para encontrar a direção no controle...",
      imgPATH: "",
      acessos: 30
    },
    {
      id: 11,
      titulo: "Exercícios Físicos",
      descricao: "A atividade física promove benefícios sociais e de saúde...",
      imgPATH: "",
      acessos: 30
    },
    {
      id: 12,
      titulo: "Diabetes na Infância",
      descricao: "O diabetes entra na infância e impacta o dia a dia dos pais e...",
      imgPATH: "",
      acessos: 30
    },
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
        
        <div
          className="relative mb-6 flex items-center space-x-3 bg-[#ece6f0] rounded-full p-3 cursor-text"
          onClick={() => document.getElementById("searchInput")?.focus()}
        >
          <div className="w-10 h-10 bg-gray-600"></div>
          <input
            id="searchInput"
            type="text"
            placeholder="Buscar Materiais"
            className="w-full bg-transparent focus:outline-none"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="flex-grow">
        {paginatedMaterials.map((material, index) => (
          <div
            key={material.id}
            className={`flex items-center justify-between h-14 pb-6 mb-3 hover:bg-gray-100 transition-colors ${
              index === paginatedMaterials.length - 1 ? "" : "border-b"
            }`}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-600 mr-3 mt-2"></div>
              <div>
                <h3 className="font-medium text-gray-800">{material.titulo}</h3>
                <p className="text-sm text-gray-500 text-[12px]">{material.descricao}</p>
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