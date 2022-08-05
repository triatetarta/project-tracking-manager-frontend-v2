import Shimmer from "./Shimmer";
import SkeletonElement from "./SkeletonElement";

const SkeletonAvatar = ({ sizeClasses, parentClasses, childClasses }) => {
  return (
    <div
      className={`${sizeClasses} mb-1 rounded-full relative overflow-hidden flex-none`}
    >
      <SkeletonElement type={`${sizeClasses} rounded-full flex`} />
      <Shimmer />
    </div>
  );
};

export default SkeletonAvatar;
