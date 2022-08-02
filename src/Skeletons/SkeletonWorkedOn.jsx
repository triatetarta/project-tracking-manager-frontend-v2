import SkeletonElement from "./SkeletonElement";
import Shimmer from "./Shimmer";

const SkeletonWorkedOn = () => {
  return (
    <div className='flex items-center p-2 w-full'>
      <div className='mr-2 w-8 h-8 relative overflow-hidden'>
        <SkeletonElement type='h-full w-full' />
        <Shimmer />
      </div>
      <div className='flex flex-col w-full'>
        <div className='w-2/3 h-4 mb-2 relative overflow-hidden'>
          <SkeletonElement type='h-full w-full' />
          <Shimmer />
        </div>
        <div className='w-1/2 h-2 relative overflow-hidden'>
          <SkeletonElement type='h-full w-full' />
          <Shimmer />
        </div>
      </div>
    </div>
  );
};

export default SkeletonWorkedOn;
