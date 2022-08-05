import moment from "moment";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../../Account/components/Avatar";
import { openCommentModal, setCommentId } from "../../Modal/modalSlice";
import { convertString } from "../../utils/firstLetterUpercase";
import { updateComment } from "../commentSlice";

const Comment = ({
  _id,
  user: commentUser,
  ticket: ticketId,
  comment,
  createdAt,
  updatedAt,
  author,
}) => {
  const [editEnable, setEditEnable] = useState(false);
  const [editText, setEditText] = useState("");

  const inputRef = useRef(null);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const onEditEnable = () => {
    setEditEnable(true);

    const convComment = comment !== undefined && convertString(comment);
    setEditText(convComment);

    setTimeout(() => {
      inputRef.current.focus();
    }, 50);
  };

  const onEditCancel = () => {
    setEditEnable(false);

    const convComment = comment !== undefined && convertString(comment);

    setEditText(convComment);
  };

  const onDelete = () => {
    dispatch(openCommentModal(true));
    dispatch(setCommentId(_id));
  };

  const onUpdate = () => {
    dispatch(
      updateComment({
        commentId: _id,
        commentData: {
          comment: editText.toLowerCase(),
        },
      })
    );
    setEditEnable(false);
  };

  return (
    <div className='flex space-x-2 w-full'>
      <div className='h-9 w-9'>
        <Avatar
          classNames='h-9 w-9 text-base'
          avatarImage={author?.image}
          avatarName={author?.name}
        />
      </div>
      <div className='flex flex-col space-y-2 w-full'>
        <div className='flex text-xs'>
          <p className='text-xs font-semibold'>{author?.name}</p>
          <span className='ml-3 text-gray-text'>
            {createdAt === updatedAt ? (
              <span>
                {moment(moment(createdAt).local().format()).fromNow()}
              </span>
            ) : (
              <>
                <span className='mr-1.5 italic text-gray-text'>edited</span>
                <span className='text-gray-text'>
                  {moment(moment(updatedAt).local().format()).fromNow()}
                </span>
              </>
            )}
          </span>
        </div>
        {!editEnable ? (
          <p className='text-sm w-full mb-3'>
            {comment !== undefined && convertString(comment)}
          </p>
        ) : (
          <textarea
            ref={inputRef}
            value={editEnable ? editText : comment}
            onChange={(e) => setEditText(e.target.value)}
            disabled={!editEnable}
            className='rounded-lg border w-full py-2 px-3 focus:outline-1 outline-deep-blue text-sm hover:border-gray-400 transition-all duration-150'
            rows={2}
            style={{ resize: "none" }}
          />
        )}

        <div>
          {commentUser === user.userId ? (
            <div className='flex space-x-1 items-center'>
              {editEnable ? (
                <>
                  <button
                    onClick={onUpdate}
                    className='bg-deep-blue text-white py-1 px-2 rounded-md hover:bg-light-blue transition-all duration-100 text-sm mt-0.5'
                  >
                    Save
                  </button>
                  <button
                    onClick={onEditCancel}
                    className='hover:bg-gray-200 text-gray-text py-1 px-2 rounded-md transition-all duration-100 text-sm mt-0.5'
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={onEditEnable}
                    className='text-gray-text py-2 rounded-md hover:underline hover:text-gray-text/75 transition-all duration-100 text-xs font-semibold'
                  >
                    Edit
                  </button>
                  <span className='text-xs text-gray-text'>•</span>
                  <button
                    onClick={onDelete}
                    className='text-gray-text py-2 rounded-md hover:underline hover:text-gray-text/75 transition-all duration-100 text-xs font-semibold'
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Comment;
