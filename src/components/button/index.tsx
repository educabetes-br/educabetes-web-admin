import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from 'utils';

const buttonVariants = cva(
  'flex gap-2 w-fit px-4 py-3  font-medium font-firaSansCondensed items-center justify-center whitespace-nowrap rounded-full text-sm',
  {
    variants: {
      variant: {
        default: 'bg-blue text-[#DFE0FF] hover:shadow-md hover:opacity-90',
        transparent: 'text-blue hover:bg-[#e7e8fa]'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  text: string;
  icon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, text, icon, variant, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, className }))}
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
