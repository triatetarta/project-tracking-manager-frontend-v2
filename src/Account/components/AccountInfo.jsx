import {
  BriefcaseIcon,
  OfficeBuildingIcon,
  MailIcon,
  CheckIcon,
  XIcon,
  DotsHorizontalIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";
import { LocationMarkerIcon } from "@heroicons/react/solid";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../Auth/authSlice";
import SkeletonAccountInfo from "../../Skeletons/SkeletonAccountInfo";

const AccountInfo = () => {
  const { user, isLoading } = useSelector((state) => state.auth);
  const [editDetails, setEditDetails] = useState(false);
  const [editMenuOpen, setEditMenuOpen] = useState(false);
  const [detailsData, setDetailsData] = useState({
    name: user.name,
    email: user.email,
    jobTitle: user.jobTitle,
    team: user.team,
    department: user.department,
    location: user.location,
  });

  const { name, email, jobTitle, team, department, location } = detailsData;

  const jobRef = useRef(null);

  const dispatch = useDispatch();

  const onChange = (e) => {
    setDetailsData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onUpdate = () => {
    const userData = {
      name: name,
      email: email,
      jobTitle: jobTitle.toLowerCase(),
      team: team.toLowerCase(),
      department: department.toLowerCase(),
      location: location.toLowerCase(),
    };

    dispatch(updateUser(userData));
    setEditDetails(false);
    clearState();
  };

  const clearState = () => {
    setDetailsData(() => {
      return {
        name: user.name,
        email: user.email,
        jobTitle: "",
        team: "",
        department: "",
        location: "",
      };
    });
  };

  return (
    <div className='flex flex-col pb-4 mt-4 md:mt-0'>
      <div className='hidden md:flex flex-col'>
        <p className='text-sm text-gray-text'>Welcome back,</p>
        <h3 className='text-xl font-semibold mb-10 text-header-main'>
          {user?.name}
        </h3>
      </div>

      <div className='border rounded-lg p-6 shadow-md'>
        {isLoading ? (
          <SkeletonAccountInfo />
        ) : (
          <>
            <div className='flex items-center justify-between mb-5 relative'>
              <h4 className='text-gray-text text-sm'>ABOUT</h4>
              <div
                onClick={() => setEditMenuOpen(!editMenuOpen)}
                className={`h-8 w-8 flex items-center justify-center cursor-pointer ${
                  editMenuOpen ? "bg-header-main" : "hover:bg-gray-100"
                } ${
                  editDetails && "bg-header-main pointer-events-none"
                }  transition-all duration-200 rounded-lg`}
              >
                <DotsHorizontalIcon
                  className={`${
                    editMenuOpen || editDetails ? "text-white" : ""
                  } h-5 w-5`}
                />
              </div>

              {editMenuOpen && (
                <button
                  onClick={() => {
                    setEditDetails(true);
                    setEditMenuOpen(false);
                    setDetailsData((prevState) => {
                      return {
                        ...prevState,
                        jobTitle: user.jobTitle,
                        team: user.team,
                        department: user.department,
                        location: user.location,
                      };
                    });

                    setTimeout(() => {
                      jobRef.current.focus();
                    }, 50);
                  }}
                  className='absolute right-0 -bottom-9 z-50 border rounded-md px-2 py-1 text-sm hover:bg-gray-100 transition-all duration-200 select-none'
                >
                  Edit Details
                </button>
              )}
            </div>

            <ul className='flex flex-col space-y-2 text-sm'>
              <li className='flex items-center space-x-2 relative'>
                <span>
                  <BriefcaseIcon className='h-6 w-6 text-gray-text' />
                </span>
                <input
                  ref={jobRef}
                  className={`py-3 px-2 capitalize rounded-md  ${
                    editDetails
                      ? "hover:bg-gray-100 transition-all duration-200 focus:outline-1 outline-deep-blue border"
                      : "bg-transparent"
                  }`}
                  type='text'
                  id='jobTitle'
                  name='jobTitle'
                  value={editDetails ? detailsData.jobTitle : user?.jobTitle}
                  onChange={onChange}
                  placeholder='Your job title'
                  disabled={!editDetails}
                />
              </li>
              <li className='flex items-center space-x-2'>
                <span>
                  <UserGroupIcon className='h-6 w-6 text-gray-text' />
                </span>
                <input
                  className={`py-3 px-2 capitalize rounded-md  ${
                    editDetails
                      ? "hover:bg-gray-100 transition-all duration-200 focus:outline-1 outline-deep-blue border"
                      : "bg-transparent"
                  }`}
                  type='text'
                  id='team'
                  name='team'
                  value={editDetails ? detailsData.team : user?.team}
                  onChange={onChange}
                  placeholder='Your team'
                  disabled={!editDetails}
                />
              </li>
              <li className='flex items-center space-x-2'>
                <span>
                  <OfficeBuildingIcon className='h-6 w-6 text-gray-text' />
                </span>
                <input
                  className={`py-3 px-2 capitalize rounded-md  ${
                    editDetails
                      ? "hover:bg-gray-100 transition-all duration-200 focus:outline-1 outline-deep-blue border"
                      : "bg-transparent"
                  }`}
                  type='text'
                  id='department'
                  name='department'
                  value={
                    editDetails ? detailsData.department : user?.department
                  }
                  onChange={onChange}
                  disabled={!editDetails}
                  placeholder='Your department'
                />
              </li>
              <li className='flex items-center space-x-2'>
                <span>
                  <LocationMarkerIcon className='h-6 w-6 text-gray-text' />
                </span>
                <input
                  className={`py-3 px-2 capitalize rounded-md  ${
                    editDetails
                      ? "hover:bg-gray-100 transition-all duration-200 focus:outline-1 outline-deep-blue border"
                      : "bg-transparent"
                  }`}
                  type='text'
                  id='location'
                  name='location'
                  value={editDetails ? detailsData.location : user?.location}
                  onChange={onChange}
                  disabled={!editDetails}
                  placeholder='Your location'
                />
              </li>

              {editDetails && (
                <li className='flex items-center justify-end space-x-1.5'>
                  <button
                    onClick={onUpdate}
                    className='p-2 bg-gray-100 rounded-md shadow-md hover:bg-gray-200
         transition-all duration-200'
                  >
                    <CheckIcon className='h-4 w-4' />
                  </button>
                  <button
                    onClick={() => {
                      setEditDetails(false);
                      clearState();
                    }}
                    className='p-2 bg-gray-100 rounded-md shadow-md hover:bg-gray-200
         transition-all duration-200'
                  >
                    <XIcon className='h-4 w-4' />
                  </button>
                </li>
              )}
            </ul>

            <h4 className='text-gray-text text-sm mt-10 mb-5'>CONTACT</h4>
            <div className='flex items-center space-x-4'>
              <span>
                <MailIcon className='h-6 w-6 text-gray-text' />
              </span>
              <span className='text-sm'>{user?.email}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AccountInfo;
