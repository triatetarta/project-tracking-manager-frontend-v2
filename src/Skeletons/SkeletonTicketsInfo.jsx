import Shimmer from "./Shimmer";
import SkeletonElement from "./SkeletonElement";

const SkeletonTicketInfo = () => {
  return (
    <div className='ticketInfo mt-8  bg-ticket-bg rounded-md shadow-sm relative w-[600px] h-[2.5rem] overflow-hidden'>
      <SkeletonElement type='h-full w-full' />
      <Shimmer />
    </div>
  );
};

export default SkeletonTicketInfo;
