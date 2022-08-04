import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useSelector } from "react-redux";
import TicketDetails from "../../Tickets/components/TicketDetails";
import AccountInfo from "./AccountInfo";
import AccountMain from "./AccountMain";

const Account = () => {
  const [selectedId, setSelectedId] = useState("");
  const [openTicket, setOpenTicket] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const ticketClickHandle = (id) => {
    setSelectedId(id);
    setOpenTicket(true);
  };

  const closeTicketDetails = () => {
    setSelectedId("");
    setOpenTicket(false);
  };

  return (
    <section className='flex flex-col min-h-[calc(100vh-17.9rem)]'>
      <header className='h-48 w-full bg-gradient-to-l from-amber-600 to-amber-300'>
        <div className='container mx-auto relative h-full'>
          <div className='h-28 w-28 border rounded-full flex items-center justify-center bg-nice-orange font-semibold text-header-main text-6xl absolute -bottom-8 left-0 select-none'>
            {user?.name.charAt(0)}
          </div>
        </div>
      </header>

      <AnimatePresence>
        {openTicket && (
          <TicketDetails
            ticketId={selectedId}
            closeTicketDetails={closeTicketDetails}
          />
        )}
      </AnimatePresence>

      <main className='container mx-auto flex space-x-10 mt-20'>
        <AccountInfo />
        <AccountMain ticketClickHandle={ticketClickHandle} />
      </main>
    </section>
  );
};

export default Account;
