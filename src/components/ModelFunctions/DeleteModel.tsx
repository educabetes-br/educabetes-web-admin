import React, { useState } from "react";
import Image from "next/image";
import { trash, redTrash } from "../../assets/index";
import { deleteReport } from "../../services/Reports/DeleteReport";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "../ui/dialog";

interface DeleteModelCardProps {
  reportId: number; // Recebe o ID do relatório que será excluído
  onDeleteSuccess?: () => void; // Callback para notificar o sucesso da exclusão
}

const DeleteModelCard: React.FC<DeleteModelCardProps> = ({ reportId, onDeleteSuccess }) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  

  const handleDelete = async () => {
    try {
      setIsSubmitting(true);
      // Chama a função de exclusão da API
      await deleteReport(reportId);

      // Fecha o diálogo após a exclusão
      setOpen(false);

      // Chama o callback de sucesso, se fornecido
      if (onDeleteSuccess) {
        onDeleteSuccess();
      }
    } catch (error) {
      alert("Erro ao excluir o modelo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button onClick={() => setOpen(true)}>
          <Image src={trash} alt="Excluir modelo" />
        </button>
      </DialogTrigger>

      <DialogContent className="w-[360px]">
        <DialogHeader className="items-center pt-6">
          <Image src={redTrash} alt="Ícone de lixeira" />
        </DialogHeader>

        <div className="text-center items-center flex flex-col gap-4 px-6">
          <h1 className="text-[24px] leading-[32px] text-[#1A1847] w-[60%]">
            Deseja excluir o modelo?
          </h1>
          <p className="text-[14px] leading-[20px] text-left">
            Esta ação não poderá ser desfeita. Se for necessário, você pode editar o modelo em vez de excluir.
          </p>
        </div>

        <DialogFooter className="flex flex-row justify-end gap-2 border-t p-6">
          <DialogClose asChild>
            <button className="p-2 text-[14px] leading-[20px] text-[#404AA0] font-medium rounded-lg border border-transparent hover:border-[#404AA0]">
              Cancelar
            </button>
          </DialogClose>

          <button
            type="submit"
            onClick={handleDelete}
            className="p-2 text-[14px] leading-[20px] text-[#404AA0] font-medium rounded-lg border border-transparent hover:border-[#404AA0]">
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="inline-block w-4 h-4 border-2 border-t-transparent border-[#EC0054] rounded-full animate-spin"></span>
                Excluindo...
              </span>
            ) : (
              "Excluir"
            )}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModelCard;