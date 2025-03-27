import React, { useState } from 'react';
import Image from 'next/image';
import { reportIcon, eyeMenu, searchIcon } from '../../assets/index';
import DeleteModelCard from '../ModelList/DeleteModel';
import EditModelDialog from '../ModelList/EditModelDialog';
import { Report } from 'services/Reports/GetReport';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext
} from '../ui/pagination';

interface GetReportsMenuProps {
  reports: Report[];
  loading: boolean;
  error: string | null;
  onUpdateReport: (updatedReport: Report) => void;
  onDeleteReport: (deletedId: number) => void;
  itemsPerPage?: number;
}

const GetReportsMenu: React.FC<GetReportsMenuProps> = ({
  reports,
  loading,
  error,
  onUpdateReport,
  onDeleteReport,
  itemsPerPage = 6
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const openlinkpdf = (link: string) => {
    window.open(link, '_blank');
  };

  // 🔍 Filtrar relatórios pelo título ou tipo
  const filteredReports = reports.filter(
    (report) =>
      report.titulo.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
      report.tipo.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  // Cálculos de paginação
  const totalItems = filteredReports.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredReports.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <p>Carregando...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="bg-white  flex-1 rounded-b-[28px] text-white flex flex-col">
      {/* Campo de busca fixo */}
      <div className="sticky top-0 ml-8 bg-white z-10 w-[60%]">
        <div className="relative flex justify-center items-center">
          <div className="absolute left-1">
            <Image src={searchIcon} alt="Search icon" />
          </div>
          <input
            type="text"
            placeholder="Buscar relatório..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Resetar para a primeira página ao buscar
            }}
            className="w-full focus:outline-none p-3 pl-12 bg-[#ECE6F0] rounded-[28px] text-black"
          />
        </div>
      </div>

      {/* Lista de relatórios */}
      <div className="mx-8 flex flex-col overflow-y-auto mt-6 mb-6 flex-1 scrollbar-hide">
        {currentItems.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-black-500">Nenhum relatório encontrado.</p>
          </div>
        ) : (
          currentItems.map((report) => (
            <div
              key={report.id}
              className="flex flex-row items-center pt-3 pb-[6px] border-b border-gray-200 last:border-b-0"
            >
              <div>
                <Image src={reportIcon} alt="Report icon" />
              </div>

              <div className="flex flex-col flex-1 pl-4">
                <p className="text-[#49454F] text-[12px] font-medium leading-4">
                  {report.tipo}
                </p>
                <p className="text-[#1A1847] text-base leading-6">
                  {report.titulo}
                </p>
              </div>

              <div className="flex flex-row ml-auto gap-4 pl-8">
                <EditModelDialog
                  reportId={report.id}
                  titulo={report.titulo}
                  linkpdf={report.linkpdf}
                  tipo={report.tipo}
                  onEditSuccess={onUpdateReport}
                />
                <DeleteModelCard
                  reportId={report.id}
                  onDeleteSuccess={() => onDeleteReport(report.id)}
                />
                <button
                  onClick={() => openlinkpdf(report.linkpdf)}
                  className="cursor-pointer"
                >
                  <Image src={eyeMenu} alt="Visualizar modelo" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Paginação */}
      {totalPages > 1 && (
        <footer className="bg-[#F3EDF7] rounded-b-[28px] py-4 pl-1">
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
                      ? 'opacity-50 cursor-not-allowed flex'
                      : 'flex'
                  }
                />
              </PaginationItem>

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage + 1);
                  }}
                  className={
                    currentPage === totalPages
                      ? 'opacity-50 cursor-not-allowed flex'
                      : 'flex'
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>


        </footer>
      )}
    </div>
  );
};

export default GetReportsMenu;
