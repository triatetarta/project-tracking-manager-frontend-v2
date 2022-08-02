import Shimmer from "./Shimmer";
import SkeletonElement from "./SkeletonElement";

const SkeletonTicket = () => {
  return (
    <div className='ticket bg-ticket-bg rounded-md shadow-sm relative w-[300px] h-[20rem] overflow-hidden'>
      <SkeletonElement type='h-full w-full' />
      <Shimmer />
    </div>
  );
};

export default SkeletonTicket;
