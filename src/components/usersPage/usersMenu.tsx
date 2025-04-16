import React, { useState, useMemo } from 'react';
import {Tabs, TabsContent, TabsList, TabsTrigger} from "../ui/tabs";
import { UsersTab } from "./usersTabs";
import { Patient } from "services/Users/GetPatients";
import { HealthPro } from "services/Users/GetHealthPro";
import { Admin } from "services/Users/GetAdmin";
import { AdminsTab } from "./AdminsTab";
import { 
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationPrevious,
    PaginationNext
} from "../ui/pagination";
import { NewUserDialog } from './newUserDialog';
import { PatientInput } from '../../services/Users/PostPatient';

export type User = {
    id: number;
    name: string;
    userRole: 'Patiente' | 'Profissional de Saúde';
}

interface UsersMenuProps {
    patients: Patient[];
    healthPros: HealthPro[];
    admins: Admin[];
    loading: boolean;
    error: string | null;
    itensPerPage?: number;
    onAddPatient: (newPatient: PatientInput) => Promise<PatientInput>;
    onAddHealthPro: (newHealthPro: PatientInput) => Promise<PatientInput>;
  }

export const UsersMenu: React.FC<UsersMenuProps> = ({ 
    patients, 
    healthPros, 
    admins,
    loading, 
    error,
    onAddPatient,
    onAddHealthPro,
    itensPerPage = 6
}) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [activeTab, setActiveTab] = useState<'users' | 'admins'>('users');
    const [searchTerm, setSearchTerm] = useState('');

    const processedItems = useMemo(() => {
        if (activeTab === 'users') {
          return [
            ...patients.map(p => ({
              id: p.id,
              name: p.name,
              userRole: 'Patiente' as const
            })),
            ...healthPros.map(h => ({
              id: h.id,
              name: h.name,
              userRole: 'Profissional de Saúde' as const
            }))
          ].sort((a, b) => a.name.localeCompare(b.name));
        } else {
          return admins.map(a => ({
            id: a.id,
            name: a.name,
            userRole: 'Administrador' as const
          })).sort((a, b) => a.name.localeCompare(b.name));
        }
      }, [activeTab, patients, healthPros, admins]);      

      const removeDiacritics = (str: string) =>
        str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();      
      // Filtragem centralizada
      const filteredItems = useMemo(() => {
        return searchTerm
          ? processedItems.filter(x =>
              removeDiacritics(x.name).includes(removeDiacritics(searchTerm))
            )
          : processedItems;
      }, [processedItems, searchTerm]);
      

    const paginatedItems = useMemo(() => {
        const start = (currentPage - 1) * itensPerPage;
        return filteredItems.slice(start, start + itensPerPage);
      }, [currentPage, itensPerPage, filteredItems]);

      const handlePageChange = (page: number) => {
        setCurrentPage(page);
      };

      const totalItems = filteredItems.length; // Usa a lista já filtrada
      const totalPages = Math.max(Math.ceil(totalItems / itensPerPage), 1);

    return (
        <div className='"bg-white font-firaSans flex-1 rounded-b-[28px] text-white flex flex-col justify-between'>

            <Tabs 
            defaultValue='users' 
            className="w-full h-[500px]" 
            onValueChange={(value) => {
                setActiveTab(value as 'users' | 'admins');
                setCurrentPage(1);
            }}>
                <TabsList className="grid w-full grid-cols-2 border-b-2 bg-white rounded-none">
                    <TabsTrigger 
                        value='users'
                        className='
                        font-firaSans
                        text-[14px]
                        text-black
                        data-[state=active]:text-[#404AA0]
                        data-[state=active]:border-b-2
                        data-[state=active]:rounded-none
                        data-[state=active]:border-[#404AA0]
                        data-[state=active]:bg-transparent'
                    >
                        Usuários
                    </TabsTrigger>
                    <TabsTrigger 
                        value='admins'
                        className='
                        font-firaSans
                        text-[14px]
                        text-black
                        data-[state=active]:text-[#404AA0]
                        data-[state=active]:border-b-2
                        data-[state=active]:rounded-none
                        data-[state=active]:border-[#404AA0]
                        data-[state=active]:bg-transparent'
                        >
                        Administradores
                    </TabsTrigger>
                </TabsList>
                <TabsContent value='users'>
                    <UsersTab 
                        users={paginatedItems.filter(item => item.userRole !== 'Administrador')}
                        loading={loading}
                        error={error}
                        searchTerm={searchTerm}
                        onSearchChange={(term) => {
                          setSearchTerm(term);
                          setCurrentPage(1); // Resetar página ao buscar
                        }}
                        />
                </TabsContent>
                <TabsContent value='admins'>
                    <AdminsTab
                        admins={paginatedItems.filter(item => item.userRole === 'Administrador')}
                        loading={loading}
                        error={error}
                        searchTerm={searchTerm}
                        onSearchChange={(term) => {
                            setSearchTerm(term);
                            setCurrentPage(1); // resetar página       
                        }}                 
                    />
                </TabsContent>
            </Tabs>

            {totalPages >= 0 && (
          <footer className="bg-[#F3EDF7] flex flex-row items-center rounded-b-[28px] py-4 pl-1 pr-4">
            
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                    className={currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''}
                  />
                </PaginationItem>
                <div className='font-firaSans text-[14px] text-black mt-3'>
                  {currentPage} de {totalPages}
                </div>
                <PaginationItem>
                  <PaginationNext
                    onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                    className={currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>

            <div>
              <NewUserDialog 
              onAddSuccess={onAddPatient}
              onAddHealthProSuccess={onAddHealthPro}
              />
            </div>
          </footer>
          )}
        </div>
    );
}