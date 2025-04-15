'use client'

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Layout } from 'components/sidebar/layout';
import CardMenu from 'components/CardMenu';
import { UsersMenu } from 'components/usersPage/usersMenu';
import { Patient, getPatients } from '../../services/Users/GetPatients';
import { HealthPro, getHealthPro } from 'services/Users/GetHealthPro';
import { Admin, getAdmins } from 'services/Users/GetAdmin';
import { PatientInput, postPatient } from 'services/Users/PostPatient';

const UsersPage: React.FC = () => {
  const { status } = useSession();
  const router = useRouter();

  const [patients, setPatients] = useState<Patient[]>([]);
  const [healthPros, setHealthPros] = useState<HealthPro[]>([]);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [, setNewPatient] = useState<PatientInput[]>([]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const [patientsData, healthProsData, AdminData] = await Promise.all([
          getPatients(),
          getHealthPro(),
          getAdmins()
        ]);
        setPatients(patientsData);
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

  const handleAddPatient = async (newPatient: PatientInput): Promise<PatientInput> => {
    console.log('Entrou nessa func1');
    try {
      const addedPatient = await postPatient(newPatient);
      setNewPatient(prev => [...prev, addedPatient]);
      return addedPatient;
    } catch (err) {
      alert('Erro ao adicionar patiente.');
      throw err;
    }
  }

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
              patients={patients}
              healthPros={healthPros}
              loading={loading}
              error={error}
              onAddPatient={handleAddPatient}
            />
          }
        /> 
      </div>
    </Layout>
  );
};

export default UsersPage;
