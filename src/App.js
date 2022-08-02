import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Header } from "./Header";
import { Home } from "./Home/";
import TicketsPage from "./Pages/TicketsPage";
import { Login, Register } from "./Auth";
import { PrivateRoute } from "./PrivateRoute";
import { useDispatch } from "react-redux";
import { closeAccount } from "./Header/headerSlice";
import { useEffect } from "react";
import { getMe } from "./Auth/authSlice";

const App = () => {
  const dispatch = useDispatch();

  const closeOpenMenus = (e) => {
    e.stopPropagation();
    if (e.target.classList.contains("accountButton")) return;
    if (!e.target.classList.contains("accountMenu")) {
      dispatch(closeAccount());
    }
  };

  useEffect(() => {
    dispatch(getMe());
  }, []);

  return (
    <>
      <div onClick={(e) => closeOpenMenus(e)} className='min-h-screen'>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/tickets' element={<PrivateRoute />}>
            <Route path='/tickets' element={<TicketsPage />} />
          </Route>
          <Route path='/account' element={<PrivateRoute />}>
            {/* <Route path='/account' element={<Account />} /> */}
            <>
              <>account</>
            </>
          </Route>
        </Routes>
      </div>
      <Toaster />
    </>
  );
};

export default App;
