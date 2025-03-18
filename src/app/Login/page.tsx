'use client';

import React, { useState } from 'react';
import { Button, Input } from 'components';
import { Enter, LogoTitle } from 'assets';
import Image from 'next/image';
import { UserIcon, Lock } from 'assets';
import { Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex flex-1 flex-col h-full min-w-fit min-h-fit justify-around items-center bg-[#404AA0]">
      <div className="flex flex-col justify-center items-center bg-white p-5 rounded-lg gap-3">
        <Image src={LogoTitle} alt="Logo" />
        <div className="flex flex-col gap-2 my-4">
          <Input
            placeholder="Email"
            before={<Image src={UserIcon} alt="User Icon" />}
          />
          <Input
            placeholder="Senha"
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
          />
        </div>
        <div className="flex flex-col gap-4 items-center">
          <Button text="Entrar" icon={<Image src={Enter} alt="Enter Icon" />} />
          <Button variant="transparent" text="Esqueci minha senha" />
        </div>
      </div>
    </div>
  );
}
