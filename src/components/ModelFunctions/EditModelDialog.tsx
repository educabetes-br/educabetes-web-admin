import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { eye, download, unchecked, checked, pencil } from '../../assets/index';
import { updateReport } from 'services/Reports/UpdateReport';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose
} from '../ui/dialog';
import { Report } from 'services/Reports/UpdateReport';

interface EditModelDialogProps {
  reportId: number; // Recebe o ID do relatório que será editado
  titulo: string; // Recebe o título do relatório
  linkpdf: string; // Recebe o link do relatório
  tipo: 'Receita' | 'Laudo'; // Recebe o tipo do relatório
  onEditSuccess?: (updatedReport: Report) => void; // Callback para notificar o sucesso da edição
}

const EditModelDialog: React.FC<EditModelDialogProps> = ({
  reportId,
  titulo,
  linkpdf,
  tipo,
  onEditSuccess
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<{ linkpdf: string; tipo: string; titulo: string }>();

  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [open, setOpen] = useState(false); // Add state to manage dialog open/close

  useEffect(() => {
    setValue('titulo', titulo);
    setValue('linkpdf', linkpdf);
    setValue('tipo', tipo);
    setSelectedModel(tipo);
  }, [titulo, linkpdf, tipo, setValue]);

  const handleRadioClick = (value: string) => {
    if (selectedModel === value) {
      // Se o mesmo valor for clicado novamente, desmarque
      setSelectedModel(null);
      setValue('tipo', ''); // Limpa o valor no formulário
    } else {
      // Caso contrário, selecione o novo valor
      setSelectedModel(value);
      setValue('tipo', value); // Define o valor no formulário
    }
  };

  const handleOpenLink = () => {
    window.open(watch('linkpdf'), '_blank');
  };

  const handleEditSuccess = async (data: {
    linkpdf: string;
    tipo: string;
    titulo: string;
  }) => {
    try {
      // Verifica se o tipo é válido
      if (data.tipo !== 'Receita' && data.tipo !== 'Laudo') {
        alert('Tipo de modelo inválido!');
        return;
      }

      // Verifica se o link é válido
      const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
      if (!urlPattern.test(data.linkpdf)) {
        alert(
          'Link do modelo inválido! \nPor favor, insira um link válido (ftp|http|https)'
        );
        return;
      }

      // Chama a API para atualizar o relatório
      const updatedReport = await updateReport(reportId, {
        titulo: data.titulo,
        linkpdf: data.linkpdf,
        tipo: data.tipo as 'Receita' | 'Laudo'
      });

      // Notifica o componente pai sobre a edição bem-sucedida
      if (onEditSuccess) {
        onEditSuccess(updatedReport);
      }
      // Fecha o diálogo após a edição bem-sucedida
      setOpen(false);
    } catch (error) {
      console.error('Erro ao editar o modelo:', error);
      alert('Erro ao editar o modelo. Por favor, tente novamente.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* button para abrir dialogContent */}
      <DialogTrigger asChild>
        <button onClick={() => setOpen(true)}>
          <Image src={pencil} alt="Editar modelo" />
        </button>
      </DialogTrigger>

      <DialogContent className="w-[560px]">
        {/* Titulo*/}
        <DialogHeader className="flex w-full bg-[#ECE6F0] pt-6 pb-2 items-start pl-6">
          <DialogTitle className="text-[24px] text-[#1A1847] leading-8">
            Editar modelo
          </DialogTitle>
        </DialogHeader>

        {/* inputs */}
        <form
          className="flex flex-col gap-4 py-2 px-6"
          onSubmit={handleSubmit(handleEditSuccess)}
        >
          {/* Tipo de Modelo */}
          <div className="flex flex-col gap-3 items-start">
            <label
              htmlFor="titulo"
              className={`font-medium leading-[20px] text-[14px] text-[#1A1847]`}
            >
              Tipo de Modelo:
              {errors.tipo && <span className="text-red-600"> *</span>}
            </label>

            {/* inputs radios */}
            <div>
              {/* input type=radio - Laudo */}
              <div className="flex pl-4">
                <label
                  htmlFor="Laudo"
                  className="text-[#1A1847] flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    id="Laudo"
                    value="Laudo"
                    className="hidden"
                    {...register('tipo', {
                      required: 'O tipo de modelo é obrigatório'
                    })}
                    onClick={() => handleRadioClick('Laudo')}
                  />
                  <Image
                    src={selectedModel === 'Laudo' ? checked : unchecked}
                    alt="radio buttons"
                  />
                  Laudo
                </label>
              </div>

              {/* input type=radio - Receita */}
              <div className="flex pl-4">
                <label
                  htmlFor="Receita"
                  className="text-[#1A1847] flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    id="Receita"
                    value="Receita"
                    className="hidden"
                    {...register('tipo', {
                      required: 'O tipo de modelo é obrigatório'
                    })}
                    onClick={() => handleRadioClick('Receita')}
                  />
                  <Image
                    src={selectedModel === 'Receita' ? checked : unchecked}
                    alt="radio buttons"
                  />
                  Receita
                </label>
              </div>
            </div>
          </div>

          {/* Nome do modelo e link */}
          <div className="flex flex-col gap-4">
            <input
              type="text"
              className="w-full focus:outline-none focus:ring-[1.5px] focus:ring-[#404AA0] focus:border-[#404AA0] border border-[#8D8BC1] p-4 rounded-sm placeholder:text-[16px]"
              placeholder="Nome do modelo"
              {...register('titulo', {
                required: 'O nome do modelo é obrigatório'
              })}
            />

            <div className="relative">
              <div className="relative flex items-center">
                <input
                  type="text"
                  className="w-full flex flex-1 focus:outline-none focus:ring-[1.5px] focus:ring-[#404AA0] focus:border-[#404AA0] border border-[#8D8BC1] p-4 rounded-sm placeholder:text-[16px] pr-10"
                  placeholder="Link do modelo"
                  {...register('linkpdf', {
                    required: 'O link do modelo é obrigatório'
                  })}
                />
                <div className="absolute right-1">
                  <Image src={download} alt="Baixar modelo" />
                </div>
              </div>
            </div>
          </div>

          {/* button para visualizar modelo */}
          <div>
            <button
              type="button"
              onClick={handleOpenLink}
              className={`flex flex-row items-center gap-2 px-4 h-[40px] rounded-[100px] transition-all border ${
                watch('linkpdf') ? 'border-[#939090]' : 'bg-white'
              }`}
            >
              <div
                className={`${watch('linkpdf') ? '' : 'opacity-[38%]'} transition-opacity`}
              >
                <Image src={eye} alt="Visualizar modelo" />
              </div>

              <p
                className={`transition-all text-[#1A1847] text-[14px] font-medium ${
                  watch('linkpdf') ? 'text-[#404AA0]' : 'opacity-[38%]'
                }`}
              >
                Visualizar modelo
              </p>
            </button>
          </div>
        </form>

        {/* buttons de fechar e salvar */}
        <DialogFooter className="flex gap-4 justify-end p-6 bg-[#ECE6F0]">
          <DialogClose className="text-[#1A1847] leading-6 font-medium text-[14px]">
            <button
              type="button"
              className="text-[#404AA0] leading-6 font-medium text-[14px] px-4 py-2 rounded-[100px] border border-transparent transition-all"
            >
              Cancelar
            </button>
          </DialogClose>

          <button
            onClick={handleSubmit(handleEditSuccess)}
            className="bg-[#404AA0] text-[#DFE0FF] leading-6 font-medium text-[14px] px-4 py-2 rounded-[100px] transition-all"
          >
            Salvar modelo
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditModelDialog;
