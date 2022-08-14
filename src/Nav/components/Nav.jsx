import { ChevronDownIcon, UserCircleIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { closeAccount, toggleAccount } from "../NavBarSlice";
import { logout, reset } from "../../Auth/authSlice";
import Avatar from "../../Account/components/Avatar";

const Nav = () => {
  const { accountOpen } = useSelector((state) => state.navbar);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const closeOpenMenus = (e) => {
    e.stopPropagation();
    if (e.target.classList.contains("accountButton")) return;
    if (!e.target.classList.contains("accountMenu")) {
      dispatch(closeAccount());
    }
  };

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    dispatch(closeAccount());
    navigate("/");
  };

  return (
    <header
      onClick={(e) => closeOpenMenus(e)}
      className='py-5 px-2 md:px-0 border-b shadow-md w-screen sticky top-0 bg-white z-40 left-0 right-0'
    >
      <nav className='flex items-center justify-between container mx-auto'>
        <Link to='/'>
          <div className='flex items-center space-x-2'>
            <div className='h-10 w-10'>
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
            <h2 className='font-semibold text-2xl text-header-main'>
              ProTrack
            </h2>
          </div>
        </Link>

        <div className='relative accountButton'>
          <button
            onClick={() => dispatch(toggleAccount())}
            className='flex items-center space-x-1 text-light-blue px-2 py-1 rounded-lg hover:bg-gray-100 transition-all duration-200 accountButton'
          >
            {user ? (
              <Avatar
                avatarImage={user?.image}
                avatarName={user?.name}
                classNames='h-7 w-7 text-base'
              />
            ) : (
              <UserCircleIcon className='h-8 w-8 pointer-events-none' />
            )}

            <span className='font-semibold text-md pointer-events-none'>
              Account
            </span>
            <ChevronDownIcon className='h-5 w-5 pointer-events-none' />
          </button>

          {accountOpen && (
            <ul className='accountMenu absolute right-0 w-fit rounded-lg shadow-md border border-gray-200 text-sm bg-white overflow-hidden z-50'>
              {user ? (
                <>
                  <li className='bg-header-main w-full text-white py-2 px-4'>
                    <div className='flex flex-col'>
                      <p className='text-md'>{user?.name}</p>
                      <p className='text-xs font-light'> {user?.email}</p>
                    </div>
                  </li>
                  <li
                    onClick={() => {
                      dispatch(closeAccount());
                      navigate("/account");
                    }}
                    className='accountMenu cursor-pointer py-2 px-4 hover:bg-gray-100'
                  >
                    Profile
                  </li>
                  <li
                    onClick={onLogout}
                    className='accountMenu cursor-pointer py-2 px-4 hover:bg-gray-100'
                  >
                    Log Out
                  </li>
                </>
              ) : (
                <Link to='/login'>
                  <li
                    onClick={() => {
                      navigate("/login");
                      dispatch(closeAccount());
                    }}
                    className='accountMenu cursor-pointer py-2 pl-4 pr-20 hover:bg-gray-100'
                  >
                    Log in
                  </li>
                </Link>
              )}
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Nav;
