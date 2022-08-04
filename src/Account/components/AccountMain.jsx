import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTickets, reset } from "../../Tickets/ticketSlice";
import { useNavigate } from "react-router-dom";
import AccountTicket from "./AccountTicket";
import SkeletonWorkedOn from "../../Skeletons/SkeletonWorkedOn";

const AccountMain = ({ ticketClickHandle }) => {
  const { tickets, isLoading, isSuccess, updateSuccess } = useSelector(
    (state) => state.tickets
  );
  const { user } = useSelector((state) => state.auth);
  const [hasTickets, setHasTickets] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSuccess) return;
    dispatch(reset());

    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    if (tickets.length > 0) return;
    dispatch(getTickets());
  }, [dispatch, updateSuccess]);

  useEffect(() => {
    if (tickets.length < 1) return;

    const userHasTickets = tickets.filter(
      (ticket) => ticket.user === user.userId
    );

    setHasTickets(userHasTickets);
  }, [tickets]);

  return (
    <div className='flex flex-col space-y-4 w-full h-full'>
      <div className='flex flex-col text-header-main'>
        <h5 className='font-semibold'>Worked on</h5>
        <p className='text-gray-text text-xs'>
          See every ticket you have created
        </p>
      </div>

      {isLoading ? (
        <div className='border rounded-lg p-6'>
          <SkeletonWorkedOn />
          <SkeletonWorkedOn />
          <SkeletonWorkedOn />
        </div>
      ) : (
        <>
          {hasTickets.length < 1 ? (
            <div className='border rounded-lg p-6 text-header-main'>
              <div className='flex flex-col justify-center items-center'>
                <h4 className='text-xl font-semibold'>
                  There is no work to see here
                </h4>
                <p className='text-sm'>Things you created or edited</p>
              </div>
            </div>
          ) : (
            <div className='border rounded-lg p-5'>
              {tickets
                ?.filter((ticket) => {
                  return ticket.user === user.userId;
                })
                ?.map((ticket) => {
                  return (
                    <AccountTicket
                      key={ticket._id}
                      {...ticket}
                      ticketClickHandle={ticketClickHandle}
                    />
                  );
                })}

              <button
                onClick={() => navigate("/")}
                className='text-xs text-gray-text hover:underline ml-3 mt-6'
              >
                View all
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AccountMain;
