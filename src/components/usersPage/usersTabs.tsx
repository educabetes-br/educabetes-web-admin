import React from 'react';
import Image from 'next/image';
import { searchIcon } from '../../assets/index';
import { UserCard } from './userCard';
import { User } from './usersMenu';
import { Upload } from 'lucide-react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import StatesOptions from 'utils/stateOptions';
import { LogoTitleFile } from '../../assets/index';

export function getStateLabel(key: string): string {
  const found = StatesOptions.find(option => option.key === key);
  return found ? found.value : key;
}

interface UsersTabProps {
  users: User[]; // já filtrados e paginados
  allUsers: User[]; // todos os usuários
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

  const handleExportPDF = () => {
    const doc = new jsPDF();
    const imageHeight = 30;
    const spacingAfterImage = 4;
    const titleYOffset = 10 + imageHeight + spacingAfterImage;
  
    const img = new window.Image();
    img.src = LogoTitleFile.src;
  
    img.onload = () => {
      doc.addImage(img, 'PNG', 14, 10, 60, imageHeight);
  
      doc.setFontSize(18);
      doc.text('Lista de Pacientes', 14, titleYOffset);
  
      autoTable(doc, {
        startY: titleYOffset + 6,
        head: [['Nome', 'Estado', 'Cidade']],
        body: allUsers
          .filter(user => user.userRole === 'Paciente')
          .map(user => [
            capitalize(user.name) ?? 'N/A',
            getStateLabel(user.userState) ?? 'N/A',
            user.userCity ?? 'N/A',
          ]),
        styles: {
          font: 'times',
          fontSize: 11,
          cellPadding: 4,
          textColor: [40, 40, 40],
          lineColor: [220, 220, 220],
          lineWidth: 0.5,
        },
        headStyles: {
          fillColor: [64, 74, 160],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
          halign: 'center',
        },
        bodyStyles: {
          halign: 'left',
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245],
        },
        theme: 'striped',
        didDrawPage: function (data) {
          const pageNumber = doc.internal.getCurrentPageInfo().pageNumber;
          const pageCount = doc.getNumberOfPages();
          doc.setFontSize(10);
          doc.text(
            `Página ${pageNumber} de ${pageCount}`,
            doc.internal.pageSize.getWidth() - 40,
            doc.internal.pageSize.getHeight() - 10
          );
        },
      });
  
      const currentY = doc.lastAutoTable.finalY + 10;
  
      doc.setFontSize(18);
      doc.text('Lista de Profissionais de Saúde', 14, currentY);
  
      autoTable(doc, {
        startY: currentY + 6,
        head: [['Nome', 'Estado', 'Cidade']],
        body: allUsers
          .filter(user => user.userRole === 'Profissional de Saúde')
          .map(user => [
            capitalize(user.name) ?? 'N/A',
            getStateLabel(user.userState) ?? 'N/A',
            user.userCity ?? 'N/A',
          ]),
        styles: {
          font: 'times',
          fontSize: 11,
          cellPadding: 4,
          textColor: [40, 40, 40],
          lineColor: [220, 220, 220],
          lineWidth: 0.5,
        },
        headStyles: {
          fillColor: [64, 74, 160],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
          halign: 'center',
        },
        bodyStyles: {
          halign: 'left',
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245],
        },
        theme: 'striped',
        didDrawPage: function (data) {
          const pageNumber = doc.internal.getCurrentPageInfo().pageNumber;
          const pageCount = doc.getNumberOfPages();
          doc.setFontSize(10);
          doc.text(
            `Página ${pageNumber} de ${pageCount}`,
            doc.internal.pageSize.getWidth() - 40,
            doc.internal.pageSize.getHeight() - 10
          );
        },
      });
  
      doc.save('usuarios.pdf');
    };
  };
  
  
  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  

  return (
    <div className="flex flex-col bg-white font-firaSans flex-1 rounded-b-[28px] px-8 py-4 gap-6 h-full">
      
      {/* Barra de Pesquisa */}
      <div className='flex felx-row gap-6'>
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
                onSearchChange(e.target.value);
              }}
              className="w-full focus:outline-none p-3 pl-12 bg-[#ECE6F0] rounded-[28px] text-black"
            />
          </div>
        </div>

        {/* Botão de Exportar Usuários */}
        <button
          onClick={handleExportPDF}
          className='flex items-center gap-2 px-4 py-2 bg-[#ECE6F0] rounded-full hover:bg-[#d6cfe0] transition'
        >
          <Upload size={18} strokeWidth={2} color="black" />
        </button>
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
