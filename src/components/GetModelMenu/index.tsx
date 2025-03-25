import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Report, getReports } from 'services/Reports/GetReport';
import { reportIcon, eyeMenu } from '../../assets/index';
import DeleteModelCard from '../ModelList/DeleteModel';
import EditModelDialog from 'components/ModelList/EditModelDialog';

const GetReportsMenu: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // fetch para pegar os relatórios (Inclui loading)
  useEffect(() => {
    const fetchReports = async (): Promise<void> => {
      setLoading(true);
      try {
        const response = await getReports();
        setReports(response);
      } catch (err) {
        console.error('Failed to fetch reports:', err);
        setError('Failed to fetch reports. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  // Função para abrir o link do pdf em nova página
  const openlinkpdf = (link: string) => {
    window.open(link, '_blank');
  };

  // Função para deletar o relatório e já atualizar a lista
  const handleDeleteSuccess = (deletedReportId: Number) => {
    setReports((prevReports) =>
      prevReports.filter((report) => report.id !== Number(deletedReportId))
    );
  };

    // Função para atualizar o relatório e já atualizar a lista
  const handleEditReport = (updatedReport: Report) => {
    setReports((prevReports) =>
      prevReports.map((report) =>
        report.id === updatedReport.id ? updatedReport : report
      )
    );
  };

  // Função para renderizar os relatórios já estilizados
  const renderReports = () => {
    return reports.map((report) => (
      <div
        key={report.id}
        className="flex flex-row items-center pt-3 pb-[6px] border-b border-gray-200 last:border-b-0"
      >
        <div>
          <Image
            src={reportIcon}
            alt="Report icon"
          />
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
            onEditSuccess={handleEditReport}
          />
          <DeleteModelCard
            reportId={report.id}
            onDeleteSuccess={() => handleDeleteSuccess(report.id)}
          />
          <button
            onClick={() => openlinkpdf(report.linkpdf)}
            className="cursor-pointer"
          >
            <Image
              src={eyeMenu}
              alt="Visualizar modelo"
            />
          </button>
        </div>
      </div>
    ));
  };

  return (
    // renderização dos relatórios com tratamento de erros e loading
    <div className="bg-white overflow-y-auto h-full flex-1 mx-8 text-white">
      {error && <p className="text-red-500">{error}</p>}

      {/* loading */}
      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <p>Carregando...</p>
        </div>
      ) : reports.length > 0 ? (
        renderReports()
      ) : (
        // Erros
        <div className="w-full h-full flex justify-center items-center">
          <p className="text-gray-500">Nenhum relatório encontrado.</p>
        </div>
      )}
    </div>
  );
};

export default GetReportsMenu;
