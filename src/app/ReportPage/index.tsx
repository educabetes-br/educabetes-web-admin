import React, { useState, useEffect } from 'react';
import CardMenu from 'components/CardMenu';
import GetReportsMenu from 'components/GetModelMenu';
import NewModelDialog from 'components/ModelList/NewModelDialog';
import { Report, getReports } from 'services/Reports/GetReport';
import { addReport } from 'services/Reports/PostReport';

const ReportsPage: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carrega os relatórios inicialmente
  useEffect(() => {
    const loadReports = async () => {
      try {
        const data = await getReports();
        setReports(data);
      } catch (err) {
        setError('Falha ao carregar relatórios.');
      } finally {
        setLoading(false);
      }
    };
    loadReports();
  }, []);

  // Função para adicionar um novo relatório
  const handleAddReport = async (newReport: Omit<Report, 'id'>) => {
    try {
      const addedReport = await addReport(newReport);
      setReports(prev => [...prev, addedReport as unknown as Report]);
    } catch (err) {
      alert('Erro ao adicionar relatório.');
      throw err; // Permite que o NewModelDialog lide com o erro
    }
  };

  // Função para atualizar um relatório existente
  const handleUpdateReport = (updatedReport: Report) => {
    setReports(prev =>
      prev.map(report => (report.id === updatedReport.id ? updatedReport : report))
    );
  };

  // Função para remover um relatório
  const handleDeleteReport = (deletedId: number) => {
    setReports(prev => prev.filter(report => report.id !== deletedId));
  };

  return (
    <CardMenu
      children={
        <GetReportsMenu 
          reports={reports} 
          loading={loading} 
          error={error}
          onUpdateReport={handleUpdateReport}
          onDeleteReport={handleDeleteReport}
        />
      }
      children2={<NewModelDialog onReportAdded={handleAddReport} />}
    />
  );
};

export default ReportsPage;