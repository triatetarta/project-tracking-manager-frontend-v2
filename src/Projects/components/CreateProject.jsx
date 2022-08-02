import { PlusIcon } from "@heroicons/react/outline";
import { useDispatch } from "react-redux";
import { openNewProjectModal } from "../projectSlice";

const CreateProject = () => {
  const dispatch = useDispatch();

  const onClickHandle = (e) => {
    e.preventDefault();
    dispatch(openNewProjectModal());
  };

  return (
    <button
      onClick={onClickHandle}
      className='flex items-center justify-center hover:bg-gray-200 px-3 py-3 rounded-lg transition-all duration-200'
    >
      <PlusIcon className='w-3 h-3 text-gray-text' />
      <span className='text-xs font-semibold'>Create Project</span>
    </button>
  );
};

export default CreateProject;
