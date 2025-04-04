import { useEffect, useState } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupContent,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenu,
  useSidebar,
  SidebarSeparator
} from 'components/ui/sidebar';
import {
  AlignJustify,
  CircleUser,
  FileDown,
  ScrollText,
  UserPlus
} from 'lucide-react';
import { ButtonSidebar } from './button-sidebar';
import { ModalLogout } from './modal-logout';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

const items = {
  sidebar: [
    {
      title: 'Usuários',
      url: '/users',
      icon: CircleUser
    },
    {
      title: 'Modelos',
      url: '/report',
      icon: FileDown
    },
    {
      title: 'Materiais',
      url: '/materials',
      icon: ScrollText
    }
  ],
  button: [
    { title: 'Novo Usuário', icon: UserPlus, url: '' },
    { title: 'Novo Modelo', icon: FileDown, url: '' }
  ]
};

export default function SidebarComponent() {
  const { open, toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const router = useRouter();
  const [selected, setSelected] = useState<number | null>(null);

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/login');
    } catch (error) {
      console.error('Failed to logout');
    }
  };

  useEffect(() => {
    console.log('selected', selected);
  }, [selected]);

  return (
    <Sidebar
      collapsible="icon"
      className="font-firaSans text-dark text-sm font-medium tracking-[0.1px] min-w-fit"
    >
      <SidebarHeader className="flex flex-row w-full justify-between items-center group-data-[collapsible=icon]:justify-center p-4">
        {open && <h1>Educabetes</h1>}
        <button onClick={toggleSidebar}>
          <AlignJustify />
        </button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col gap-4">
            <ButtonSidebar items={items.button} />
            <SidebarMenu className="group-data-[collapsible=icon]:gap-4">
              {items.sidebar.map((item, index) => (
                <SidebarMenuItem
                  key={index}
                  className="flex flex-col w-full h-12 group-data-[collapsible=icon]:items-center"
                >
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.includes(item.url) || selected === index}
                    onClick={() => setSelected(index)}
                    className="flex w-full h-fit hover:bg-lightRed rounded-full p-4 group-data-[collapsible=icon]:justify-center data-[active=true]:bg-lightRed"
                  >
                    <a
                      href={item.url}
                      className="flex group-data-[collapsible=icon]:!w-full"
                    >
                      <item.icon
                        style={{ width: 20, height: 20 }}
                        className="flex group-data-[collapsible=icon]:!size-5"
                      />
                      <span className="ml-2 text-sm group-data-[collapsible=icon]:hidden">
                        {item.title}
                      </span>
                    </a>
                  </SidebarMenuButton>
                  {!open && <span>{item.title}</span>}
                </SidebarMenuItem>
              ))}
              <SidebarSeparator className="bg-[#939090]" />
              <ModalLogout
                open={open}
                isActive={pathname.includes('/logout') || selected === 3}
                handleClick={() => setSelected(3)}
                handleClose={() => {
                  setSelected(null);
                }}
                handleCancel={() => setSelected(null)}
                handleConfirm={handleLogout}
              />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
