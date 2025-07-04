import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Main from "./routes/Main";
import Auth from "./routes/Auth";
import Search from "./routes/Search";

import { useSelector } from "react-redux";

const App = () => {
  const { authData } = useSelector((state) => state.auth);

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate replace to="/posts" />} />
        <Route path="/posts" element={<Main />} />
        <Route path="/posts/search" element={<Main />} />
        <Route path="/creators/:name" element={<Search />} />
        <Route path="/tags/:name" element={<Search />} />
        <Route
          path="/signin"
          element={!authData ? <Auth /> : <Navigate replace to="/posts" />}
        />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export const a = 12;
export default App;
