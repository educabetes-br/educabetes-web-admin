import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import {
  eye,
  download,
  unchecked,
  checked,
  plusIcon
} from '../../assets/index';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger, DialogClose } from '../ui/dialog';

interface NewModelDialogProps {
  onReportAdded: (report: { titulo: string; linkpdf: string; tipo: 'Receita' | 'Laudo' }) => Promise<void>;
}

const NewModelDialog: React.FC<NewModelDialogProps> = ({ onReportAdded }) => {
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<{
    linkpdf: string;
    tipo: string;
    titulo: string;
  }>();

  const [selectedModel, setSelectedModel] = useState<'Receita' | 'Laudo' | null>(null);
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

  const onSubmit = async (data: { linkpdf: string; tipo: string; titulo: string }) => {
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
      await onReportAdded({
        titulo: data.titulo,
        linkpdf: data.linkpdf,
        tipo: data.tipo as 'Receita' | 'Laudo'
      });
      // Fecha o dialog após sucesso
      document.getElementById('closeDialog')?.click();
    } catch (error) {
      console.error('Erro ao adicionar:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-[#EC0054] items-center p-4 rounded-2xl">
          <Image src={plusIcon} alt="Adicionar modelo" />
        </button>
      </DialogTrigger>

      <DialogContent className="w-[560px]">
        <DialogHeader className="flex w-full bg-[#ECE6F0] pt-6 pb-2 items-start pl-6">
          <DialogTitle className="text-[24px] text-[#1A1847] leading-8">
            Novo modelo
          </DialogTitle>
        </DialogHeader>

        {/* inputs */}
        <form
          className="flex flex-col gap-4 py-2 px-6"
          onSubmit={handleSubmit(onSubmit)}
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

        <DialogFooter className="flex gap-4 justify-end p-6 bg-[#ECE6F0]">
          <DialogClose asChild>
            <button id="closeDialog" className="text-[#404AA0] leading-6 font-medium text-[14px] px-4 py-2 rounded-[100px] border border-transparent transition-all">
              Cancelar
            </button>
          </DialogClose>
          <button
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="bg-[#404AA0] text-[#DFE0FF] leading-6 font-medium text-[14px] px-4 py-2 rounded-[100px] transition-all disabled:opacity-50"
          >
            {isSubmitting ? 'Salvando...' : 'Salvar modelo'}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewModelDialog;