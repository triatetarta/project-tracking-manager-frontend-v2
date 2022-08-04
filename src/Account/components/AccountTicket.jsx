import {
  BadgeCheckIcon,
  DocumentTextIcon,
  ClockIcon,
} from "@heroicons/react/solid";
import { useCallback } from "react";
import moment from "moment";

const AccountTicket = ({
  _id,
  project,
  status,
  ticketClickHandle,
  createdAt,
  updatedAt,
}) => {
  const getStatusProps = useCallback(() => {
    if (status === "to do") {
      return {
        icon: <DocumentTextIcon className='w-8 h-8 text-deep-blue mr-1' />,
        colors: "bg-deep-blue text-white",
      };
    } else if (status === "in progress") {
      return {
        icon: <ClockIcon className='w-8 h-8 text-flow-yellow-deep mr-1' />,
        colors: "bg-flow-yellow-deep text-header-main",
      };
    } else if (status === "closed") {
      return {
        icon: <BadgeCheckIcon className='w-8 h-8 text-flow-green-deep mr-1' />,
        colors: "bg-flow-green-deep text-header-main",
      };
    }
  }, []);

  return (
    <article
      onClick={() => ticketClickHandle(_id)}
      className='flex items-center hover:bg-gray-100 transition-all duration-200 p-2 rounded-lg cursor-pointer'
    >
      <div className='mr-2'>{getStatusProps().icon}</div>
      <div className='flex flex-col'>
        <p className='text-sm mb-0.5'>
          {project} <span>•</span>
          <span
            className={`${
              getStatusProps().colors
            } mx-1 px-1 rounded-md font-semibold`}
          >
            {status}
          </span>
          <span>ticket</span>
        </p>
        <p className='text-xs text-gray-text'>
          <span className='mr-1'>You created this</span>
          {moment(moment(createdAt).local().format()).fromNow()}
        </p>
      </div>
    </article>
  );
};

export default AccountTicket;
