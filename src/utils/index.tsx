import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import StatesOptions from './stateOptions';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export {
  StatesOptions
}