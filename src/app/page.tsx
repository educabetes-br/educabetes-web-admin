'use client';
import NewModelCard from "components/Newmodel";

export default function Home() {
  //const session = useSession();

  // if (session.status === 'unauthenticated') {
  //   redirect('/login');
  // }

  return (
    <div className="flex flex-1 flex-col h-full justify-around items-center bg-slate-600">
      <div className="flex flex-col justify-center items-center">
        <NewModelCard />
        
      </div>
    </div>
  );
}
