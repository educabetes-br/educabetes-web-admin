'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler, type FieldValues } from 'react-hook-form';
import { Button, Input, CardLogo } from 'components';
import { Enter } from 'assets';
import Image from 'next/image';
import { UserIcon, Lock } from 'assets';
import { Eye, EyeOff } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface FormData extends FieldValues {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>();

  const handleLogin: SubmitHandler<FormData> = async (data: FormData) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password
      });

      if (result?.error) {
        setError('Credenciais inválidas');
        return;
      }

      router.push('/');
    } catch (error) {
      console.error('Erro no catch', error);
    }
  };

  return (
    <div className="flex flex-1 flex-col h-full min-w-fit min-h-fit justify-around items-center bg-[#404AA0]">
      <CardLogo>
        <form onSubmit={handleSubmit(async (data) => await handleLogin(data))}>
          <div className="flex flex-col gap-2 my-4">
            <Input
              placeholder="Email"
              {...register('email', { required: 'Campo obrigatório' })}
              before={<Image src={UserIcon} alt="User Icon" />}
              error={!!errors.email}
              errorMessage={errors.email?.message}
            />
            <Input
              placeholder="Senha"
              {...register('password', { required: 'Campo obrigatório' })}
              type={showPassword ? 'text' : 'password'}
              before={<Image src={Lock} alt="Lock Icon" />}
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
          </div>
          {error && (
            <p className="flex justify-center w-full text-red font-nunito font-medium text-sm my-2">
              ⚠︎ {error}
            </p>
          )}
          <div className="flex flex-col gap-4 items-center">
            <Button
              text="Entrar"
              type="submit"
              icon={<Image src={Enter} alt="Enter Icon" />}
            />
            <Button
              variant="transparent"
              text="Esqueci minha senha"
              onClick={() => router.push('/ForgotPassword')}
            />
          </div>
        </form>
      </CardLogo>
    </div>
  );
}
