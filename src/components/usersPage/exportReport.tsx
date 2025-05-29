"use client";

import dynamic from "next/dynamic";
import React from "react";
import { 
  Dialog, 
  DialogTrigger, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter, 
  DialogClose,
  ShadButton,
  User 
} from "@components";
import { 
  Upload, 
  FileSpreadsheet 
} from "lucide-react";
import * as XLSX from "xlsx";
import {StatesOptions} from '@utils';


// Importação dinâmica (evita o erro)
const UserPDFExport = dynamic(() => import('./userPdfExport').then(mod => mod.UserPDFExport), {
  ssr: false,
});

interface ExportUsersDialogProps {
  allUsers: User[];
}

export function getStateLabel(key: string): string {
  const found = StatesOptions.find(option => option.key === key);
  return found ? found.value : key;
}

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);


function exportUsersToExcel(allUsers: User[]) {
  const formatUser = (user: User) => ({
    Nome: capitalize(user.name),
    Estado: getStateLabel(user.userState),
    Cidade: user.userCity,
    Tipo: user.userRole,
  });

  const formattedUsers = allUsers.map(formatUser);

  const ws = XLSX.utils.json_to_sheet(formattedUsers);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Usuários');
  XLSX.writeFile(wb, 'EducaBetes_Usuários.xlsx');
}

export const ExportUsersDialog: React.FC<ExportUsersDialogProps> = ({ allUsers }) => {
  const handleExportExcel = () => {
    exportUsersToExcel(allUsers);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#ECE6F0] rounded-full hover:bg-[#d6cfe0] transition">
          <Upload size={18} strokeWidth={2} color="black" />
          <span className="text-black font-firaSans">Exportar Usuários</span>
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-md font-firaSansCondensed">
        <DialogHeader className="flex w-full bg-[#ECE6F0] pt-6 pb-2 items-start pl-6">
          <DialogTitle className="text-[24px] text-[#1A1847] leading-8 font-firaSans">Exportar Usuários</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          <UserPDFExport allUsers={allUsers} />
          <ShadButton
            onClick={handleExportExcel}
            className="flex gap-2 justify-start text-xl font-normal bg-transparent text-black hover:bg-[#d6cfe0] w-full"
          >
            <FileSpreadsheet size={18} />
            Exportar como Excel
          </ShadButton>
        </div>

        <DialogFooter className="flex gap-4 justify-end p-6 bg-[#ECE6F0]">
          <DialogClose asChild>
            <ShadButton className="bg-[#404AA0] text-[#DFE0FF] leading-5 font-medium text-[14px] px-4 py-2 rounded-[100px] transition-all hover:bg-[#303880]">Fechar</ShadButton>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};