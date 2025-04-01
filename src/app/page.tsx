'use client';
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/login');
  return (
    <div className="flex flex-1 flex-col h-full justify-around items-center bg-[#404AA0]">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-white text-4xl font-bold">EducaBetes</h1>
      </div>
    </div>
  );
}
