import React from "react";
import Image from "next/image";
import { searchIcon } from "../../assets/index";
import { UserCard } from "./userCard";

interface Admin {
  id: number;
  name: string;
  userRole: 'Administrador';
}

interface AdminsTabProps {
  admins: Admin[]; // já filtrados e paginados
  loading: boolean;
  error: string | null;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const AdminsTab: React.FC<AdminsTabProps> = ({
  admins,
  loading,
  error,
  searchTerm,
  onSearchChange
}) => {
  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div className="flex flex-col bg-white font-firaSans flex-1 rounded-b-[28px] px-8 py-4 gap-6 h-full">
      
      {/* Barra de Pesquisa */}
      <div className="sticky top-0 w-[60%]">
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

      {/* Lista de Administradores */}
      <div className="mx-8 flex flex-col overflow-y-auto mt-6 mb-6 flex-1 scrollbar-hide">
        {admins.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-black font-firaSans">
              {searchTerm
                ? "Nenhum administrador encontrado"
                : "Nenhum administrador cadastrado"}
            </p>
          </div>
        ) : (
          admins.map(admin => (
            <UserCard
              key={`${admin.userRole}-${admin.id}`}
              userName={admin.name}
              userRole={admin.userRole}
            />
          ))
        )}
      </div>
    </div>
  );
};
