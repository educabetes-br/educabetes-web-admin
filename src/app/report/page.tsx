"use client"

import React, { useState, useEffect } from 'react';
import CardMenu from 'components/CardMenu';
import GetReportsMenu from 'components/GetModelMenu';
import { Report, getReports } from 'services/Reports/GetReport';
import { addReport, ReportInput } from 'services/Reports/PostReport';

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
  const handleAddReport = async (newReport: ReportInput): Promise<Report> => {
    try {
      const addedReport = await addReport(newReport);
      setReports(prev => [...prev, addedReport]);
      return addedReport;
    } catch (err) {
      alert('Erro ao adicionar relatório.');
      throw err;
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
      titulo="Modelos de Receitas e Relatórios"
      cardContent={
        <GetReportsMenu 
          reports={reports} 
          loading={loading} 
          error={error}
          onUpdateReport={handleUpdateReport}
          onDeleteReport={handleDeleteReport}
          onAddReport={handleAddReport}
        />
      }
    />
  );
};

export default ReportsPage;