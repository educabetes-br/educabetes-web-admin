import React from 'react';
import Image from 'next/image';
import { LogoTitle } from 'assets';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const CardLogo = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        className="flex flex-col justify-center items-center bg-white p-5 rounded-2xl gap-3"
      >
        <Image src={LogoTitle} alt="Logo" />
        {children}
      </div>
    );
  }
);

CardLogo.displayName = 'CardLogo';
