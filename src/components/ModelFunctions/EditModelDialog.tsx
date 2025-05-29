import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { eye, unchecked, checked, pencil } from '@assets';
import { updateReport, Report } from '@services';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose
} from '@components';

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
    formState: { errors, isValid },
    watch,
    setValue
  } = useForm<{ linkpdf: string; tipo: string; titulo: string }>();

  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);


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
      setIsSubmitting(true);
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
    } finally {
      setIsSubmitting(false);
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
          <DialogTitle className="text-[24px] text-[#1A1847] leading-8 font-firaSans">
            Editar modelo
          </DialogTitle>
        </DialogHeader>

        {/* inputs */}
        <form
          className="flex flex-col gap-4 py-2 px-6 font-firaSansCondensed"
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

            <div className="flex items-center">
              <input
                type="text"
                className="w-full flex flex-1 focus:outline-none focus:ring-[1.5px] focus:ring-[#404AA0] focus:border-[#404AA0] border border-[#8D8BC1] p-4 rounded-sm placeholder:text-[16px]"
                placeholder="Link do modelo"
                {...register('linkpdf', {
                  required: 'O link do modelo é obrigatório'
                })}
              />
            </div>

            {/* button para visualizar modelo */}
            <div>
              <button
                type="button"
                onClick={handleOpenLink}
                className={`flex flex-row leading-5 items-center gap-2 px-4 h-[40px] rounded-[100px] transition-all border ${
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
          </div>

        </form>

        {/* buttons de fechar e salvar */}
        <DialogFooter className="flex gap-4 justify-end p-6 bg-[#ECE6F0] font-firaSansCondensed">
          <DialogClose className="text-[#1A1847] leading-5 font-medium text-[14px]">
            <button
              type="button"
              className="text-[#404AA0] leading-5 font-medium text-[14px] px-4 py-2 rounded-[100px] border border-transparent hover:border-[#404AA0] transition-all"
            >
              Cancelar
            </button>
          </DialogClose>

          <button
              type="submit"
              disabled={isSubmitting || !isValid}
              onClick={handleSubmit(handleEditSuccess)}
              className="bg-[#404AA0] text-[#DFE0FF] leading-5 font-medium text-[14px] px-4 py-2 rounded-[100px] transition-all hover:bg-[#303880] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="inline-block w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
                  Salvando...
                </span>
              ) : (
                'Salvar modelo'
              )}
            </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditModelDialog;
