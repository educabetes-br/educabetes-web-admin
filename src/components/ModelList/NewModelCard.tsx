import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { eye, download, unchecked, checked } from "../../assets/index";
import { Report, addReport } from "services/Reports/PostReport";

const NewModelCard: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<{ linkpdf: string; tipo: string; titulo: string }>();

  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(true);

  const handleRadioClick = (value: 'Receita' | 'Laudo') => {
    if (selectedModel === value) {
      setSelectedModel(null);
      setValue("tipo", "");
    } else {
      setSelectedModel(value);
      setValue("tipo", value);
    }
  };

  const handleOpenLink = () => {
    window.open(watch("linkpdf"), "_blank");
  };

  const onSubmit = async (data: { linkpdf: string; tipo: string; titulo: string }) => {
    if (!data.tipo) {
      alert("Selecione um tipo de modelo!");
      return;
    }

    if (data.tipo !== 'Receita' && data.tipo !== 'Laudo') {
      alert("Tipo de modelo inválido!");
      return;
    }

    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!urlPattern.test(data.linkpdf)) {
      alert("Link do modelo inválido! \nPor favor, insira um link válido (ftp|http|https)");
      return;
    }

    const report: Report = {
      titulo: data.titulo,
      linkpdf: data.linkpdf,
      tipo: data.tipo as 'Receita' | 'Laudo',
    };

    try {
      await addReport(report);
      alert("Modelo de relatório adicionado com sucesso!");
      reset();
      setIsOpen(false);
    } catch (error) {
      console.error("Erro ao adicionar relatório:", error);
      alert("Erro ao adicionar relatório. Por favor, tente novamente.");
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="w-[560px] bg-white rounded-[28px] shadow-lg">
          <header className="flex w-full bg-[#ECE6F0] rounded-t-[28px] pt-6 px-6 pb-2">
            <h1 className="text-[24px] text-[#1A1847] leading-8">Novo modelo</h1>
          </header>

          <form className="flex flex-col gap-4 py-2 px-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-3 items-start">
              <label htmlFor="titulo" className={`font-medium leading-[20px] text-[14px] text-[#1A1847]`}>
                Tipo de Modelo:
                {errors.tipo && <span className="text-red-600">  *</span>}
              </label>

              <div>
                <div className="flex pl-4">
                  <label htmlFor="Laudo" className="text-[#1A1847] flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      id="Laudo"
                      value="Laudo"
                      className="hidden"
                      {...register("tipo", { required: "O tipo de modelo é obrigatório" })}
                      onClick={() => handleRadioClick("Laudo")}
                    />
                    <Image
                      src={selectedModel === "Laudo" ? checked : unchecked}
                      alt="radio buttons"
                    />
                    Laudo
                  </label>
                </div>

                <div className="flex pl-4">
                  <label htmlFor="Receita" className="text-[#1A1847] flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      id="Receita"
                      value="Receita"
                      className="hidden"
                      {...register("tipo", { required: "O tipo de modelo é obrigatório" })}
                      onClick={() => handleRadioClick("Receita")}
                    />
                    <Image
                      src={selectedModel === "Receita" ? checked : unchecked}
                      alt="radio buttons"
                    />
                    Receita
                  </label>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <input
                type="text"
                className="w-full focus:outline-none focus:ring-[1.5px] focus:ring-[#404AA0] focus:border-[#404AA0] border border-[#8D8BC1] p-4 rounded-sm placeholder:text-[16px]"
                placeholder="Nome do modelo"
                {...register("titulo", { required: "O nome do modelo é obrigatório" })}
              />

              <div className="relative">
                <div>
                  <input
                    type="text"
                    className="w-full focus:outline-none focus:ring-[1.5px] focus:ring-[#404AA0] focus:border-[#404AA0] border border-[#8D8BC1] p-4 rounded-sm placeholder:text-[16px]"
                    placeholder="Link do modelo"
                    {...register("linkpdf", { required: "O link do modelo é obrigatório" })}
                  />
                </div>

                <div className="absolute cursor-pointer right-4 inset-y-0 flex items-center">
                  <Image src={download} alt="Baixar modelo" />
                </div>
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={handleOpenLink}
                className={`flex flex-row items-center gap-2 px-4 h-[40px] rounded-[100px] transition-all border ${
                  watch("linkpdf") ? "border-[#939090]" : "bg-white"
                }`}
              >
                <div className={`${watch("linkpdf") ? "" : "opacity-[38%]"} transition-opacity`}>
                  <Image src={eye} alt="Visualizar modelo" />
                </div>

                <p
                  className={`transition-all text-[#1A1847] text-[14px] font-medium ${
                    watch("linkpdf") ? "text-[#404AA0]" : "opacity-[38%]"
                  }`}
                >
                  Visualizar modelo
                </p>
              </button>
            </div>
          </form>

          <footer className="flex gap-4 justify-end p-6 bg-[#ECE6F0] rounded-b-[28px]">
            <button
              type="button"
              onClick={handleClose}
              className="text-[#404AA0] leading-6 font-medium text-[14px] px-4 py-2 rounded-[100px] border border-transparent transition-all"
            >
              Cancelar
            </button>

            <button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              className="bg-[#404AA0] text-[#DFE0FF] leading-6 font-medium text-[14px] px-4 py-2 rounded-[100px] transition-all"
            >
              Salvar modelo
            </button>
          </footer>
        </div>
      </div>
    </>
  );
};

export default NewModelCard;