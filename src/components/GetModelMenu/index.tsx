import React from 'react';
import Image from 'next/image';
import { reportIcon, eyeMenu } from '../../assets/index';
import DeleteModelCard from '../ModelList/DeleteModel';
import EditModelDialog from '../ModelList/EditModelDialog';
import { Report } from 'services/Reports/GetReport';

interface GetReportsMenuProps {
  reports: Report[];
  loading: boolean;
  error: string | null;
  onUpdateReport: (updatedReport: Report) => void;
  onDeleteReport: (deletedId: number) => void;
}

const GetReportsMenu: React.FC<GetReportsMenuProps> = ({
  reports,
  loading,
  error,
  onUpdateReport,
  onDeleteReport
}) => {
  
  const openlinkpdf = (link: string) => {
    window.open(link, '_blank');
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

  if (reports.length === 0) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <p className="text-gray-500">Nenhum relatório encontrado.</p>
      </div>
    );
  }

  return (
    <div className="bg-white overflow-y-auto h-full flex-1 mx-8 text-white">
      {reports.map((report) => (
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
      ))}
    </div>
  );
};

export default GetReportsMenu;