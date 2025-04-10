'use client'

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Layout } from 'components/sidebar/layout';
import CardMenu from 'components/CardMenu';
import { UsersMenu } from 'components/usersPage/usersMenu';
import { Pacient, getPacients } from '../../services/Users/GetPacients';
import { HealthPro, getHealthPro } from 'services/Users/GetHealthPro';
import { Admin, getAdmins } from 'services/Users/GetAdmin';

const UsersPage: React.FC = () => {
  const { status } = useSession();
  const router = useRouter();

  const [pacients, setPacients] = useState<Pacient[]>([]);
  const [healthPros, setHealthPros] = useState<HealthPro[]>([]);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const [pacientsData, healthProsData, AdminData] = await Promise.all([
          getPacients(),
          getHealthPro(),
          getAdmins()
        ]);
        setPacients(pacientsData);
        setHealthPros(healthProsData);
        setAdmins(AdminData);

      } catch (err) {
        console.error('Failed to fetch users:', err);
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (status === 'loading') {
    return <div>Loading...</div>; // ou um spinner bonitinho
  }

  return (
    <Layout>
      <div className="flex flex-1 h-screen justify-around items-center">
        <CardMenu
          titulo ="Lista de usuários"
          cardContent={
            <UsersMenu
              admins={admins} 
              pacients={pacients}
              healthPros={healthPros}
              loading={loading}
              error={error}
            />
          }
        /> 
      </div>
    </Layout>
  );
};

export default UsersPage;
