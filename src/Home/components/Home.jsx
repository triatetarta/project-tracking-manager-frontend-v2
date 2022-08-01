import Showcase from "./Showcase";
import Description from "./Description";
import Details from "./Details";
import Workflow from "./Workflow";
import Plans from "./Plans";
import { useSelector } from "react-redux";
// import { Tickets } from "../../Tickets/";
// import { Sidebar } from "../../Sidebar/";
import { useState } from "react";
import { PlusIcon } from "@heroicons/react/solid";

const Home = () => {
  const [createNew, setCreateNew] = useState(false);
  const { user } = useSelector((state) => state.auth);

  // if (user)
  //   return (
  //     <main className='container mx-auto flex'>
  //       <Sidebar />
  //       <Tickets setCreateNew={setCreateNew} createNew={createNew} />

  //       <div className='container fixed bottom-60'>
  //         <div className='relative'>
  //           <button
  //             onClick={() => setCreateNew(true)}
  //             className='bg-deep-blue text-white self-end mb-4 px-4 py-4 absolute bottom-0 right-0  rounded-full hover:bg-light-blue hover:scale-105 active:scale-95 transition-all duration-150'
  //           >
  //             <PlusIcon className='w-8 h-8' />
  //           </button>
  //         </div>
  //       </div>
  //     </main>
  //   );

  return (
    <main className='container mx-auto'>
      <Showcase />
      <Description />
      <Details />
      <Workflow />
      <Plans />
    </main>
  );
};

export default Home;
