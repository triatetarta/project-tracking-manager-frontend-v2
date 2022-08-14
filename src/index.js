import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "./configureStore";
import { Provider } from "react-redux";
import Favicon from "react-favicon";
import "./styles/main.css";
import "./utils/axiosGlobal";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <div>
      yo
      <Favicon url='./public/favicon.ico' />
    </div>
    <Router>
      <App />
    </Router>
  </Provider>
);
