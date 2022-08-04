import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../../Auth/hooks/useAuthStatus";
import { Spinner } from "../../Spinner";

const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();
  const { getMeLoading } = useSelector((state) => state.auth);

  if (checkingStatus || getMeLoading) {
    return <Spinner color='dark:fill-white' />;
  }

  return loggedIn ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
