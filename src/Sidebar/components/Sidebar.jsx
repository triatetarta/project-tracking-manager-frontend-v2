import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../Auth/authSlice";
import CreateProject from "../../Projects/components/CreateProject";
import { AnimatePresence, motion } from "framer-motion";
import { getAllProjects } from "../../Projects/projectSlice";
import SkeletonProjects from "../../Skeletons/SkeletonProjects";
import SkeletonTeams from "../../Skeletons/SkeletonTeams";
import SkeletonPeople from "../../Skeletons/SkeletonPeople";

const Sidebar = () => {
  const [nameHover, setNameHover] = useState(false);
  const [indexHover, setIndexHover] = useState(null);
  const [teams, setTeams] = useState([]);
  const [projectNames, setProjectNames] = useState([]);
  const {
    user,
    users,
    isLoading: authLoading,
  } = useSelector((state) => state.auth);
  const { projects, isSuccess, isLoading, isCreatedSuccess } = useSelector(
    (state) => state.projects
  );
  const { tickets } = useSelector((state) => state.tickets);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  useEffect(() => {
    if (users === undefined) return;

    const justTeams = users.map((user) => {
      if (user.department === "") return;
      return user.department;
    });

    const uniqueTeams = [...new Set(justTeams)];

    setTeams(uniqueTeams);
  }, [users]);

  useEffect(() => {
    if (projects === undefined) return;
    const justProjects = projects.map((project) => {
      return project.title;
    });

    const uniqueProjects = [...new Set(justProjects)];

    setProjectNames(uniqueProjects);
  }, [projects]);

  useEffect(() => {
    dispatch(getAllProjects());
  }, [isCreatedSuccess]);

  return (
    <aside className='bg-sidebar-bg w-[300px] lg:w-[200px] min-h-[calc(100vh-5.1rem)] border-l border-r py-10 px-2 text-header-main'>
      <div className='border-b-2'>
        <div className='flex flex-col px-3 pb-2'>
          <p className='text-xs text-gray-text'>Hello,</p>
          <p className='text-base font-semibold'>{user?.name}</p>
        </div>
      </div>
      <div className='px-3 mt-10'>
        <h3 className='uppercase text-xs font-bold mb-2'>Projects</h3>
        <div className='flex flex-col space-y-1'>
          {isLoading ? (
            <>
              <SkeletonProjects />
              <SkeletonProjects />
              <SkeletonProjects />
              <SkeletonProjects />
            </>
          ) : (
            <>
              {projectNames?.map((project, index) => {
                return (
                  <div
                    key={index}
                    className='text-xs font-semibold bg-projects-bg text-white px-2 py-2 rounded-md select-none'
                  >
                    {project}
                  </div>
                );
              })}
            </>
          )}
        </div>
        <div className='mt-2'>
          <CreateProject />
        </div>
      </div>
      <div className='px-3 mt-10'>
        <h3 className='uppercase text-xs font-bold mb-2'>Teams</h3>
        <div className='flex flex-col space-y-1'>
          {authLoading ? (
            <>
              <SkeletonTeams />
              <SkeletonTeams />
              <SkeletonTeams />
              <SkeletonTeams />
            </>
          ) : (
            <>
              {teams?.map((team, index) => {
                if (team === undefined) return;
                return (
                  <span
                    key={index}
                    className='text-xs font-semibold bg-teams-bg text-white px-2 py-2 rounded-md select-none'
                  >
                    {team}
                  </span>
                );
              })}
            </>
          )}
        </div>
      </div>
      <div className='px-3 mt-10'>
        <h3 className='uppercase text-xs font-bold'>People</h3>
        <div className='flex items-center flex-wrap mt-2 w-full'>
          {authLoading ? (
            <>
              <SkeletonPeople />
            </>
          ) : (
            <>
              {users?.map((user, index) => {
                const filteredTickets = tickets?.filter(
                  (tickets) => tickets.user === user._id
                );
                return (
                  <div
                    onMouseEnter={() => {
                      setNameHover(true);
                      setIndexHover(index);
                    }}
                    onMouseLeave={() => {
                      setNameHover(false);
                      setIndexHover(null);
                    }}
                    key={user?._id}
                    className='flex items-center relative mb-1 mr-1'
                  >
                    <span className='h-6 w-6 rounded-full flex items-center justify-center bg-nice-orange font-semibold text-sm select-none '>
                      {user?.name?.charAt(0)}
                    </span>
                    <AnimatePresence>
                      {nameHover && index === indexHover && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          className='absolute -top-[4.75rem] -left-1/2 whitespace-nowrap text-xs transform -translate-x-1/1 bg-header-main text-white font-normal px-1.5 py-0.5 rounded-md z-40  shadow-sm'
                        >
                          <div className='flex flex-col p-1.5'>
                            <p className='text-sm'>{user?.name}</p>
                            <p className='text-gray-300 text-[0.65rem]'>
                              {user?.email}
                            </p>
                            <p className='pt-1'>
                              {filteredTickets?.length !== 0 &&
                                filteredTickets?.length}
                              <span
                                className={`${
                                  filteredTickets?.length !== 0 && "ml-1"
                                }`}
                              >
                                {filteredTickets?.length > 1 &&
                                  "tickets created"}
                                {filteredTickets?.length === 1 &&
                                  "ticket created"}
                                {filteredTickets?.length === 0 &&
                                  `${user?.name} has no tickets`}
                              </span>
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
