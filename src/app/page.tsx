'use client';
import { useSession } from 'next-auth/react';
import { Layout } from 'components/sidebar/layout';
import { redirect } from 'next/navigation';
import UsersPage from './users/page';

export default function Home() {
  const session = useSession();

  if (session.status === 'unauthenticated') {
    //redirect('/login');
  }

  return (
    <Layout>
      <div className="h-full w-full bg-[#F2EFFF]">
        <UsersPage />
      </div>
    </Layout>
  );
}
