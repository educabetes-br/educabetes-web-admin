'use client';
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from 'utils';

const buttonVariants = cva(
  'flex gap-2 w-fit px-4 py-3 font-medium font-firaSansCondensed items-center justify-center whitespace-nowrap rounded-full text-sm',
  {
    variants: {
      variant: {
        default: 'bg-blue text-[#DFE0FF] hover:shadow-md hover:opacity-90',
        transparent: 'text-blue hover:bg-[#e7e8fa]'
      },
      disabled: {
        true: 'bg-white border border-[#c8c9ca] text-[#c8c9ca] cursor-not-allowed hover:shadow-none',
        false: ''
      }
    },
    defaultVariants: {
      variant: 'default',
      disabled: false
    }
  }
);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>,
    VariantProps<typeof buttonVariants> {
  text: string;
  icon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, text, icon, variant, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, disabled, className }))}
        ref={ref}
        {...props}
      >
        {icon}
        {text}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button };
