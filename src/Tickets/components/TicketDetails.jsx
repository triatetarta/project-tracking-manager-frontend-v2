import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTicket, updateTicket } from "../ticketSlice";
import {
  XIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/solid";
import { TicketIcon } from "@heroicons/react/outline";
import { AnimatePresence, motion } from "framer-motion";
import { Comment } from "../../Comments/";
import moment from "moment";
import toast from "react-hot-toast";
import {
  createComment,
  getSingleTicketComments,
} from "../../Comments/commentSlice";
import Modal from "../../Modal/components/Modal";
import { openTicketModal } from "../../Modal/modalSlice";
import SkeletonTicketDetails from "../../Skeletons/SkeletonTicketDetails";
import SkeletonComments from "../../Skeletons/SkeletonComments";

const TicketDetails = ({ closeTicketDetails, ticketId }) => {
  const { ticket, isTicketLoading, isError, message, updateSuccess } =
    useSelector((state) => state.tickets);

  const { comments, isLoading: commentsIsLoading } = useSelector(
    (state) => state.comment
  );
  const { ticketModalOpen, commentModalOpen } = useSelector(
    (state) => state.modal
  );
  const { user, users } = useSelector((state) => state.auth);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [ticketMenuOpen, setTicketMenuOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [editDescription, setEditDescription] = useState(false);
  const [editDescText, setEditDescText] = useState("");
  const [author, setAuthor] = useState({});

  const dispatch = useDispatch();

  const descRef = useRef();

  useEffect(() => {
    if (ticketId === undefined) return;
    if (isError) {
      toast.error(message);
    }

    dispatch(getTicket(ticketId));

    dispatch(getSingleTicketComments(ticketId));
  }, [isError, message, ticketId]);

  useEffect(() => {
    if (!updateSuccess) return;

    dispatch(getTicket(ticketId));
  }, [updateSuccess]);

  useEffect(() => {
    const isTicketEmpty = Object.keys(ticket).length === 0;

    if (isTicketEmpty || !users) return;

    const ticketAuthor = users.find((user) => user._id === ticket.user);

    setAuthor(ticketAuthor);
  }, [user, ticket]);

  const closeHandle = (e) => {
    if (e.target.classList.contains("ticketBackdrop")) {
      closeTicketDetails();
    }
  };

  const onCommentSubmit = (e) => {
    e.preventDefault();

    const commentData = {
      ticket: ticket._id,
      comment: commentText,
    };

    dispatch(createComment(commentData));
    setCommentText("");
  };

  const onEditEnable = () => {
    if (ticket.user !== user.userId) return;
    setEditDescription(true);
    setEditDescText(ticket.description);

    setTimeout(() => {
      descRef.current.focus();
    }, 50);
  };

  const onEditCancel = () => {
    setEditDescription(false);
  };

  const onEditSubmit = () => {
    dispatch(
      updateTicket({
        ticketId: ticket._id,
        ticketData: {
          description: editDescText,
        },
      })
    );
    setEditDescription(false);
  };

  const onTicketDelete = () => {
    dispatch(openTicketModal(true));
  };

  const getStatusStyles = useCallback(() => {
    if (ticket?.status === "to do") {
      return "bg-deep-blue text-white hover:bg-light-blue";
    } else if (ticket?.status === "in progress") {
      return "bg-flow-yellow text-header-main hover:bg-flow-yellow-deep";
    } else if (ticket?.status === "closed") {
      return "bg-flow-green text-header-main hover:bg-flow-green-deep";
    }
  }, [ticket]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
      onClick={closeHandle}
      className='bg-black/20 backdrop-blur-sm fixed top-0 left-0 w-full h-full z-50 flex justify-center items-start ticketBackdrop text-header-main'
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className='bg-white py-6 px-4 mt-28 w-[360px] h-2/3 rounded-md shadow-sm overflow-y-scroll scrollBarWidth before:scrollBarTrack scrollBarThumb'
      >
        {isTicketLoading ? (
          <SkeletonTicketDetails />
        ) : (
          <>
            <AnimatePresence>
              {ticketModalOpen && (
                <Modal
                  ticketDelete
                  ticketId={ticketId}
                  ticket={ticket}
                  closeTicketDetails={closeTicketDetails}
                />
              )}
            </AnimatePresence>

            <AnimatePresence>
              {commentModalOpen && <Modal commentDelete />}
            </AnimatePresence>

            <div className='flex items-center justify-between mb-10'>
              <div className='flex items-center justify-center'>
                <span>
                  <TicketIcon className='h-6 w-6 text-header-main' />
                </span>
                <h3 className='ml-1 font-medium'>Ticket Details</h3>
              </div>

              <div className='flex items-center space-x-1.5'>
                {user?.userId === ticket?.user && (
                  <div className='relative'>
                    <div
                      onClick={() => setTicketMenuOpen(!ticketMenuOpen)}
                      className={`h-10 w-10 flex items-center justify-center cursor-pointer ${
                        ticketMenuOpen ? "bg-header-main" : "hover:bg-gray-100"
                      } transition-all duration-200 rounded-lg`}
                    >
                      <DotsHorizontalIcon
                        className={`${
                          ticketMenuOpen ? "text-white" : ""
                        } h-6 w-6`}
                      />
                    </div>

                    {ticketMenuOpen && (
                      <button
                        onClick={onTicketDelete}
                        className={`absolute -bottom-9 -left-5 border rounded-md px-2 py-1 z-40 text-sm hover:bg-gray-100 transition-all duration-200 select-none`}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                )}

                <div
                  onClick={closeTicketDetails}
                  className='h-10 w-10 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-all duration-200 rounded-lg'
                >
                  <XIcon className='h-6 w-6' />
                </div>
              </div>
            </div>
            <div>
              <div className='px-3'>
                <div className='flex items-center justify-between'>
                  <p className='text-xs text-gray-text'>Project</p>
                </div>

                <div className='flex items-center justify-between'>
                  <h4 className='text-lg font-medium pr-2'>{ticket.project}</h4>
                  <form>
                    <select
                      disabled={ticket.user !== user.userId}
                      value={ticket?.status}
                      onChange={(e) => {
                        dispatch(
                          updateTicket({
                            ticketId: ticket._id,
                            ticketData: {
                              status: e.target.value,
                            },
                          })
                        );
                      }}
                      name='status'
                      id='status'
                      className={` px-2 py-2 rounded-lg cursor-pointer transition-all duration-200 font-semibold outline-none text-sm uppercase ${getStatusStyles()} ${
                        ticket.user !== user.userId
                          ? "pointer-events-none select-none"
                          : ""
                      }`}
                    >
                      <option
                        className='bg-gray-100 text-header-main uppercase'
                        value='to do'
                      >
                        to do
                      </option>
                      <option
                        className='bg-gray-100 text-header-main uppercase'
                        value='in progress'
                      >
                        in progress
                      </option>
                      <option
                        className='bg-gray-100 text-header-main uppercase'
                        value='closed'
                      >
                        closed
                      </option>
                    </select>
                  </form>
                </div>
              </div>

              <div className='flex flex-col justify-center mt-4 pl-1'>
                <p className='text-sm font-medium pl-2'>Description</p>

                <>
                  {editDescription ? (
                    <>
                      <textarea
                        style={{ resize: "none" }}
                        className={`mt-1 bg-transparent outline-none hover:bg-gray-100 transition-all duration-200 px-3 py-2 rounded-md break-words  scrollbar-thin scrollbar-thumb-light-blue scrollbar-track-gray-300 overflow-y-scroll border`}
                        type='text'
                        value={editDescText}
                        onChange={(e) => setEditDescText(e.target.value)}
                        rows={6}
                        ref={descRef}
                        disabled={ticket.user !== user.userId}
                      />
                      <div className='flex space-x-2 mt-2'>
                        <button
                          onClick={onEditSubmit}
                          className='bg-deep-blue text-white py-1 px-2 rounded-md hover:bg-light-blue transition-all duration-100 text-sm mt-0.5 inline-flex w-fit'
                        >
                          Save
                        </button>
                        <button
                          onClick={onEditCancel}
                          className='hover:bg-gray-200 text-gray-text py-1 px-2 rounded-md transition-all duration-100 text-sm mt-0.5'
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      {!isTicketLoading && (
                        <motion.p
                          initial={{ display: "none" }}
                          animate={{ display: "inline-flex" }}
                          exit={{ display: "none" }}
                          onClick={onEditEnable}
                          className={`${
                            ticket.user !== user.userId
                              ? "pointer-events-none select-none"
                              : ""
                          }  mt-1 bg-transparent outline-none hover:bg-gray-100 transition-all duration-200 px-3 py-2 rounded-md break-words`}
                        >
                          {ticket.description}
                        </motion.p>
                      )}
                    </>
                  )}
                </>
              </div>

              <div
                onClick={() => setDetailsOpen(!detailsOpen)}
                className={`mt-12 flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-all duration-200 py-3 border ${
                  detailsOpen ? "rounded-t-lg border-b-0" : "rounded-lg"
                }`}
              >
                <p className='text-sm font-medium pl-3'>Details</p>
                <div className='text-xs text-gray-text ml-1.5'>
                  {!detailsOpen ? "Reporter, Date" : ""}
                </div>
                <div className='mr-3 ml-auto'>
                  {!detailsOpen ? (
                    <ChevronDownIcon className='w-5 h-5' />
                  ) : (
                    <ChevronUpIcon className='w-5 h-5' />
                  )}
                </div>
              </div>

              {detailsOpen && (
                <div className='border rounded-b-lg pb-4'>
                  <div className='flex flex-col justify-center pl-5 mt-5'>
                    <p className='text-xs text-gray-text mb-1'>Reporter</p>

                    <div className='flex items-center'>
                      <span className='h-5 w-5 rounded-full flex items-center justify-center bg-nice-orange font-semibold text-sm select-none'>
                        {author.name?.charAt(0)}
                      </span>
                      <p className='ml-1 text-xs'>{ticket.name}</p>
                    </div>
                  </div>
                  <div className='flex flex-col justify-center mt-5 pl-5'>
                    <p className='text-xs text-gray-text'>Created</p>
                    <p className='text-xs'>
                      {moment(ticket.createdAt).format("MMMM Do YYYY, h:mm a")}
                    </p>
                  </div>
                  {ticket.createdAt !== ticket.updatedAt ? (
                    <div className='flex flex-col justify-center mt-2 pl-5'>
                      <p className='text-xs text-gray-text'>Updated</p>
                      <p className='text-xs'>
                        {moment(
                          moment(ticket.updatedAt).local().format()
                        ).fromNow()}
                      </p>
                    </div>
                  ) : null}
                </div>
              )}
            </div>

            <div className='mt-10 pl-3'>
              <p className='text-sm font-medium mb-3'>Comments</p>
              <div className='flex items-center space-x-2 w-full'>
                <div className='h-9 w-9 mb-1'>
                  <span className='h-9 w-9 rounded-full flex items-center justify-center bg-nice-orange font-semibold text-base select-none'>
                    {user.name?.charAt(0)}
                  </span>
                </div>

                <form className='w-full'>
                  <textarea
                    className='rounded-lg border w-full py-2 px-3 focus:outline-1 outline-deep-blue text-sm hover:border-gray-400 transition-all duration-150'
                    rows={2}
                    style={{ resize: "none" }}
                    name='commentText'
                    id='commentText'
                    placeholder='Add a comment...'
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                </form>
              </div>
              {commentText.length > 1 && (
                <div className='flex mt-1'>
                  <button
                    className='bg-deep-blue text-white py-1 px-2 rounded-md hover:bg-light-blue transition-all duration-100 text-sm ml-11 font-semibold'
                    onClick={onCommentSubmit}
                  >
                    Add
                  </button>
                </div>
              )}

              <div className='mt-10 flex flex-col space-y-5'>
                {commentsIsLoading ? (
                  <SkeletonComments />
                ) : (
                  <>
                    {comments?.map((comment) => {
                      const findAuthor = users.find(
                        (user) => user._id === comment.user
                      );

                      return (
                        <Comment
                          key={comment._id}
                          {...comment}
                          author={findAuthor.name}
                        />
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default TicketDetails;
