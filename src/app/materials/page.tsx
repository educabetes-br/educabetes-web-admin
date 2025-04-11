"use client"

import React, { useState, useEffect } from 'react';
import CardMenu from 'components/CardMenu';
import { Layout } from 'components/sidebar/layout';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import GetMaterialsMenu from 'components/GetMaterialsMenu';


const MaterialsPage: React.FC = () => {
  const session = useSession();
  if (session.status === 'unauthenticated') {
    redirect('/login');
  }

  return (
    <Layout>
      <div className="flex flex-1 h-screen justify-around items-center">
      <CardMenu
          titulo="Materiais Educativos"
          cardContent={ <GetMaterialsMenu/> }
        />
      </div>
    </Layout>

  );
};

export default MaterialsPage;