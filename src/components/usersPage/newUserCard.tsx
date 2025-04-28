import React, { useState } from "react";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { checked, unchecked } from "assets";
import { PatientInput } from "services/Users/PostPatient";
import { HealthProInput } from "services/Users/PostHealthPro";
import { AdminInput } from "services/Users/PostAdmin";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";
import { redefinePassword } from "validations/login";
import { z } from "zod";
import { useEffect } from "react";
import { Input } from "components/input";


interface NewUserCardProps {
    isOpen: boolean;
    onClose: () => void;
    onAddSuccess: (newPatient: PatientInput) => Promise<PatientInput>;
    onAddHealthProSuccess: (newHealthPro: HealthProInput) => Promise<HealthProInput>;
    onAddAdminSuccess: (newAdmin: AdminInput) => Promise<AdminInput>;
}

const NewUserCard: React.FC<NewUserCardProps> = ({
    isOpen,
    onClose,
    onAddSuccess,
    onAddHealthProSuccess,
    onAddAdminSuccess,
}) => {
    type UserType = "Paciente" | "Profissional" | "Admin";

    // Estados para os dados do formulário
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
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [touched, setTouched] = useState({
    email: false,
    password: false,
    repeatPassword: false,
    });

    useEffect(() => {
        if (step === 2) {
          try {
            redefinePassword.parse({
              email,
              password,
              repeatPassword: confirmPassword,
            });
            setErrors({});
          } catch (e) {
            if (e instanceof z.ZodError) {
              const fieldErrors: { [key: string]: string } = {};
              e.errors.forEach((err) => {
                const field = err.path[0];
                fieldErrors[field] = err.message;
              });
              setErrors(fieldErrors);
            }
          }
        }
      }, [email, password, confirmPassword, step]);      


    // Se isOpen for false, o componente não renderiza nada
    if (!isOpen) return null;

    // Função para formatar a data no padrão dd/mm/yyyy
    const formatDateToBR = (dateString: string) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // Função para resetar os estados do formulário
    const resetForm = () => {
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setBirthDate("");
        setDiagnosisTime("");
        setUserType("Paciente");
        setStep(1);
    };

    const isStepOneValid = () => {
        if (!userType || !name) return false;
        if (userType === "Paciente") return birthDate !== "" && diagnosisTime !== "";
        if (userType === "Profissional") return birthDate !== "";
        return true;
      };
      
      const isStepTwoValid = () => {
        try {
          redefinePassword.parse({
            email,
            password,
            repeatPassword: confirmPassword,
          });
          return true;
        } catch {
          return false;
        }
      };      

    // Função de submissão dos dados conforme tipo de usuário
    const handleSubmit = async () => {
        // Validação básica
        if (
            !name ||
            !email ||
            !userType ||
            !password ||
            password !== confirmPassword
        ) {
            alert("Preencha todos os campos corretamente.");
            return;
        }

        const baseData = { name, email, password };

        // Monta os dados extras dependendo do tipo de usuário
        const extras = {
            ...(userType === "Paciente" && {
                birthDate: formatDateToBR(birthDate),
                diagnosisTime,
            }),
            ...(userType === "Profissional" && {
                birthDate: formatDateToBR(birthDate),
            }),
            // Admin não envia birthDate, diagnosisTime, pois não são necessários
        };

        const finalData = { ...baseData, ...extras };
        console.log(finalData);

        try {
            setLoading(true);
            if (userType === "Paciente") {
                await onAddSuccess(finalData as PatientInput);
            } else if (userType === "Profissional") {
                await onAddHealthProSuccess(finalData as HealthProInput);
            } else if (userType === "Admin") {
                await onAddAdminSuccess(finalData as AdminInput);
            }
            onClose();
            resetForm();
        } catch (err) {
            alert("Erro ao cadastrar usuário.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10 flex items-center justify-center p-4">
            <div className="w-full max-w-[560px] bg-white rounded-[28px] overflow-hidden shadow-xl">
                {/* Header */}
                <div className="flex w-full bg-[#ECE6F0] pt-6 pb-2 items-start pl-6">
                    <h2 className="text-[24px] text-[#1A1847] leading-8 font-firaSans">
                        Novo Usuário
                    </h2>
                </div>

                {/* Formulário com dois steps */}
                <form
                    className="flex flex-col gap-4 pt-2"
                    onSubmit={(e) => {
                        e.preventDefault();
                        step === 1 ? setStep(2) : handleSubmit();
                    }}
                >
                    <div className="flex flex-col gap-4 py-4 px-6">
                        {step === 1 && (
                            <>
                                {/* Seletor de Tipo de Usuário */}
                                <div className="flex flex-col gap-3 items-start">
                                    <label className="font-medium text-[14px] text-[#1A1847]">
                                        Tipo de Usuário:
                                    </label>
                                    <div className="flex flex-col gap-2">
                                        {["Paciente", "Profissional", "Admin"].map((type) => (
                                            <label key={type} className="flex items-center gap-2 cursor-pointer">
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

                                {/* Nome */}
                                <input
                                    type="text"
                                    placeholder="Nome"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full focus:outline-none focus:ring-[1.5px] border border-[#8D8BC1] p-4 rounded-sm placeholder:text-[16px]"

                                />

                                {/* Data de Nascimento */}
                                {(userType === "Paciente" || userType === "Profissional") && (
                                    <input
                                        type="date"
                                        placeholder="Data de Nascimento"
                                        value={birthDate}
                                        onChange={(e) => setBirthDate(e.target.value)}
                                        className={`w-full focus:outline-none focus:ring-[1.5px] border border-[#8D8BC1] p-4 rounded-sm placeholder:text-[16px]`}
                                        />
                                )}

                                {/* Se for Paciente, exibe também o seletor de Tempo de Diagnóstico */}
                                {userType === "Paciente" && (
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
                                )}
                            </>
                        )}

                        {step === 2 && (
                            <>
                                {/* Login: E-mail */}
                                <input
                                    type="email"
                                    placeholder="E-mail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
                                    className="w-full focus:outline-none focus:ring-[1.5px] border border-[#8D8BC1] p-4 rounded-sm placeholder:text-[16px]"
                                    />
                                    {touched.email && errors.email && (
                                    <p className="text-red text-sm">{errors.email}</p>
                                    )}
                              
                                {/* Senha com ícone para mostrar/ocultar */}
                                <div className="flex flex-col gap-2 my-4">
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Senha"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
                                        after= 
                                            {showPassword ? (
                                                <EyeOff width={32} onClick={() => setShowPassword(false)} className="cursor-pointer"/>
                                            ) : (
                                                <Eye width={32} onClick={() => setShowPassword(true)} />
                                            )}
                                        />
                                   
                                       
                                 
                                    {touched.password && errors.password && (
                                        <p className="text-red text-sm">{errors.password}</p>
                                    )}
                                </div>
                                {/* Confirmar Senha com ícone para mostrar/ocultar */}
                                <div className="relative w-full">
                                    <Input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirmar Senha"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        onBlur={() => setTouched((prev) => ({ ...prev, repeatPassword: true }))}
                                        after= 
                                        {showConfirmPassword ? (
                                            <EyeOff width={32} onClick={() => setShowConfirmPassword(false)} className="cursor-pointer"/>
                                        ) : (
                                            <Eye width={32} onClick={() => setShowConfirmPassword(true)} />
                                        )}
                                    />
                                    {touched.repeatPassword && errors.repeatPassword && (
                                        <p className="text-red text-sm">{errors.repeatPassword}</p>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                    {/* Footer */}
                    <div className="flex gap-4 justify-end p-6 bg-[#ECE6F0]">
                        <button
                            type="button"
                            onClick={() => {
                                onClose();
                                resetForm();
                            }}
                            className="text-[#404AA0] px-4 py-2 rounded-[100px] border hover:border-[#404AA0] transition-all"
                        >
                            Cancelar
                        </button>
                        {step === 2 && (
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="text-[#404AA0] px-4 py-2 rounded-[100px] border hover:border-[#404AA0] transition-all"
                            >
                                Voltar
                            </button>
                        )}
                        <button
                            type="submit"
                            disabled={
                                loading ||
                                (step === 1 && !isStepOneValid()) ||
                                (step === 2 && !isStepTwoValid())
                            }
                            className="bg-[#404AA0] text-white px-4 py-2 rounded-[100px] hover:bg-[#303880] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                            {loading ? "Enviando..." : step === 1 ? "Próximo" : "Enviar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewUserCard;
