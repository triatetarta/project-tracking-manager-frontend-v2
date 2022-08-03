import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  closeCommentModal,
  closeTicketModal,
  setCommentId,
} from "../modalSlice";
import { ExclamationIcon } from "@heroicons/react/solid";
import { deleteTicket } from "../../Tickets/ticketSlice";
import { deleteComment } from "../../Comments/commentSlice";

const Modal = ({
  commentDelete,
  ticketDelete,
  ticket,
  ticketId,
  closeTicketDetails,
}) => {
  const { commentId } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const handleDeleteTicket = () => {
    dispatch(deleteTicket(ticketId));
    dispatch(closeTicketModal());
    closeTicketDetails();
  };

  const handleDeleteComment = () => {
    dispatch(deleteComment(commentId));
    dispatch(closeCommentModal());
  };

  return (
    <motion.section
      onClick={(e) => {
        e.stopPropagation();
        if (e.target.classList.contains("modalBackdrop")) {
          if (ticketDelete) {
            dispatch(closeTicketModal());
          }
          if (commentDelete) {
            dispatch(closeCommentModal());
          }
        }
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
      className='fixed top-0 right-0 left-0 bottom-0 w-full h-full bg-black/20  backdrop-blur-sm z-50 modalBackdrop'
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className='container mx-auto flex justify-center'
      >
        <div className='bg-white rounded-md shadow-sm w-[400px] p-6 mt-24'>
          <div className='flex items-center'>
            <span className='mr-3'>
              <ExclamationIcon className='w-6 h-6 text-red-text' />
            </span>
            <span className='text-xl font-medium'>
              Delete
              {commentDelete ? " comment ?" : ` ${ticket?.project} ticket ?`}
            </span>
          </div>

          <br />
          <p className='text-sm'>
            You're about to permanently delete{" "}
            {commentDelete
              ? "this comment."
              : "this ticket, its comments and all of its data."}
            <br />
            <br />
            If you're not sure, you can resolve or close this issue instead.
          </p>

          <br />
          <div className='flex justify-end space-x-2 text-sm'>
            <button
              onClick={() => {
                if (commentDelete) {
                  handleDeleteComment();
                }
                if (ticketDelete) {
                  handleDeleteTicket();
                }
              }}
              className='bg-red-text hover:bg-red-text-light text-white px-3 py-2 rounded-md transition-all duration-200'
            >
              Delete
            </button>
            <button
              onClick={() => {
                if (commentDelete) {
                  dispatch(closeCommentModal());
                  dispatch(setCommentId(""));
                }

                if (ticketDelete) {
                  dispatch(closeTicketModal());
                }
              }}
              className='px-3 py-2 rounded-md text-gray-text hover:bg-gray-100 transition-all duration-200'
            >
              Cancel
            </button>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Modal;
