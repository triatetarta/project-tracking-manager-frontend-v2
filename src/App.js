import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Header } from "./Header";
import { Home } from "./Home/";
import TicketsPage from "./Pages/TicketsPage";
import { Login, Register } from "./Auth";
import { PrivateRoute } from "./PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { closeAccount } from "./Header/headerSlice";
import { Account } from "./Account";
import { useEffect } from "react";

const App = () => {
  const { getMeLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const closeOpenMenus = (e) => {
    e.stopPropagation();
    if (e.target.classList.contains("accountButton")) return;
    if (!e.target.classList.contains("accountMenu")) {
      dispatch(closeAccount());
    }
  };

  useEffect(() => {
    if (getMeLoading) {
      document.querySelector("body").style.overflow = "hidden";
    }
    if (!getMeLoading) {
      document.querySelector("body").style.overflow = "auto";
    }
  }, [getMeLoading]);

  return (
    <>
      <div
        onClick={(e) => closeOpenMenus(e)}
        className='min-h-screen overflow-hidden'
      >
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/tickets' element={<PrivateRoute />}>
            <Route path='/tickets' element={<TicketsPage />} />
          </Route>
          <Route path='/account' element={<PrivateRoute />}>
            <Route path='/account' element={<Account />} />
          </Route>
        </Routes>
      </div>
      <Toaster />
    </>
  );
};

export default App;
