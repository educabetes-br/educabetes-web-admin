import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Report, getReports } from "services/Reports/GetReport";
import { reportIcon, eyeMenu } from "../../assets/index";
import DeleteModelCard from "../ModelList/DeleteModel";
import EditModelDialog from "components/ModelList/EditModelDialog";

const GetReportsMenu: React.FC = () => {
  const [reports, setReports] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async (): Promise<void> => {
      try {
        const response = await getReports();
        setReports(response);
      } catch (err) {
        console.error("Failed to fetch reports:", err);
        setError("Failed to fetch reports. Please try again later.");
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="bg-white h-full rounded-[28px] px-8 text-white overflow-y-auto">
      <header>
        <h1>Relatórios</h1>
      </header>

      <div>
        {error && <p className="text-red-500">{error}</p>}
        {Array.isArray(reports) && reports.length > 0 ? (
          reports.map((report, index) => (
            <div key={index} className={`flex flex-row items-center pt-3 pb-[6px] ${index !== reports.length - 1 ? 'border-b' : ''} `}>
              <div>
                <Image src={reportIcon} alt="Report icon"/>
              </div>

              <div className="flex flex-col flex-1 pl-4 ">
                <p className="text-[#49454F] text-[12px] font-medium leading-4">{report.tipo}</p>  
                <p className="text-[#1A1847] text-base leading-6">{report.titulo}</p>
              </div>

              <div className="flex flex-row ml-auto gap-4 pl-8">
                <EditModelDialog />
                <DeleteModelCard />
                <Image src={eyeMenu} alt="Visualizar modelo" />
              </div>
            </div>
          ))
        ) : (
          !error && <p></p>
        )}
      </div>
    </div>
  );
};

export default GetReportsMenu;