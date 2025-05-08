"use client"

import React from 'react';
import CardMenu from 'components/CardMenu';
import { Layout } from 'components/sidebar/layout';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import GetEditLinksMenu from 'components/GetEditLinksMenu';


const EditLinksPage: React.FC = () => {
  const session = useSession();
  if (session.status === 'unauthenticated') {
    redirect('/login');
  }

  return (
    <Layout>
      <div className="flex flex-1 h-screen justify-around items-center">
      <CardMenu
          titulo="Editar Links"
          cardContent={ <GetEditLinksMenu/> }
        />
      </div>
    </Layout>

  );
};

export default EditLinksPage;