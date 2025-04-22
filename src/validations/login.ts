'use client';

import { z } from 'zod';

export const emailForverification = z.object({
  email: z
    .string({ required_error: 'Campo obrigatório' })
    .min(1, { message: 'Campo obrigatório' })
    .email({ message: 'E-mail inválido' })
});

export const redefinePassword = z.object({
  email: z
    .string({ required_error: 'Campo obrigatório' })
    .min(1, { message: 'Campo obrigatório' })
    .email({ message: 'E-mail inválido' }),
  password: z
    .string({ required_error: 'Campo obrigatório' })
    .min(8, { message: 'A senha precisa ter pelo menos 8 caracteres' })
    .regex(/\d/, { message: 'A senha precisa ter pelo menos um número' })
    .regex(/[!@#$%^&*(),.?":{}|<>_\-+=~`[\]\\;'/]/, {
      message: 'A senha precisa ter pelo menos um caractere especial'
    }),
  repeatPassword: z
    .string({ required_error: 'Campo obrigatório' })
    .min(8, { message: 'A senha precisa ter pelo menos 8 caracteres' })
    .regex(/\d/, { message: 'A senha precisa ter pelo menos um número' })
    .regex(/[!@#$%^&*(),.?":{}|<>_\-+=~`[\]\\;'/]/, {
      message: 'A senha precisa ter pelo menos um caractere especial'
    }),
    }).refine((data) => data.password === data.repeatPassword, {
      message: 'As senhas não coincidem',
      path: ['repeatPassword'], // 
    });
