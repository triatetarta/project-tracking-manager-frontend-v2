import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Header } from "./Header";
import { Home } from "./Home/";
import { Login, Register } from "./Auth";
import { PrivateRoute } from "./PrivateRoute";
import { useDispatch } from "react-redux";
import { closeAccount } from "./Header/headerSlice";

const App = () => {
  const dispatch = useDispatch();

  const closeOpenMenus = (e) => {
    e.stopPropagation();
    if (e.target.classList.contains("accountButton")) return;
    if (!e.target.classList.contains("accountMenu")) {
      dispatch(closeAccount());
    }
  };

  return (
    <>
      <div onClick={(e) => closeOpenMenus(e)} className='min-h-screen'>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
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
