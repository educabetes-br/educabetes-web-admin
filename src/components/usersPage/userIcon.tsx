import React from 'react'; 

interface UserIconProps {
    userName: string;
}

export const UserIcon: React.FC<UserIconProps> = ({ userName }) => {
    const getInitials = (name: string): string => {
        // Cria um vetor com os nomes separados por espaço
        const names = name.split(' ');

        // Pega a primeira letra do primeiro nome e a primeira letra do último nome (se houver)
        let initials = names[0].charAt(0).toUpperCase();
        
        if (names.length > 1) {
            initials += names[names.length - 1].charAt(0).toUpperCase();
        }
        
        return initials;
    };

    const initials = getInitials(userName || '');

    return (
        <div className="flex items-center justify-center w-10 h-10 bg-[#404AA0] rounded-full text-[#DFE0FF] font-firaSans text-[16px] font-semibold">
            {initials}
        </div>
    );
}