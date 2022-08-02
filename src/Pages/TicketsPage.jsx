import { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/solid";
import { Sidebar } from "../Sidebar";
import { Tickets } from "../Tickets";

const TicketsPage = () => {
  const [createNew, setCreateNew] = useState(false);

  return (
    <main className='container mx-auto flex'>
      <Sidebar />
      <Tickets setCreateNew={setCreateNew} createNew={createNew} />

      <div className='container fixed bottom-20'>
        <div className='relative'>
          <button
            onClick={() => setCreateNew(true)}
            className='bg-deep-blue text-white self-end mb-4 px-4 py-4 absolute bottom-0 right-0  rounded-full hover:bg-light-blue hover:scale-105 active:scale-95 transition-all duration-150'
          >
            <PlusIcon className='w-8 h-8' />
          </button>
        </div>
      </div>
    </main>
  );
};

export default TicketsPage;
