'use client';
import React, { useState, useEffect } from 'react';
import { Button, CardLogo } from 'components';
import { InputOTP, InputOTPGroup, InputOTPSlot } from 'components/ui/input-otp';
import { ArrowLeft } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import api from 'services/api';
import { useForm, SubmitHandler, type FieldValues } from 'react-hook-form';

export default function ForgotPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userEmail = searchParams.get('email') as string;
  const [code, setCode] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [codeError, setCodeError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingResend, setLoadingResend] = useState(false);
  const { handleSubmit } = useForm<FormData>();

  const handleResendMail = async (userEmail: string) => {
    try {
      setLoadingResend(true);
      setCodeError(false);
      fetchTimer();
      const response = await api.post('/mail', { userEmail });

      if (response.status === 200) {
      } else {
        console.error('Falha ao enviar o email', response.status);
      }
    } catch (error) {
      console.error('Erro ao enviar o email:', error);
    } finally {
      setLoadingResend(false);
      setIsButtonEnabled(false);
    }
  };

  const handleValidateCode: SubmitHandler<FieldValues> = async () => {
    try {
      setLoading(true);
      console.log('userEmail:', code);
      const response = await api.post('/validate', {
        userEmail,
        code
      });

      if (response.status !== 200) {
        setCodeError(true);
      } else {
        setCodeError(false);
        router.push('/forgot-password/redefine');
      }
    } catch (error) {
      console.error('Error validating code:', error);
      setCodeError(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchTimer = () => {
    const timer = setTimeout(() => {
      setIsButtonEnabled(true);
    }, 40000);

    return () => clearTimeout(timer);
  };

  useEffect(() => {
    fetchTimer();
  }, []);

  return (
    <div className="flex flex-1 flex-col h-full min-w-fit min-h-fit justify-around items-center bg-[#404AA0]">
      <CardLogo>
        <div className="flex justify-start w-full">
          <p className="font-firaSans font-semibold text-sm text-dark">
            Digite o código recebido em seu email
          </p>
        </div>
        <form
          className="flex justify-center items-center flex-col gap-4"
          onSubmit={handleSubmit(handleValidateCode)}
        >
          <InputOTP
            maxLength={6}
            value={code}
            onChange={setCode}
            pattern={REGEXP_ONLY_DIGITS}
          >
            <InputOTPGroup className="gap-2">
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          {codeError && (
            <p className="text-red font-nunito font-medium text-sm">
              ⚠︎ Código inválido
            </p>
          )}
          <Button
            text="Reenviar código"
            type="button"
            loading={loadingResend}
            disabled={!isButtonEnabled}
            onClick={() => handleResendMail(userEmail)}
            className="w-full"
          />
          <Button
            text="Redefinir senha"
            disabled={code.length < 6}
            type="submit"
            loading={loading}
          />
          <Button
            text="Voltar"
            variant="transparent"
            onClick={(e) => {
              e.preventDefault();
              router.replace('/forgot-password');
            }}
            icon={<ArrowLeft width={20} />}
          />
        </form>
      </CardLogo>
    </div>
  );
}
