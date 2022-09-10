import React from "react";
import ReactDOM from "react-dom/client";
import "./Styles/general.scss";
import App from "./Components/App/App";
import "./Styles/reset.scss";
import { UserContextProvider } from "./Context/userContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </React.StrictMode>
);
