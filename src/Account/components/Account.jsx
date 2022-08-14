import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TicketDetails from "../../Tickets/components/TicketDetails";
import AccountInfo from "./AccountInfo";
import AccountMain from "./AccountMain";
import { CameraIcon } from "@heroicons/react/solid";
import { uploadImage } from "../../Auth/authSlice";
import { AnimatePresence, motion } from "framer-motion";
import Avatar from "./Avatar";
import SkeletonAvatar from "../../Skeletons/SkeletonAvatar";

const Account = () => {
  const { user, uploadImageLoading, getMeLoading } = useSelector(
    (state) => state.auth
  );
  const [selectedId, setSelectedId] = useState("");
  const [openTicket, setOpenTicket] = useState(false);
  const [image, setImage] = useState(null);

  const dispatch = useDispatch();

  const superLoad = true;

  useEffect(() => {
    if (!image) return;

    dispatch(uploadImage(image));

    setImage(null);
  }, [image]);

  const ticketClickHandle = (id) => {
    setSelectedId(id);
    setOpenTicket(true);
  };

  const closeTicketDetails = () => {
    setSelectedId("");
    setOpenTicket(false);
  };

  const previewFile = (file) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const handleChange = (e) => {
    const file = e.target.files[0];

    previewFile(file);
  };

  return (
    <section className='flex flex-col min-h-[calc(100vh-17.9rem)]'>
      <header className='h-48 w-full bg-gradient-to-l from-amber-600 to-amber-300'>
        <div className='container mx-auto relative h-full '>
          <div
            className={`absolute -bottom-8 left-0 group h-28 w-28 ${
              uploadImageLoading || getMeLoading
                ? "cursor-wait"
                : "cursor-pointer"
            }`}
          >
            <div className='relative h-28 w-28 overflow-hidden'>
              {uploadImageLoading || getMeLoading ? (
                <SkeletonAvatar sizeClasses='h-28 w-28' />
              ) : (
                <Avatar
                  avatarImage={user?.image}
                  avatarName={user?.name}
                  classNames='h-28 w-28 absolute'
                  spanClasses='text-4xl'
                />
              )}

              <>
                {image && (
                  <img
                    src={image}
                    alt='preview avatar'
                    className='w-28 h-28 absolute rounded-full z-50 text-6xl'
                  />
                )}
              </>

              <motion.form
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className='bg-black/40 h-28 w-28 flex items-center justify-center rounded-full z-50 absolute '
              >
                <label
                  htmlFor='fileInput'
                  className='h-20 w-20 inline-flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                >
                  <CameraIcon className='h-8 w-8 text-white' />
                </label>
                <input
                  type='file'
                  id='fileInput'
                  hidden
                  onChange={(e) => handleChange(e)}
                />
              </motion.form>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {openTicket && (
          <TicketDetails
            ticketId={selectedId}
            closeTicketDetails={closeTicketDetails}
          />
        )}
      </AnimatePresence>

      <main className='container mx-auto flex space-x-10 mt-20'>
        <AccountInfo />
        <AccountMain ticketClickHandle={ticketClickHandle} />
      </main>
    </section>
  );
};

export default Account;
