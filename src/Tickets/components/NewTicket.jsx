import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { createTicket, reset } from "../ticketSlice";
import { useNavigate } from "react-router-dom";
import CreateProject from "../../Projects/components/CreateProject";
import { ChevronDownIcon } from "@heroicons/react/solid";

const NewTicket = ({ setCreateNew }) => {
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message, createSuccess } = useSelector(
    (state) => state.tickets
  );
  const { projects } = useSelector((state) => state.projects);

  const [name] = useState(user?.name);
  const [email] = useState(user?.email);
  const [project, setProject] = useState("");
  const [projectNames, setProjectNames] = useState([]);
  const [description, setDescription] = useState("");

  const textareaRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    textareaRef.current.focus();
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (createSuccess) {
      dispatch(reset());
      setCreateNew(false);
      setProject("");
      setDescription("");
      toast.success("Your ticket has been created!");
      navigate("/");
    }
  }, [dispatch, isError, isSuccess, message, navigate]);

  useEffect(() => {
    if (projects === undefined) return;

    const justProjects = projects.map((project) => {
      return project.title;
    });

    const uniqueProjects = [...new Set(justProjects)];

    setProjectNames(uniqueProjects);
  }, [projects]);

  useEffect(() => {
    if (projectNames === undefined) return;
    setProject(projectNames[0]);
  }, [projectNames]);

  const cancelCreateTicket = (e) => {
    e.preventDefault();
    setCreateNew(false);
    setProject("");
    setDescription("");
  };

  const createTicketSubmit = (e) => {
    e.preventDefault();

    if (!project || !description) {
      toast.error("Please fill up all required fields");

      return;
    }
    dispatch(createTicket({ project, description: description.toLowerCase() }));
  };

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
            Create Ticket
          </h3>

          <div>
            <div className='mb-3'>
              <label
                className='text-left block mb-1 ml-1 text-xs text-gray-text'
                htmlFor='name'
              >
                Reporter
              </label>
              <input
                className='w-full p-2 border rounded-md mb-3'
                type='text'
                value={name}
                disabled
              />
            </div>
            <div className='mb-3'>
              <label
                className='text-left text-xs text-gray-text block mb-1 ml-1'
                htmlFor='email'
              >
                Reporter's Email
              </label>
              <input
                className='w-full p-2 border rounded-md mb-3'
                type='email'
                value={email}
                disabled
              />
            </div>
          </div>

          <form>
            <div className='mb-3'>
              <label
                className='text-left block mb-1 ml-1 text-xs text-gray-text'
                htmlFor='project'
              >
                Project
                {!project && <span className='text-red-text ml-0.5'>*</span>}
              </label>
              <div className='flex items-center justify-between relative'>
                {!projects.length ? (
                  <p className='text-xs p-2 mb-3'>No projects available</p>
                ) : (
                  <div className='relative'>
                    <span className='w-4 h-4 absolute right-2 top-3 z-50 pointer-events-none text-gray-text'>
                      <ChevronDownIcon />
                    </span>
                    <select
                      className='py-2 pl-2 pr-6 border rounded-md mb-3 text-sm hover:bg-gray-100
            transition-all duration-200 cursor-pointer focus:outline-1 outline-deep-blue capitalize appearance-none'
                      name='project'
                      id='project'
                      value={project}
                      onChange={(e) => setProject(e.target.value)}
                    >
                      {projectNames?.map((project, index) => {
                        return (
                          <option key={index} value={project}>
                            {project}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                )}

                <div className='flex items-center mb-3'>
                  <CreateProject />
                </div>
              </div>
            </div>
            <div className='mb-3'>
              <label
                className='text-left block mb-1 ml-1 text-xs text-gray-text'
                htmlFor='description'
              >
                Description
                {!description && (
                  <span className='text-red-text ml-0.5'>*</span>
                )}
              </label>
              <textarea
                ref={textareaRef}
                rows={10}
                style={{ resize: "none" }}
                className='w-full p-2 border rounded-md mb-3 text-sm focus:outline-1 outline-deep-blue'
                name='description'
                id='description'
                placeholder='Enter a description'
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </div>
            <div className='mb-3 flex justify-between'>
              <div className='flex-grow mr-auto' />
              <div className='flex space-x-2'>
                <button
                  onClick={cancelCreateTicket}
                  className='text-gray-text py-2 px-3 rounded-md w-full hover:underline hover:text-gray-text/75 transition-all duration-100 text-sm'
                >
                  Cancel
                </button>
                <button
                  onClick={createTicketSubmit}
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

export default NewTicket;
