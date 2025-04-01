'use client';

import { Layout } from 'components/sidebar/layout';

export default function Home() {
  //const session = useSession();

  // if (session.status === 'unauthenticated') {
  //   redirect('/login');
  // }

  return (
    <Layout>
      <div className="flex flex-1 flex-col h-full justify-around items-center bg-[#404AA0]">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-white text-4xl font-bold">EducaBetes</h1>
        </div>
      </div>
    </Layout>
  );
}
