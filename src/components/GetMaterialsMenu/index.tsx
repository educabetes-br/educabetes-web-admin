"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Diabetes, Teenager, Carbo, Childhood, Emotions, Goals, Hiper, Hipo, Insulin, PE, Practise, Skin, searchIcon } from "assets";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "components/ui/pagination";

interface Material {
  id: number;
  titulo: string;
  descricao: string;
  imgPATH: string;
  acessos: number;
}

const GetMaterialsMenu: React.FC = () => {
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
      <div className="bg-white font-firaSans flex-1 rounded-[28px] text-white flex flex-col">
        <div className="sticky top-0 ml-8 w-[60%] bg-white pb-6">
          <div className="relative flex justify-center items-center">
            <div className="absolute left-1">
              <Image src={searchIcon} alt="Search icon" />
            </div>
            <input
              type="text"
              placeholder="Buscar Materiais"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Resetar para a primeira página ao buscar
              }}
              className="w-full focus:outline-none p-3 pl-12 bg-[#ECE6F0] rounded-[28px] text-black"
            />
          </div>
        </div>

        {/* Lista de Materiais */ }
        <div className=" mx-8 flex-grow mb-6 ml-12 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          {paginatedMaterials.map((material, index) => (
            <div
              key={material.id}
              className={`flex h-[89px] items-center justify-between hover:bg-gray-100 transition-colors ${
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
        
        {/* Paginação */}
        {totalPages >= 0 && (
          <footer className="bg-[#F3EDF7] flex flex-row items-center rounded-b-[28px] py-4 pl-1 pr-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(currentPage - 1);
                    }}
                    className={
                      currentPage === 1
                        ? 'opacity-50 cursor-not-allowed flex rounded-full'
                        : 'flex rounded-full'
                    }
                  />
                </PaginationItem>

                <div className='font-firaSans text-[14px] text-black mt-3'>
                  {currentPage} de {totalPages}
                </div>
  
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(currentPage + 1);
                    }}
                    className={
                      currentPage === totalPages
                        ? 'opacity-50 cursor-not-allowed flex rounded-full'
                        : 'flex rounded-full'
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </footer>
        )}
    </div>
   )}

export default GetMaterialsMenu;