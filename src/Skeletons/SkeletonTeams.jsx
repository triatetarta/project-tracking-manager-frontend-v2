import Shimmer from "./Shimmer";
import SkeletonElement from "./SkeletonElement";

const SkeletonTeams = () => {
  return (
    <div className='ticket bg-ticket-bg rounded-md shadow-sm relative w-full h-8 overflow-hidden'>
      <SkeletonElement type='h-full w-full' />
      <Shimmer />
    </div>
  );
};

export default SkeletonTeams;
