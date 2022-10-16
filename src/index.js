import React from "react";
import ReactDOM from "react-dom/client";
import "./Styles/general.scss";
import App from "./Components/App/App";
import "./Styles/reset.scss";
import { UserContextProvider } from "./Context/userContext";
import { CyclistsContextProvider } from "./Context/cyclistsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <CyclistsContextProvider>
        <App />
      </CyclistsContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
