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

  // Função para adicionar um novo relatório
  const handleAddReport = async (newReport: ReportInput): Promise<Report> => {
    try {
      return await addReport(newReport);
    } catch (err) {
      alert('Erro ao adicionar relatório.');
      throw err;
    }
  };

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
                    asChild
                    key={item.title}
                    className="h-12"
                    onClick={(e) => {
                      if (item.action) {
                        e.preventDefault();
                        item.action();
                      }
                    }}
                  >
                    {item.title === 'Novo Modelo' ? (
                      <div onClick={() => setIsCardOpen(true)}>
                        <item.icon className="!size-5 mr-4" />
                        {item.title}
                      </div>
                    ) : (
                      <a href={item.title}>
                        <item.icon className="!size-5 mr-4" />
                        {item.title}
                      </a>
                    )}
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
    </>
  );
}
