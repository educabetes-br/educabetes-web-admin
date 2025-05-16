'use client';

import React from 'react';
import Image from 'next/image';
import { searchIcon } from '@assets';
import { 
  UserCard, 
  User, 
  ExportUsersDialog 
} from '@components';

interface UsersTabProps {
  users: User[];
  allUsers: User[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const UsersTab: React.FC<UsersTabProps> = ({
  users,
  allUsers,
  error,
  searchTerm,
  onSearchChange,
}) => {
  if (error) return <div>Erro: {error}</div>;

  return (
    <div className="flex flex-col bg-white font-firaSans flex-1 rounded-b-[28px] px-8 py-4 gap-6 h-full">
      
      {/* Barra de Pesquisa e Botão de Exportação */}
      <div className='flex flex-row gap-2'>
        <div className="w-[60%]">
          <div className="relative flex justify-center items-center">
            <div className="absolute left-1">
              <Image src={searchIcon} alt="Search icon" />
            </div>
            <input
              type="text"
              placeholder="Buscar usuário..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full focus:outline-none p-3 pl-12 bg-[#ECE6F0] rounded-[28px] text-black"
            />
          </div>
        </div>

        {/* Botão de Exportar para Excel */}
        <ExportUsersDialog allUsers={allUsers} />
      </div>

      {/* Lista de Usuários */}
      <div className="flex flex-col overflow-y-auto mt-6 mb-6 flex-1 scrollbar-hide">
        {users.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-black font-firaSans">
              {searchTerm
                ? "Nenhum usuário encontrado"
                : "Nenhum usuário cadastrado"}
            </p>
          </div>
        ) : (
          users.map(user => (
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
};
