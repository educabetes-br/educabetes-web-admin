'use client';
import DeleteModelCard from "components/ModelList/DeleteModel";

export default function Home() {
  //const session = useSession();

  // if (session.status === 'unauthenticated') {
  //   redirect('/login');
  // }

  return (
    <div className="flex flex-1 flex-col h-full justify-around items-center bg-teal-400">
      <div className="flex flex-col justify-center items-center">
        <DeleteModelCard />
        
      </div>
    </div>
  );
}
