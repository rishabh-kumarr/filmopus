import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import "./index.css";
import { Loader } from "./components/Loader/Loader";
import ErrorBoundary from "./components/Loader/ErrorBoundary";
import { ErrorPage } from "./components/Loader/ErrorPage";
import { reducers } from "./reducers";

// Lazy load App
const App = React.lazy(() => import("./App"));

// Configure Redux store
const store = createStore(reducers, compose(applyMiddleware(thunk)));

// Mount App
ReactDOM.createRoot(document.getElementById("root")).render(
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