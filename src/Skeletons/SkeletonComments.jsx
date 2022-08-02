import SkeletonElement from "./SkeletonElement";
import Shimmer from "./Shimmer";

const SkeletonComments = () => {
  return (
    <div className='flex items-center w-full'>
      <div className='h-8 w-8 mb-1 rounded-full relative overflow-hidden flex-none'>
        <SkeletonElement type='h-8 w-8 rounded-full flex' />
        <Shimmer />
      </div>

      <div className='flex-grow ml-2 h-16 relative overflow-hidden'>
        <SkeletonElement type='w-full h-full' />
        <Shimmer />
      </div>
    </div>
  );
};

export default SkeletonComments;
