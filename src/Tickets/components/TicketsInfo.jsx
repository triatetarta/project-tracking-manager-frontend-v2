import { useSelector } from "react-redux";
import SkeletonTicketInfo from "../../Skeletons/SkeletonTicketsInfo";

const TicketsInfo = () => {
  const { tickets, isTicketsLoading } = useSelector((state) => state.tickets);
  const { projects } = useSelector((state) => state.projects);

  return (
    <>
      {isTicketsLoading ? (
        <SkeletonTicketInfo />
      ) : (
        <div className='mt-8 p-4 border rounded-lg select-none text-sm'>
          <p>
            We currently found{" "}
            <span className='font-bold'>{tickets.length}</span> open ticket(s)
            for <span className='font-bold'>{projects.length}</span> available
            project(s)
          </p>
        </div>
      )}
    </>
  );
};

export default TicketsInfo;
