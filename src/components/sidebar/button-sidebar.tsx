'use client';

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

export function ButtonSidebar({
  items
}: {
  items: {
    title: string;
    icon: LucideIcon;
    url: string;
  }[];
}) {
  const { isMobile } = useSidebar();

  return (
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
                <DropdownMenuItem asChild key={item.title} className="h-12">
                  <a href={item.url}>
                    <item.icon className="!size-5 mr-4" />
                    {item.title}
                  </a>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          ) : null}
        </SidebarMenuItem>
      </DropdownMenu>
    </SidebarMenu>
  );
}
