'use client';

import { useState } from 'react';
import { LucideIcon, Plus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from 'components/ui/dropdown-menu';
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenu,
  useSidebar
} from 'components/ui/sidebar';
import NewModelCard from 'components/ModelFunctions/NewModelCard';
import { addReport, ReportInput } from 'services/Reports/PostReport';
import { Report } from 'services/Reports/GetReport';
import NewUserCard from 'components/usersPage/newUserCard';
import { PatientInput, postPatient } from 'services/Users/PostPatient';
import { HealthProInput, postHealthPro } from 'services/Users/PostHealthPro';
import { AdminInput, postAdmin } from 'services/Users/PostAdmin';

export function ButtonSidebar({
  items
}: {
  items: {
    title: string;
    icon: LucideIcon;
    action?: () => void;
  }[];
}) {
  const { isMobile } = useSidebar();
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isUserCardOpen, setIsUserCardOpen] = useState(false);
  const [, setNewPatient] = useState<PatientInput[]>([]);
  const [, setNewHealthPro] = useState<HealthProInput[]>([]);
  const [, setNewAdmin] = useState<AdminInput[]>([]);

  // Função para adicionar um novo relatório
  const handleAddReport = async (newReport: ReportInput): Promise<Report> => {
    try {
      return await addReport(newReport);
    } catch (err) {
      alert('Erro ao adicionar relatório.');
      throw err;
    }
  };

  const handleAddPatient = async (newPatient: PatientInput): Promise<PatientInput> => {
      try {
        const addedPatient = await postPatient(newPatient);
        setNewPatient(prev => [...prev, addedPatient]);
        return addedPatient;
      } catch (err) {
        alert('Erro ao adicionar paciente.');
        throw err;
      }
    }
  
    const handleAddHealthPro = async (newHealthPro: HealthProInput): Promise<HealthProInput> => {
      try {
        const addedHealthPro = await postHealthPro(newHealthPro);
        setNewHealthPro(prev => [...prev, addedHealthPro]);
        return addedHealthPro;
      } catch (err) {
        alert('Erro ao adicionar profissional.');
        throw err;
      }
    }
  
    const handleAddAdmin = async (newAdmin: AdminInput): Promise<AdminInput> => {
      try {
        const addedAdmin = await postAdmin(newAdmin);
        setNewAdmin(prev => [...prev, addedAdmin]);
        return addedAdmin;
      } catch (err) {
        alert('Erro ao adicionar admin.');
        throw err;
      }
    }

  return (
    <>
      <SidebarMenu>
        <DropdownMenu>
          <SidebarMenuItem>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton className="flex justify-center h-14 rounded-full bg-[#00A0AE] hover:!bg-[#73d9e2] group-data-[collapsible=icon]:!w-full group-data-[collapsible=icon]:!h-14 group-data-[collapsible=icon]:!rounded-xl">
                <Plus className="!size-6" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            {items?.length ? (
              <DropdownMenuContent
                side={isMobile ? 'bottom' : 'right'}
                align={isMobile ? 'end' : 'start'}
                className="min-w-56 rounded-lg bg-sidebar font-firaSansCondensed text-base"
              >
                {items.map((item) => (
                  <DropdownMenuItem
                  key={item.title}
                  className="h-12"
                  onClick={() => {
                    if (item.title === 'Novo Modelo') {
                      setIsCardOpen(true);
                    } else if (item.title === 'Novo Usuário') {
                      setIsUserCardOpen(true);
                    }
                  }}
                >
                  <div className="flex items-center gap-4 cursor-pointer">
                    <item.icon className="!size-5" />
                    {item.title}
                  </div>
                </DropdownMenuItem>                
                ))}
              </DropdownMenuContent>
            ) : null}
          </SidebarMenuItem>
        </DropdownMenu>
      </SidebarMenu>

      <NewModelCard
        isOpen={isCardOpen}
        onClose={() => setIsCardOpen(false)}
        onAddSuccess={handleAddReport}
      />

      <NewUserCard
        isOpen={isUserCardOpen}
        onClose={() => setIsUserCardOpen(false)}
        onAddSuccess={handleAddPatient}
        onAddHealthProSuccess={handleAddHealthPro}
        onAddAdminSuccess={handleAddAdmin}
      />

    </>
  );
}
