'use client'

import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Layout } from 'components/sidebar/layout';
import CardMenu from 'components/CardMenu';
import { UsersMenu } from 'components/usersPage/usersMenu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"


const UsersPage: React.FC = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      //router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>; // ou um spinner bonitinho
  }

  return (
    <Layout>
        <div className="flex flex-1 h-screen justify-around items-center">
            <CardMenu
                titulo ="Lista de usuários"
                cardContent={
                    <UsersMenu />
                }
            /> 
        </div>
    </Layout>
  );
};

export default UsersPage;
