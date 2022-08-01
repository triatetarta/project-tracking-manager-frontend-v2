import { useNavigate } from "react-router-dom";
import tasksBackground from "../../../public/assets/images/tasks.svg";

const Showcase = () => {
  const navigate = useNavigate();

  return (
    <section className='flex justify-between mt-10'>
      <div className='self-center'>
        <p className='font-semibold text-5xl text-header-main leading-[3.5rem]'>
          The #1 project <br />
          management <br />
          tool used by agile teams
        </p>
        <button
          onClick={() => navigate("/register")}
          className='mt-6 font-semibold bg-deep-blue text-white px-4 py-2 rounded-md hover:bg-light-blue transition-colors duration-75 flex items-center'
        >
          Get it free
        </button>
      </div>
      <div>
        <img src={tasksBackground} alt='task background' />
      </div>
    </section>
  );
};

export default Showcase;
