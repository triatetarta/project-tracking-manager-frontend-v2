import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { closeNewProjectModal, createProject } from "../projectSlice";

const NewProject = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const { title, description } = formData;

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const titleRef = useRef(null);

  const cancelCreateProject = (e) => {
    e.preventDefault();
    dispatch(closeNewProjectModal());
  };

  const onCreateSubmit = (e) => {
    e.preventDefault();

    const projectData = {
      title,
      description,
    };

    if (title === "" || description === "") {
      toast.error("Please fill up all required fields");

      return;
    }

    dispatch(createProject(projectData));
    dispatch(closeNewProjectModal());
  };

  const onChange = (e) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  useEffect(() => {
    titleRef.current.focus();
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
      className='fixed top-0 right-0 left-0 bottom-0 w-full h-full bg-black/20  backdrop-blur-sm z-40'
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className='container mx-auto flex justify-center'
      >
        <div className='bg-white rounded-md shadow-sm w-[400px] p-6 mt-24'>
          <h3 className='text-center text-lg font-semibold mb-5'>
            Create a Project
          </h3>
          <form>
            <div className='mb-2'>
              <label
                className='text-left block mb-1 ml-1 text-xs text-gray-text'
                htmlFor='name'
              >
                Creator
              </label>
              <input
                className='w-full p-2 border rounded-md mb-3'
                type='text'
                value={user?.name}
                disabled
              />
            </div>

            <div className='mb-2'>
              <label
                className='text-left block mb-1 ml-1 text-xs text-gray-text'
                htmlFor='title'
              >
                Project Title
                {!title && <span className='text-red-text ml-0.5'>*</span>}
              </label>
              <input
                ref={titleRef}
                className='w-full p-2 border rounded-md mb-3 placeholder:text-sm hover:bg-gray-100 transition-all duration-200 focus:outline-1 outline-deep-blue'
                type='text'
                name='title'
                id='title'
                value={title}
                onChange={onChange}
                placeholder='Enter a title for your project'
                required
              />
            </div>

            <div className='mb-8'>
              <label
                className='text-left block mb-1 ml-1 text-xs text-gray-text'
                htmlFor='description'
              >
                Project Description
                {!description && (
                  <span className='text-red-text ml-0.5'>*</span>
                )}
              </label>
              <textarea
                rows={2}
                style={{ resize: "none" }}
                className='w-full p-2 border rounded-md mb-3 placeholder:text-sm hover:bg-gray-100 transition-all duration-200 focus:outline-1 outline-deep-blue'
                type='text'
                name='description'
                id='description'
                value={description}
                onChange={onChange}
                placeholder='Enter a description for your project'
                required
              />
            </div>

            <div className='mb-3 flex justify-between'>
              <div className='flex-grow mr-auto' />
              <div className='flex space-x-2'>
                <button
                  onClick={cancelCreateProject}
                  className='text-gray-text py-2 px-3 rounded-md w-full hover:underline hover:text-gray-text/75 transition-all duration-100 text-sm'
                >
                  Cancel
                </button>
                <button
                  onClick={onCreateSubmit}
                  className='bg-deep-blue text-white py-2 px-3 rounded-md w-full hover:bg-light-blue transition-all duration-100 text-sm'
                >
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default NewProject;
