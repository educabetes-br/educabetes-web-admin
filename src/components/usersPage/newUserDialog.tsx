import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import Image from "next/image";
import { PatientInput, DiagnosisTime } from "../../services/Users/PostPatient";
import { checked, plusIcon, unchecked } from "assets";
import { HealthProInput } from "services/Users/PostHealthPro";
import { AdminInput } from "services/Users/PostAdmin";
import { Eye, EyeOff } from "lucide-react";

interface NewUserDialogProps {
  onAddSuccess: (newPatient: PatientInput) => Promise<PatientInput>;
  onAddHealthProSuccess: (newHealthPro: HealthProInput) => Promise<HealthProInput>;
  onAddAdminSucess: (newAdmin: AdminInput ) => Promise<AdminInput>;
};

export const NewUserDialog: React.FC<NewUserDialogProps> = ({
  onAddSuccess,
  onAddHealthProSuccess,
  onAddAdminSucess
}) => {
  type UserType = "Paciente" | "Profissional" | "Admin";

  const [userType, setUserType] = useState<UserType | null>("Paciente");
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [diagnosisTime, setDiagnosisTime] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const handleSubmit = async () => {
    if (!name || !email || !userType || !password || password !== confirmPassword) {
      alert("Preencha todos os campos corretamente.");
      return;
    }

    const baseData = {
      name,
      email,
      password,
    };

    const formatDateToBR = (dateString: string) => {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // +1 porque janeiro é 0
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };
    

    const extras = {
      ...(userType === "Paciente" && {
        birthDate: formatDateToBR(birthDate) || "",
        diagnosisTime: diagnosisTime as DiagnosisTime,
      }),
      ...(userType === "Profissional" && {
        birthDate: formatDateToBR(birthDate) || "",
      }),
    };
    

    const finalData = {
      ...baseData,
      ...extras,
    };
    console.log(finalData);

    try {
      setLoading(true);

      if (userType === "Paciente") {
        const pacienteData = {
          name: finalData.name,
          email: finalData.email,
          password: finalData.password,
          birthDate: finalData.birthDate || "",
          diagnosisTime: finalData.diagnosisTime as DiagnosisTime || "",
        };
        await onAddSuccess(pacienteData); 
      }
  
      if (userType === "Profissional") {
        const healthProData = {
          name: finalData.name,
          email: finalData.email,
          password: finalData.password,
          birthDate: finalData.birthDate || "",
        };
        await onAddHealthProSuccess(healthProData);
      }

      if(userType === "Admin") {
        const adminData = {
          name: finalData.name,
          email: finalData.email,
          password: finalData.password,
        };
        await onAddAdminSucess(adminData);
      }

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setBirthDate("");
      setDiagnosisTime("");
      setUserType(null);
      setStep(1);
      document.getElementById("closeDialog")?.click();
    } catch (err) {
      alert("Erro ao cadastrar usuário.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-[#EC0054] items-center p-4 rounded-2xl">
          <Image src={plusIcon} alt="Adicionar usuário" />        
        </button>
      </DialogTrigger>
      <DialogContent className="w-[560px] font-firaSansCondensed">
        <DialogHeader className="flex w-full bg-[#ECE6F0] pt-6 pb-2 items-start pl-6">
          <DialogTitle className="text-[24px] text-[#1A1847] leading-8 font-firaSans">
            Novo Usuário
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            step === 1 ? setStep(2) : handleSubmit();
          }}
        >
          <div className="flex flex-col gap-4 py-4 px-6">
          {step === 1 && (
            <>
              <div className="flex flex-col gap-3 items-start">
                <label className={`font-medium leading-[20px] text-[14px] text-[#1A1847]`}>
                  Tipo de Usuário:
                </label>
                <div className="flex flex-col gap-2">
                  {["Paciente", "Profissional", "Admin"].map((type) => (
                    <label
                      key={type}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="userType"
                        value={type}
                        className="hidden"
                        onChange={() => setUserType(type as UserType)}
                      />
                      <Image
                        src={userType === type ? checked : unchecked}
                        alt={`Selecionar tipo de usuário: ${type}`}
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </div>

              <input
                type="text"
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full focus:outline-none focus:ring-[1.5px] border border-[#8D8BC1] p-4 rounded-sm placeholder:text-[16px]`}
              />

              {userType === "Profissional" && (
                  <input
                  type="date"
                  placeholder="Data de Nascimento"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className={`w-full focus:outline-none focus:ring-[1.5px] border border-[#8D8BC1] p-4 rounded-sm placeholder:text-[16px]`}
                />
              )}

              {userType === "Paciente" && (
                <>
                  <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className={`w-full focus:outline-none focus:ring-[1.5px] border border-[#8D8BC1] p-4 rounded-sm placeholder:text-[16px]`}
                  />
                  <Select value={diagnosisTime} onValueChange={setDiagnosisTime}>
                    <SelectTrigger className={`w-full focus:outline-none focus:ring-[1.5px] border border-[#8D8BC1] p-4 rounded-sm placeholder:text-[16px] h-14 bg-white`}>
                      <SelectValue placeholder="Tempo de Diagnóstico" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-[#8D8BC1] text-[#1A1847] font-semibold text-base">
                      <SelectItem value="LESS_THAN_6MONTHS" className="hover:bg-[#F2F3FF] cursor-pointer">Menos de 6 meses</SelectItem>
                      <SelectItem value="BETWEEN_6MONTHS_AND_1YEAR" className="hover:bg-[#F2F3FF] cursor-pointer">6 meses a 1 ano</SelectItem>
                      <SelectItem value="BETWEEN_1YEAR_AND_2YEARS" className="hover:bg-[#F2F3FF] cursor-pointer">1 a 2 anos</SelectItem>
                      <SelectItem value="MORE_THAN_2YEARS" className="hover:bg-[#F2F3FF] cursor-pointer">Mais de 2 anos</SelectItem>
                    </SelectContent>
                  </Select>
                </>
              )}
            </>
          )}

          {step === 2 && (
            <>
              <label className={`font-medium leading-[20px] text-[14px] text-[#1A1847]`}>
                Login:
              </label>
              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full focus:outline-none focus:ring-[1.5px] border border-[#8D8BC1] p-4 rounded-sm placeholder:text-[16px]`}
              />
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full focus:outline-none focus:ring-[1.5px] border border-[#8D8BC1] p-4 rounded-sm placeholder:text-[16px]"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer">
                  {showPassword ? (
                    <EyeOff width={24} onClick={() => setShowPassword(false)} />
                  ) : (
                    <Eye width={24} onClick={() => setShowPassword(true)} />
                  )}
                </div>
              </div>

              <div className="relative w-full">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirmar Senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full focus:outline-none focus:ring-[1.5px] border border-[#8D8BC1] p-4 rounded-sm placeholder:text-[16px]"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer">
                  {showConfirmPassword ? (
                    <EyeOff width={24} onClick={() => setShowConfirmPassword(false)} />
                  ) : (
                    <Eye width={24} onClick={() => setShowConfirmPassword(true)} />
                  )}
                </div>
              </div>
            </>
          )}
          </div>

          <DialogFooter className="flex gap-4 justify-end p-6 bg-[#ECE6F0]">
            <DialogClose asChild>
              <button
                id="closeDialog"
                className="text-[#404AA0] leading-5 font-medium text-[14px] px-4 py-2 rounded-[100px] border border-transparent hover:border-[#404AA0] transition-all"
              >
                Cancelar
              </button>
            </DialogClose>
            {step === 2 && (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-[#404AA0] leading-5 font-medium text-[14px] px-4 py-2 rounded-[100px] border border-transparent hover:border-[#404AA0] transition-all"
              >
                Voltar
              </button>
            )}
            <button
              type="submit"
              disabled={loading}
              className="bg-[#404AA0] text-[#DFE0FF] leading-5 font-medium text-[14px] px-4 py-2 rounded-[100px] transition-all hover:bg-[#303880] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Enviando..." : step === 1 ? "Próximo" : "Enviar"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};