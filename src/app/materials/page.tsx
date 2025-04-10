"use client"

import React, { useState, useEffect } from 'react';
import CardMenu from 'components/CardMenu';
import GetReportsMenu from 'components/GetModelMenu';
import { Report, getReports } from 'services/Reports/GetReport';
import { addReport, ReportInput } from 'services/Reports/PostReport';
import { Layout } from 'components/sidebar/layout';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import EducationalMaterials from 'components/EducationalMaterials';


const ReportsPage: React.FC = () => {
  const session = useSession();
  if (session.status === 'unauthenticated') {
    redirect('/login');
  }

  return (
    <Layout>
      <div className="flex flex-1 h-screen justify-around items-center">
        <EducationalMaterials/>
      </div>
    </Layout>

  );
};

export default ReportsPage;