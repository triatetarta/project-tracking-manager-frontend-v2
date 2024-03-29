import ResponsiveImage from "./ResponsiveImage";

const Avatar = ({ classNames, spanClasses, avatarImage, avatarName }) => {
  return (
    <div
      className={`${classNames} border rounded-full flex items-center justify-center font-semibold text-header-main overflow-hidden z-30  bg-gray-50 select-none ${
        avatarImage === "" ? "bg-nice-orange" : ""
      }`}
    >
      {avatarImage === "" ? (
        <span className={`pointer-events-none ${spanClasses}`}>
          {avatarName.charAt(0)}
        </span>
      ) : (
        <ResponsiveImage displayImage={avatarImage} />
      )}
    </div>
  );
};

export default Avatar;
