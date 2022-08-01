import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, reset } from "../authSlice";
import toast from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isSuccess, message, isError } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  return (
    <section className='min-h-[calc(100vh-17.9rem)] flex items-center justify-center flex-col space-y-6 text-header-main'>
      <div className='flex items-center space-x-2'>
        <div className='h-12 w-12'>
          <svg
            width='100%'
            height='100%'
            viewBox='0 0 239 220'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M56.8508 160.849C12.7014 184.697 108 5.99995 109.824 14.976C111.648 23.952 113.206 119.267 113.206 119.267C113.206 119.267 190.751 142.747 213.376 160.874C236 179 101 137 56.8508 160.849Z'
              fill='url(#paint0_linear_502_3)'
            />
            <path
              d='M200.804 57.0484C247.608 42.0965 119.037 238.548 129.274 194.774C139.51 151 139.51 90.932 139.51 90.932C139.51 90.932 30.2338 44.2533 45.6171 36.6268C61.0003 29.0002 154 72.0003 200.804 57.0484Z'
              fill='url(#paint1_linear_502_3)'
            />
            <defs>
              <linearGradient
                id='paint0_linear_502_3'
                x1='1.93124'
                y1='172.199'
                x2='101.849'
                y2='109.068'
                gradientUnits='userSpaceOnUse'
              >
                <stop stopColor='#0254CF' />
                <stop offset='1' stopColor='#2684FF' />
              </linearGradient>
              <linearGradient
                id='paint1_linear_502_3'
                x1='256.733'
                y1='52.9517'
                x2='149.44'
                y2='102.524'
                gradientUnits='userSpaceOnUse'
              >
                <stop stopColor='#0254CF' />
                <stop offset='1' stopColor='#2684FF' />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <h2 className='font-semibold text-3xl text-header-main'>ProTrack</h2>
      </div>

      <div className='w-[400px] border shadow-md rounded-md py-8 px-10 flex flex-col space-y-8'>
        <h4 className='text-center text-gray-500'>Login to continue:</h4>

        <form onSubmit={onSubmit} className='w-full flex flex-col space-y-3'>
          <div className='w-full'>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='Enter your email'
              onChange={onChange}
              value={email}
              required
              className='p-2 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md shadow-sm focus:outline-none focus:border-light-blue focus:ring-light-blue focus:ring-1 sm:text-sm'
            />
          </div>
          <div className='w-full'>
            <input
              type='password'
              id='password'
              name='password'
              value={password}
              placeholder='Enter your password'
              required
              onChange={onChange}
              className='p-2 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md shadow-sm focus:outline-none focus:border-light-blue focus:ring-light-blue focus:ring-1 sm:text-sm'
            />
          </div>

          <div className='w-full'>
            <button className='w-full bg-deep-blue text-white py-2 rounded-md font-semibold hover:bg-light-blue transition duration-75'>
              Login
            </button>
          </div>
        </form>

        <div className='border-b w-full' />

        <div className='text-center'>
          <p className='text-xs'>
            Don't have an account?
            <span
              onClick={() => navigate("/register")}
              className='text-deep-blue underline hover:no-underline cursor-pointer ml-1'
            >
              Sign up here
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
