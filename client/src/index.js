import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter as Router } from "react-router-dom";
import { SWRConfig } from "swr";

import App from "./App";
import ErrorFallback from "./components/fallback/ErrorFallback";
import Loading from "./components/fallback/Loading";
import ContextProviders from "./context";

import { fetcher } from "./utils/fetcher";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <React.StrictMode>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <SWRConfig value={{ fetcher, suspense: true }}>
          <Suspense fallback={<Loading />}>
            <ContextProviders>
              <App />
            </ContextProviders>
          </Suspense>
        </SWRConfig>
      </ErrorBoundary>
    </React.StrictMode>
  </Router>
);
