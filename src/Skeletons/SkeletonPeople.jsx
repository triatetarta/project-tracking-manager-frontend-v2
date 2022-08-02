import Shimmer from "./Shimmer";
import SkeletonElement from "./SkeletonElement";

const SkeletonPeople = () => {
  return (
    <div className='ticket relative flex items-center flex-wrap w-full h-14 overflow-hidden'>
      <div className='h-6 w-6 rounded-full mb-1 mr-1 relative overflow-hidden'>
        <SkeletonElement type='w-full h-full' />
        <Shimmer />
      </div>
      <div className='h-6 w-6 rounded-full mb-1 mr-1 relative overflow-hidden'>
        <SkeletonElement type='w-full h-full' />
        <Shimmer />
      </div>
      <div className='h-6 w-6 rounded-full mb-1 mr-1 relative overflow-hidden'>
        <SkeletonElement type='w-full h-full' />
        <Shimmer />
      </div>
      <div className='h-6 w-6 rounded-full mb-1 mr-1 relative overflow-hidden'>
        <SkeletonElement type='w-full h-full' />
        <Shimmer />
      </div>
      <div className='h-6 w-6 rounded-full mb-1 mr-1 relative overflow-hidden'>
        <SkeletonElement type='w-full h-full' />
        <Shimmer />
      </div>
      <div className='h-6 w-6 rounded-full mb-1 mr-1 relative overflow-hidden'>
        <SkeletonElement type='w-full h-full' />
        <Shimmer />
      </div>
      <div className='h-6 w-6 rounded-full mb-1 mr-1 relative overflow-hidden'>
        <SkeletonElement type='w-full h-full' />
        <Shimmer />
      </div>
      <div className='h-6 w-6 rounded-full mb-1 mr-1 relative overflow-hidden'>
        <SkeletonElement type='w-full h-full' />
        <Shimmer />
      </div>
    </div>
  );
};

export default SkeletonPeople;
