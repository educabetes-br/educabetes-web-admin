'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const session = useSession({
    required: true,
    onUnauthenticated() {
      router.replace('/Login');
    }
  });

  return (
    <div className="flex flex-1 flex-col h-full justify-around items-center bg-[#404AA0]">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-white text-4xl font-bold">EducaBetes</h1>
      </div>
    </div>
  );
}
