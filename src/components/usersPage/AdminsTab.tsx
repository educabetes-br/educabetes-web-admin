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
  if (loading) {
    return (
      <div className="bg-white  flex-1 rounded-b-[28px] text-white flex flex-col">
        <div
          className="w-full h-full flex justify-center items-center"
          role="status"
        >
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-[#1A1847]"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
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
