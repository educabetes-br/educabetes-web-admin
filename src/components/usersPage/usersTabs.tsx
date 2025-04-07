import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { searchIcon } from '../../assets/index';
import { UserCard } from './userCard';
import { Pacient } from 'services/Users/GetPacients';
import { HealthPro } from 'services/Users/GetHealthPro';

interface UsersTabProps {
    pacients: Pacient[];
    healthPros: HealthPro[];
    loading: boolean;
    error: string | null;
    onAddPacient: (newPacient: Omit<Pacient, 'id'>) => Promise<Pacient>;
    itesmsPerPage?: number;
}


export const UsersTab: React.FC<UsersTabProps> = ({
    pacients,
    healthPros,
    loading,
    error,
    onAddPacient,
    itesmsPerPage = 6
}) => {

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>Erro: {error}</div>;

    const [searchTerm, setSearchTerm] = useState('');

    const [currentPage, setCurrentPage] = useState(1);

    const sortedUsers = useMemo(() => {
        const combined = [
          ...(pacients || []).map(pacient => ({
            id: pacient.id,
            name: pacient.name,
            userRole: 'Paciente' as const,
          })),
          ...(healthPros || []).map(healthPro => ({
            id: healthPro.id,
            name: healthPro.name,
            userRole: 'Profissional de Saúde' as const,
          }))
        ];
        return combined.sort((a, b) => a.name.localeCompare(b.name));
      }, [pacients, healthPros]);

      const filteredUsers = useMemo(() => {
        return sortedUsers.filter(user => 
          user.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }, [sortedUsers, searchTerm]);

    return (
        <div className=" flex flex-col bg-white font-firaSans flex-1 rounded-b-[28px] px-8 py-4 gap-6">
            { /* Barra de Pesquisa */ }
            <div className="sticky top-0 w-[60%]">
                <div className="relative flex justify-center items-center">
                    <div className="absolute left-1">
                    <Image src={searchIcon} alt="Search icon" />
                    </div>
                    <input
                    type="text"
                    placeholder="Buscar usuário..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1); // Resetar para a primeira página ao buscar
                    }}
                    className="w-full focus:outline-none p-3 pl-12 bg-[#ECE6F0] rounded-[28px] text-black"
                    />
                </div>
            </div>

            { /* Lista de Usuários */ }
            <div className="mx-8 flex flex-col overflow-y-auto mt-6 mb-6 flex-1 scrollbar-hide">
            {filteredUsers.length === 0 ? (
            <div className="flex justify-center items-center h-full">
                <p className="text-black font-firaSans">
                {searchTerm 
                    ? "Nenhum usuário encontrado" 
                    : "Nenhum usuário cadastrado"
                }
                </p>
            </div>
            ) : (
            filteredUsers.map(user => (
                <UserCard 
                key={`${user.userRole}-${user.id}`}
                userName={user.name}
                userRole={user.userRole}
                />
            ))
            )}
            </div>
        </div>
    );
}