import React from 'react';
import { UserIcon }  from './userIcon';
import { nextPage } from 'assets';
import Image from 'next/image';

interface UserCardProps {
    userName: string;
    userRole: string;
}

export const UserCard: React.FC<UserCardProps> = ({ userName, userRole }) => {
    return (
        <div className="flex items-center justify-between px-4 py-2 border-b-2">
            <div className="flex items-center gap-4 font-firaSans">
                <UserIcon userName={userName} />
                <span className="text-[#1A1847] text-[16px]">{userName}</span>
            </div>
            <div className="flex items-center gap-4 font-firaSans">
                <span className="font-firaSans text-[14px] text-black">{userRole}</span>
                <Image src={nextPage} alt="Informações de Usuário"/>
            </div>
        </div>
    );
}