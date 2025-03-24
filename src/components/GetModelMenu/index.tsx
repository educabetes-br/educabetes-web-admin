import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Report, getReports } from "services/Reports/GetReport";
import { reportIcon, eyeMenu } from "../../assets/index";
import DeleteModelCard from "../ModelList/DeleteModel";
import EditModelDialog from "components/ModelList/EditModelDialog";

const GetReportsMenu: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchReports = async (): Promise<void> => {
      setLoading(true); // Ensure loading is set to true before fetching
      try {
        const response = await getReports();
        setReports(response);
      } catch (err) {
        console.error("Failed to fetch reports:", err);
        setError("Failed to fetch reports. Please try again later.");
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchReports();
  }, []);

  const openlinkpdf = (link: string) => {
    window.open(link, "_blank");
  };

  const handleDeleteSuccess = (deletedReportId: Number) => {
    setReports((prevReports) =>
      prevReports.filter((report) => report.id !== Number(deletedReportId))
    );
  };

  const handleEditReport = (updatedReport: Report) => {
    setReports((prevReports) =>
      prevReports.map((report) =>
        report.id === updatedReport.id ? updatedReport : report
      )
    );
  };
  

  return (
    <div className="bg-white overflow-y-auto h-full flex-1 mx-8 text-white">

      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <div className="w-full h-full justify-center items-center">
          <p>Carregando...</p>
        </div>
      ) : Array.isArray(reports) && reports.length > 0 ? (
        reports.map((report, index) => (
          <div
          // Recebe o id do relatório e cria um card com as informações do relatório
            key={report.id}
            className={`flex flex-row items-center pt-3 pb-[6px] ${
              index !== reports.length - 1 ? "border-b" : ""
            }`}
          >

          {/* svg a esquerda */}
            <div>
              <Image src={reportIcon} alt="Report icon" />
            </div>
            
            {/* Informações do relatório */}
            <div className="flex flex-col flex-1 pl-4">
              <p className="text-[#49454F] text-[12px] font-medium leading-4">
                {report.tipo}
              </p>
              <p className="text-[#1A1847] text-base leading-6">
                {report.titulo}
              </p>
            </div>

            {/* Botões de ação (update, delete e view) */}
            <div className="flex flex-row ml-auto gap-4 pl-8">
              <EditModelDialog 
                reportId={report.id}
                titulo={report.titulo}
                linkpdf={report.linkpdf}
                tipo={report.tipo}
                onEditSuccess={(updatedReport: Report) => handleEditReport(updatedReport)}
              />
              <DeleteModelCard
                reportId={report.id}
                onDeleteSuccess={() => handleDeleteSuccess(report.id)}
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
      ) : (
        !error && <p>Nenhum relatório encontrado.</p>
      )}
    </div>
  );
};

export default GetReportsMenu;