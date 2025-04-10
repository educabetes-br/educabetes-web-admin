"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Diabetes, Teenager, Carbo, Childhood, Emotions, Goals, Hiper, Hipo, Insulin, PE, Practise, Skin } from "assets";
import CardMenu from "components/CardMenu";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "components/ui/pagination";

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
      imgPATH: Diabetes,
      acessos: 1545
    },
    {
      id: 2,
      titulo: "Diabetes na adolescência",
      descricao: "A adolescência é marcada por intensas mudanças hormonais...",
      imgPATH: Teenager,
      acessos: 114
    },
    {
      id: 3,
      titulo: "Lidando com as emoções",
      descricao: "Para adaptar-se ao diagnóstico e tratamento do diabetes é...",
      imgPATH: Emotions,
      acessos: 2555
    },
    {
      id: 4,
      titulo: "Hipoglicemia",
      descricao: "Hipoglicemia, ou açúcar baixo no sangue, é quando o sangue fica...",
      imgPATH: Hipo,
      acessos: 100
    },
    {
      id: 5,
      titulo: "Hiperglicemia",
      descricao: "Hiperglicemia acontece quando há muita glicose (açúcar) no sangue.",
      imgPATH: Hiper,
      acessos: 39000
    },
    {
      id: 6,
      titulo: "Como agem as insulinas",
      descricao: "No diabetes tipo 1, os anticorpos que deveriam nos proteger e...",
      imgPATH: Insulin,
      acessos: 100
    },
    {
      id: 7,
      titulo: "Insulinas: Parte Prática",
      descricao: "Existem diferentes formas de administrar insulina e cada uma...",
      imgPATH: Practise,
      acessos: 100
    },
    {
      id: 8,
      titulo: "Cuidados com a Pele",
      descricao: "Muita gente apresenta alergias com os dispositivos utilizados...",
      imgPATH: Skin,
      acessos: 22
    },
    {
      id: 9,
      titulo: "Contagem de Carboidratos",
      descricao: "A necessidade de nutrientes para a criança com diabetes tipo 1 é...",
      imgPATH: Carbo,
      acessos: 1
    },
    {
      id: 10,
      titulo: "Monitoração e Metas",
      descricao: "A sua principal seta para encontrar a direção no controle...",
      imgPATH: Goals,
      acessos: 30
    },
    {
      id: 11,
      titulo: "Exercícios Físicos",
      descricao: "A atividade física promove benefícios sociais e de saúde...",
      imgPATH: PE,
      acessos: 30
    },
    {
      id: 12,
      titulo: "Diabetes na Infância",
      descricao: "O diabetes entra na infância e impacta o dia a dia dos pais e...",
      imgPATH: Childhood,
      acessos: 30
    },
  ];

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

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
    <CardMenu titulo="Materiais Educativos" cardContent={
      <div className="flex-grow overflow-y-auto">
        <div className="pl-10 justify-center items-center">
          <div
            className="relative flex items-center w-[720px] h-[56px] space-x-3 bg-[#ece6f0] rounded-full p-3 cursor-text mb-2"
            onClick={() => document.getElementById("searchInput")?.focus()}
          >
            <img
              src="../img/searchIcon.png"
              alt="Search Icon"
              className="w-[24px] h-[24px] text-gray-500"
            />
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

          <div className="flex-grow w-[1064px] h-[711px] px-5">
            {paginatedMaterials.map((material, index) => (
              <div
                key={material.id}
                className={`flex w-[1000px] h-[89px] items-center justify-between hover:bg-gray-100 transition-colors ${
                  index === paginatedMaterials.length - 1 ? "" : "border-b"
                }`}
              >
                <div className="flex items-center">
                  <Image src={material.imgPATH} alt="MDS" className="w-[50px] h-[50px] object-cover mr-4" />
                  <div>
                    <h3 className="text-[16px] text-[#1A1847]">{material.titulo}</h3>
                    <p className="text-[#111111] text-[14px]">{material.descricao}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>
          {/* Paginação */}
        {totalPages >= 0 && (
            <footer className="flex flex-row items-start rounded-b-[28px] py-4 pl-1 pr-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(currentPage - 1);
                    }}
                    className={`p-2 rounded-full ${
                      currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </PaginationPrevious>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(currentPage + 1);
            }}
            className={`p-2 rounded-full ${
              currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  </footer>
)}
      </div>
    } />
  );
};

export default EducationalMaterials;