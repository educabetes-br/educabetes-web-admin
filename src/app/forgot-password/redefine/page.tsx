'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler, type FieldValues } from 'react-hook-form';
import { Button, Input, CardLogo } from 'components';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { updatePassword, verifyEmail } from 'services';
import { zodResolver } from '@hookform/resolvers/zod';
import { redefinePassword } from 'validations/login';

interface FormData extends FieldValues {
  email: string;
  password: string;
  repeatPassword: string;
}

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(redefinePassword)
  });

  const handleUpdatePassword: SubmitHandler<FieldValues> = async (data) => {
    setError(null);
    setLoading(true);
    // confere se o email existe
    const checkEmail = await verifyEmail(data.email);
    if (!checkEmail.exists) {
      setLoading(false);
      setError('E-mail não encontrado');
      return;
    }

    // confere se as senhas novas são iguais
    if (data.password !== data.repeatPassword) {
      setLoading(false);
      setError('As senhas não coincidem');
      return;
    }

    // atualiza a senha
    const success = await updatePassword(data.email, data.password);
    if (success) {
      router.replace('/login');
    } else {
      setError('Erro ao atualizar a senha');
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-1 flex-col h-full min-w-fit min-h-fit justify-around items-center bg-[#404AA0]">
      <CardLogo>
        <form
          onSubmit={handleSubmit(
            async (data) => await handleUpdatePassword(data)
          )}
        >
          <div className="flex justify-start w-full">
            <p className="font-firaSans font-semibold text-sm text-dark">
              Login
            </p>
          </div>
          <div className="flex flex-col gap-2 my-4">
            <Input
              placeholder="Email"
              {...register('email')}
              error={!!errors.email}
              errorMessage={errors.email?.message}
            />
            <Input
              placeholder="Nova Senha"
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              after={
                showPassword ? (
                  <EyeOff
                    width={32}
                    className="cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <Eye
                    width={32}
                    className="cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )
              }
              error={!!errors.password}
              errorMessage={errors.password?.message}
            />
            <Input
              placeholder="Repita a Senha"
              {...register('repeatPassword')}
              type={showRepeatPassword ? 'text' : 'password'}
              after={
                showRepeatPassword ? (
                  <EyeOff
                    width={32}
                    className="cursor-pointer"
                    onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                  />
                ) : (
                  <Eye
                    width={32}
                    className="cursor-pointer"
                    onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                  />
                )
              }
              error={!!errors.repeatPassword}
              errorMessage={errors.repeatPassword?.message}
            />
          </div>
          {error && (
            <p className="flex justify-center w-full text-red font-nunito font-medium text-sm my-2">
              ⚠︎ {error}
            </p>
          )}
          <div className="flex flex-col gap-4 items-center">
            <Button text="Retornar ao Login" type="submit" loading={loading} />
          </div>
        </form>
        <Button
          variant="transparent"
          text="Voltar"
          onClick={() => router.replace('/forgot-password/verify')}
          icon={<ArrowLeft width={20} />}
        />
      </CardLogo>
    </div>
  );
}
