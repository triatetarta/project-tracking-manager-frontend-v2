import {
  PlusIcon,
  BadgeCheckIcon,
  DocumentTextIcon,
  ClockIcon,
} from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTickets, reset } from "../ticketSlice";
import { AnimatePresence } from "framer-motion";
import NewTicket from "./NewTicket";
import Ticket from "./Ticket";
import TicketDetails from "./TicketDetails";
import { NewProject } from "../../Projects/";
import SkeletonTicket from "../../Skeletons/SkeletonTicket";
import TicketsInfo from "./TicketsInfo";

const Tickets = ({ setCreateNew, createNew }) => {
  const [selectedId, setSelectedId] = useState("");
  const [openTicket, setOpenTicket] = useState(false);
  const {
    tickets,
    isTicketsLoading,
    isSuccess,
    updateSuccess,
    deleteSuccess,
    createSuccess,
  } = useSelector((state) => state.tickets);
  const { newProjectModalOpen } = useSelector((state) => state.projects);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isSuccess) return;
    dispatch(reset());

    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch, updateSuccess, deleteSuccess, createSuccess]);

  const ticketClickHandle = (id) => {
    setSelectedId(id);
    setOpenTicket(true);
  };

  const closeTicketDetails = () => {
    setSelectedId("");
    setOpenTicket(false);
  };

  return (
    <section className='min-h-[calc(100vh-17.9rem)] px-4 pb-4 flex items-center flex-col text-header-main relative flex-grow'>
      <AnimatePresence>
        {openTicket && (
          <TicketDetails
            ticketId={selectedId}
            closeTicketDetails={closeTicketDetails}
          />
        )}
      </AnimatePresence>

      <TicketsInfo />

      <div className='flex space-x-0 md:space-x-4 flex-wrap justify-center'>
        <div className='mt-10 flex flex-col bg-gray-100 py-4 px-6 rounded-lg'>
          <h1 className='text-lg font-normal mb-4 text-gray-text flex items-center'>
            <span>
              <DocumentTextIcon className='w-7 h-7 text-deep-blue mr-1' />
            </span>
            To Do
          </h1>

          <div className='flex flex-col space-y-2'>
            {isTicketsLoading ? (
              <SkeletonTicket />
            ) : (
              <>
                {tickets
                  ?.filter((ticket) => ticket.status === "to do")
                  .map((ticket) => {
                    return (
                      <Ticket
                        key={ticket._id}
                        {...ticket}
                        ticketClickHandle={ticketClickHandle}
                      />
                    );
                  })}
              </>
            )}
          </div>

          <button
            onClick={() => setCreateNew(true)}
            className='flex items-center mt-3 hover:bg-gray-200 transition-all duration-200 px-2 py-3 rounded-lg'
          >
            <PlusIcon className='w-3 h-3 text-gray-text' />
            <span className='text-xs font-semibold'>Create Ticket</span>
          </button>
        </div>

        <div className='mt-10 flex flex-col bg-gray-100 py-4 px-6 rounded-lg'>
          <h1 className='text-lg font-normal mb-4 text-gray-text flex items-center'>
            <span>
              <ClockIcon className='w-7 h-7 text-flow-yellow-deep mr-1' />
            </span>
            In Progress
          </h1>

          <div className='flex flex-col space-y-2'>
            {isTicketsLoading ? (
              <SkeletonTicket />
            ) : (
              <>
                {tickets
                  ?.filter((ticket) => ticket.status === "in progress")
                  .map((ticket) => {
                    return (
                      <Ticket
                        key={ticket._id}
                        {...ticket}
                        ticketClickHandle={ticketClickHandle}
                      />
                    );
                  })}
              </>
            )}
          </div>

          <button
            onClick={() => setCreateNew(true)}
            className='flex items-center mt-3 hover:bg-gray-200 px-2 py-3 rounded-lg'
          >
            <PlusIcon className='w-3 h-3 text-gray-text' />
            <span className='text-xs font-semibold'>Create Ticket</span>
          </button>
        </div>

        <div className='mt-10 flex flex-col bg-gray-100 py-4 px-6 rounded-lg'>
          <h1 className='text-lg font-normal mb-4 text-gray-text flex items-center'>
            <span>
              <BadgeCheckIcon className='w-7 h-7 text-flow-green-deep mr-1' />
            </span>
            Closed
          </h1>

          <div className='flex flex-col space-y-2'>
            {isTicketsLoading ? (
              <SkeletonTicket />
            ) : (
              <>
                {tickets
                  ?.filter((ticket) => ticket.status === "closed")
                  .map((ticket) => {
                    return (
                      <Ticket
                        key={ticket._id}
                        {...ticket}
                        ticketClickHandle={ticketClickHandle}
                      />
                    );
                  })}
              </>
            )}
          </div>

          <button
            onClick={() => setCreateNew(true)}
            className='flex items-center mt-3 hover:bg-gray-200 px-2 py-3 rounded-lg'
          >
            <PlusIcon className='w-3 h-3 text-gray-text' />
            <span className='text-xs font-semibold'>Create Ticket</span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {createNew && <NewTicket setCreateNew={setCreateNew} />}
      </AnimatePresence>

      <AnimatePresence>{newProjectModalOpen && <NewProject />}</AnimatePresence>
    </section>
  );
};

export default Tickets;
