import { Routes, Route, Navigate } from "react-router-dom";

import Main from "./routes/Main";
import Auth from "./routes/Auth";
import Search from "./routes/Search";

const App = () => {
    const user = JSON.parse(localStorage.getItem("profile"));

    return (
        <>
            <Routes>
                <Route
                    path="/"
                    exact
                    element={<Navigate replace to="/posts" />}
                />
                <Route path="/posts" exact element={<Main />} />
                <Route path="/posts/search" exact element={<Main />} />
                <Route path="/creators/:name" element={<Search />} />
                <Route path="/tags/:name" element={<Search />} />
                <Route
                    path="/signin"
                    exact
                    element={
                        !user ? <Auth /> : <Navigate replace to="/posts" />
                    }
                />
            </Routes>
        </>
    );
};

export const a = 12;
export default App;
