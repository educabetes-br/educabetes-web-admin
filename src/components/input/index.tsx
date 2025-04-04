import * as React from 'react';

import { cn } from 'lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  before?: React.ReactNode;
  after?: React.ReactNode;
  error?: boolean;
  errorMessage?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, before, after, error, errorMessage, ...props }, ref) => {
    return (
      <div>
        <div
          className={cn(
            `flex h-14 gap-1 items-center w-full rounded-[4px] border ${error ? 'border-red' : 'border-lightBlue'} bg-white px-3 py-2 min-w-72 focus-within:ring-2 focus-within:ring-blue-500`,
            className
          )}
        >
          {before}
          <input
            type={type}
            ref={ref}
            {...props}
            className="flex w-full font-firaSansCondensed text-base text-dark focus-visible:outline-none"
          />
          {after}
        </div>
        {error && (
          <p className="text-red font-nunito font-medium text-sm m-0">
            *{errorMessage}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
