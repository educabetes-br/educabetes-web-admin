import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose
} from '../ui/dialog';
import { LogOut } from 'lucide-react';
import { SidebarMenuItem, SidebarMenuButton } from '../ui/sidebar';

export const ModalLogout = ({
  handleClick,
  handleClose,
  handleCancel,
  handleConfirm,
  isActive,
  open
}: {
  handleClick?: () => void;
  handleClose?: () => void;
  handleCancel?: () => void;
  handleConfirm?: () => void;
  isActive: boolean;
  open: boolean;
}) => {
  return (
    <Dialog onOpenChange={handleClose}>
      <DialogTrigger asChild>
        <SidebarMenuItem className="flex flex-col w-full h-12 group-data-[collapsible=icon]:items-center">
          <SidebarMenuButton
            asChild
            isActive={isActive}
            onClick={handleClick}
            className="flex w-full h-fit hover:bg-lightRed rounded-full p-4 group-data-[collapsible=icon]:justify-center data-[active=true]:bg-lightRed"
          >
            <a className="flex group-data-[collapsible=icon]:!w-full cursor-pointer">
              <LogOut
                style={{ width: 20, height: 20 }}
                className="flex group-data-[collapsible=icon]:!size-5"
              />
              <span className="ml-2 text-sm group-data-[collapsible=icon]:hidden">
                Sair
              </span>
            </a>
          </SidebarMenuButton>
          {!open && <span>Sair</span>}
        </SidebarMenuItem>
      </DialogTrigger>
      <DialogContent className='w-[32rem] p-6'>
        <DialogHeader>
          <DialogTitle className="font-firaSans">Sair</DialogTitle>
          <DialogClose />
        </DialogHeader>
        <p className="font-firaSans">Tem certeza que deseja sair?</p>
        <DialogFooter>
          <DialogClose asChild>
            <button
              className="bg-[#e2e2e2] text-dark font-firaSans p-3 rounded-full"
              onClick={handleCancel}
            >
              Cancelar
            </button>
          </DialogClose>
          <button
            className="bg-blue text-white font-firaSans p-3 rounded-full"
            onClick={handleConfirm}
          >
            Confirmar
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
