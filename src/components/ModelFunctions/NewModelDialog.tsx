import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { ReportInput, Report } from '../../services/Reports/PostReport';
import { NewModelIcon } from 'assets/index';
import {
  eye,
  unchecked,
  checked,
  plusIcon
} from '../../assets/index';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose
} from '../ui/dialog';

interface NewModelDialogProps {
  buttontrigger: string;
  onAddSuccess: (newReport: Omit<Report, 'id'>) => Promise<Report>;
}

const NewModelDialog: React.FC<NewModelDialogProps> = ({
  buttontrigger,
  onAddSuccess
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
    reset
  } = useForm<{
    linkpdf: string;
    tipo: string;
    titulo: string;
  }>();

  const [selectedModel, setSelectedModel] = useState<
    'Receita' | 'Laudo' | null
  >(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRadioClick = (value: 'Receita' | 'Laudo') => {
    if (selectedModel === value) {
      setSelectedModel(null);
      setValue('tipo', '');
    } else {
      setSelectedModel(value);
      setValue('tipo', value);
    }
  };

  const handleOpenLink = () => {
    window.open(watch('linkpdf'), '_blank');
  };

  const onSubmit = async (data: {
    linkpdf: string;
    tipo: string;
    titulo: string;
  }) => {
    if (!data.tipo || (data.tipo !== 'Receita' && data.tipo !== 'Laudo')) {
      alert('Selecione um tipo válido!');
      return;
    }

    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!urlPattern.test(data.linkpdf)) {
      alert('Link inválido! Use um link completo (http:// ou https://)');
      return;
    }

    setIsSubmitting(true);
    try {
      await onAddSuccess(data as ReportInput);
      reset();
      setSelectedModel(null);
      document.getElementById('closeDialog')?.click();
    } catch (error) {
      alert('Erro ao adicionar relatório. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {buttontrigger === 'buttonfooter' ? (
          <button className="bg-[#EC0054] items-center p-4 rounded-2xl">
            <Image src={plusIcon} alt="Adicionar modelo" />
          </button>
        ) : buttontrigger === 'novo modelo' ? (
          <button className="flex items-center gap-3 min-w-[138px] w-full">
            <Image src={NewModelIcon} alt="Adicionar modelo" />
            <p className="text-[#1A1847] leading-6 flex-1">Novo Modelo</p>
          </button>
        ) : (
          <div className="flex items-center cursor-pointer">
            <Image src={plusIcon} alt="Adicionar modelo" />
            <span className="text-[#1A1847] font-medium">
              Adicionar props do modelo // buttonfooter ou novo modelo
            </span>
          </div>
        )}
      </DialogTrigger>

      <DialogContent className="w-[560px] font-firaSansCondensed">
        <DialogHeader className="flex w-full bg-[#ECE6F0] pt-6 pb-2 items-start pl-6">
          <DialogTitle className="text-[24px] text-[#1A1847] leading-8 font-firaSans">
            Novo modelo
          </DialogTitle>
        </DialogHeader>

        {/* inputs */}
        <form
          className="flex flex-col gap-4 pt-2"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          {/* Tipo de Modelo */}
          <div className="flex flex-col gap-3 items-start px-6">
            <label
              htmlFor="titulo"
              className={`font-medium  leading-[20px] text-[14px] text-[#1A1847]`}
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

          {/* Nome do modelo e link e button de visualizar*/}
          <div className="flex flex-col gap-4 px-6">
            <div>
              <input
                type="text"
                id="titulo"
                className={`w-full focus:outline-none focus:ring-[1.5px] ${
                  errors.titulo
                    ? 'focus:ring-red-500 border-red-500'
                    : 'focus:ring-[#404AA0] focus:border-[#404AA0]'
                } border border-[#8D8BC1] p-4 rounded-sm placeholder:text-[16px]`}
                placeholder="Nome do modelo"
                {...register('titulo', {
                  required: 'O nome do modelo é obrigatório'
                })}
              />
            </div>

            <div className="relative flex items-center">
              <input
                type="text"
                className="w-full flex flex-1 focus:outline-none focus:ring-[1.5px] focus:ring-[#404AA0] focus:border-[#404AA0] border border-[#8D8BC1] p-4 rounded-sm placeholder:text-[16px] pr-10"
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
          </div>

          <DialogFooter className="flex gap-4 justify-end p-6 bg-[#ECE6F0]">
            <DialogClose asChild>
              <button
                id="closeDialog"
                onClick={() => reset()}
                className="text-[#404AA0] leading-6 font-medium text-[14px] px-4 py-2 rounded-[100px] border border-transparent hover:border-[#404AA0] transition-all"
              >
                Cancelar
              </button>
            </DialogClose>
            <button
              type="submit"
              disabled={isSubmitting || !isValid}
              className="bg-[#404AA0] text-[#DFE0FF] leading-6 font-medium text-[14px] px-4 py-2 rounded-[100px] transition-all hover:bg-[#303880] disabled:opacity-50 disabled:cursor-not-allowed"
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
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewModelDialog;
