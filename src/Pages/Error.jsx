import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className='min-h-[calc(100vh-17.9rem)] flex items-center justify-center flex-col'>
      <h1 className='text-6xl font-medium'>404</h1>
      <h4 className='text-2xl mb-6'>Page Not Found</h4>
      <Link to='/'>
        <a className='border px-4 py-2 rounded-lg'>Back Home</a>
      </Link>
    </div>
  );
};

export default Error;
