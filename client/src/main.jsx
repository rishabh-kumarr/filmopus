import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App.jsx";
import { Loader } from "./components/Loader/Loader";
import ErrorBoundary from "./components/Loader/ErrorBoundary";
import { ErrorPage } from "./components/Loader/ErrorPage";

// eslint-disable-next-line react-refresh/only-export-components
const App = React.lazy(() => import("./App"));

// allows access to store(global state) from anywhere inside the app
import { Provider } from "react-redux";

import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";

import { reducers } from "./reducers";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <ErrorBoundary fallback={<ErrorPage />}>
                <Suspense fallback={<Loader />}>
                    <App />
                </Suspense>
            </ErrorBoundary>
        </BrowserRouter>
    </Provider>
);
