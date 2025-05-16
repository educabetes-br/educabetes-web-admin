'use client'

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Layout, CardMenu, UsersMenu } from '@components';
import {
  Admin,
  getAdmins,
  PatientInput,
  postPatient,
  HealthProInput,
  postHealthPro,
  AdminInput,
  postAdmin, 
  Patient, 
  getPatients,  
  HealthPro, 
  getHealthPro 
} from '@services';

const UsersPage: React.FC = () => {
  const { status } = useSession();
  const router = useRouter();

  const [patients, setPatients] = useState<Patient[]>([]);
  const [healthPros, setHealthPros] = useState<HealthPro[]>([]);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddPatient = async (newPatient: PatientInput): Promise<PatientInput> => {
    try {
      const addedPatient = await postPatient(newPatient);
      await fetchUsers();
      return addedPatient;
    } catch (err) {
      alert('Erro ao adicionar paciente.');
      throw err;
    }
  }

  const handleAddHealthPro = async (newHealthPro: HealthProInput): Promise<HealthProInput> => {
    try {
      const addedHealthPro = await postHealthPro(newHealthPro);
      await fetchUsers();
      return addedHealthPro;
    } catch (err) {
      alert('Erro ao adicionar profissional.');
      throw err;
    }
  }

  const handleAddAdmin = async (newAdmin: AdminInput): Promise<AdminInput> => {
    try {
      const addedAdmin = await postAdmin(newAdmin);
      await fetchUsers();
      return addedAdmin;
    } catch (err) {
      alert('Erro ao adicionar admin.');
      throw err;
    }
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
              onAddHealthPro={handleAddHealthPro}
              onAddAdmin={handleAddAdmin}
            />
          }
        /> 
      </div>
    </Layout>
  );
};

export default UsersPage;

