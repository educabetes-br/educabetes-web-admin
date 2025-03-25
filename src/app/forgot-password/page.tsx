'use client';
import React from 'react';
import { Button, CardLogo, Input } from 'components';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler, type FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import api from 'services/api';
import { verifyEmail } from 'services';
import { emailForverification } from 'validations/login';

interface FormData extends FieldValues {
  email: string;
}

export default function ForgotPassword() {
  const router = useRouter();
  const [error, setError] = React.useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(emailForverification)
  });

  const handleSendMail = async (userEmail: string, userName: string) => {
    try {
      const response = await api.post('/mail', { userEmail, userName });

      if (response.status === 200) {
        router.push(
          `/forgot-password/verify?email=${encodeURIComponent(userEmail)}`
        );
      } else {
        console.error('Falha ao enviar o email', response.status);
      }
    } catch (error) {
      console.error('Erro ao enviar o email:', error);
    }
  };

  const handleConfirmEmail: SubmitHandler<FormData> = async (
    data: FormData
  ) => {
    try {
      console.log('data:', data);
      const res = await verifyEmail(data.email);

      if (res.exists && res.userName) {
        handleSendMail(data.email, res.userName);
      } else {
        setError('E-mail não encontrado');
      }
    } catch (error) {
      console.error('Erro ao confirmar o email:', error);
    }
  };

  return (
    <div className="flex flex-1 flex-col h-full min-w-fit min-h-fit justify-around items-center bg-[#404AA0]">
      <CardLogo>
        <div className="flex justify-start w-full">
          <p className="font-firaSans font-semibold text-sm text-dark">
            Digite seu Email
          </p>
        </div>
        <form
          className="flex justify-center items-center flex-col gap-4"
          onSubmit={handleSubmit(
            async (data) => await handleConfirmEmail(data)
          )}
        >
          <Input
            placeholder="Email"
            {...register('email')}
            error={!!errors.email}
            errorMessage={errors.email?.message}
          />
          {error && (
            <p className="flex justify-center w-full text-red font-nunito font-medium text-sm my-2">
              ⚠︎ {error}
            </p>
          )}
          <Button text="Enviar código de verificação" type="submit" />
        </form>
        <Button
          text="Voltar"
          variant="transparent"
          onClick={() => {
            router.replace('/login');
          }}
          icon={<ArrowLeft width={20} />}
        />
      </CardLogo>
    </div>
  );
}
