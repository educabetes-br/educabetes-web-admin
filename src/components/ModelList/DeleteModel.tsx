import React, { useState } from "react";
import Image from "next/image";
import { trash, redTrash } from "../../assets/index";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "../ui/dialog";

const DeleteModelCard: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    console.log("Modelo excluído com sucesso!");
    alert("Modelo excluído com sucesso!");
    setOpen(false);
  }
  
  return(
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button onClick={() => setOpen(true)}>
          <Image src={trash} alt="Adicionar modelo" />
        </button>
      </DialogTrigger>

      <DialogContent className="w-[360px]">
        <DialogHeader className="items-center pt-6">
          <Image src={redTrash} alt="Fechar" />
        </DialogHeader>

        <div className="text-center items-center flex flex-col gap-4 px-6">
          <h1 className="text-[24px] leading-[32px] text-[#1A1847] w-[60%]">
            Deseja excluir o modelo?
          </h1>
          <p className="text[14px] leading-[20px] text-left">
          Esta ação não poderá ser desfeita. Se for necessário, você pode editar o modelo em vez de excluir.
          </p>
        </div>

        <DialogFooter className="flex flex-row justify-end gap-2 border-t p-6">
          <DialogClose asChild>
            <button className="p-2 text-[14px] leading-[20px] text-[#404AA0] font-medium rounded-lg">
              Cancelar
            </button>
          </DialogClose>

          <button type="submit" 
          onClick={handleDelete}
          className="p-2 text-[14px] leading-[20px] text-[#404AA0] font-medium rounded-lg">
            Excluir
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
};

export default DeleteModelCard;