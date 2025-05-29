import type { Metadata } from 'next';

import NextAuthSessionProvider from 'providers/sessionProvider';
import 'styles/globals.css';

export const metadata: Metadata = {
  title: 'EducaBetes',
  description: 'EducaBetes',
  manifest: '/manifest.json'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <NextAuthSessionProvider>
            {children}
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
