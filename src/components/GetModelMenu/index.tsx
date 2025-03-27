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
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-[#1A1847]"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
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
                      ? 'opacity-50 cursor-not-allowed flex rounded-full'
                      : 'flex rounded-full'
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
  );
};

export default GetReportsMenu;
