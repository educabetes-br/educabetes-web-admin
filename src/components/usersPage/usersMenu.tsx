import React, { useState, useMemo } from 'react';
import {
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger,
  UsersTab,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  NewUserDialog,
  AdminsTab,
} from "@components";
import { 
  Patient, 
  HealthPro, 
  Admin, 
  PatientInput, 
  HealthProInput, 
  AdminInput, 
  userState 
} from "@services";

export type User = {
    id: number;
    name: string;
    userState: userState;
    userCity: string;
    userRole: 'Paciente' | 'Profissional de Saúde';
}

interface UsersMenuProps {
    patients: Patient[];
    healthPros: HealthPro[];
    admins: Admin[];
    loading: boolean;
    error: string | null;
    itensPerPage?: number;
    onAddPatient: (newPatient: PatientInput) => Promise<PatientInput>;
    onAddHealthPro: (newHealthPro: HealthProInput) => Promise<HealthProInput>;
    onAddAdmin: (newAdmin: AdminInput) => Promise<AdminInput>;
  }

export const UsersMenu: React.FC<UsersMenuProps> = ({ 
    patients, 
    healthPros, 
    admins,
    loading, 
    error,
    onAddPatient,
    onAddHealthPro,
    onAddAdmin,
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
              userState: p.userState,
              userCity: p.userCity,
              userRole: 'Paciente' as const
            })),
            ...healthPros.map(h => ({
              id: h.id,
              name: h.name,
              userState: h.userState,
              userCity: h.userCity,
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
                        allUsers={filteredItems.filter(item => item.userRole !== 'Administrador')}
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
              onAddAdminSucess={onAddAdmin}
              />
            </div>
          </footer>
          )}
        </div>
    );
}