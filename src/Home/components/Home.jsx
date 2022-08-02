import Showcase from "./Showcase";
import Description from "./Description";
import Details from "./Details";
import Workflow from "./Workflow";
import Plans from "./Plans";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Home = () => {
  const { user, getMeLoading } = useSelector((state) => state.auth);

  return (
    <>
      {getMeLoading && <div>loading</div>}
      {user && <Navigate to='/tickets' />}

      {!user && (
        <main className='container mx-auto'>
          <Showcase />
          <Description />
          <Details />
          <Workflow />
          <Plans />
        </main>
      )}
    </>
  );
};

export default Home;
