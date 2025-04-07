import { User } from "lucide-react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "../ui/tabs";
import { UsersTab } from "./usersTabs";

export const UsersMenu: React.FC = () => {

    return (
        <Tabs defaultValue='users' className="w-full h-[500px]">
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
                <UsersTab />
            </TabsContent>
            <TabsContent value='admins'>
                {/* Aqui você pode adicionar o conteúdo para a aba de administradores */}
                <p>Conteúdo da aba de administradores</p>
            </TabsContent>
        </Tabs>
    );
}