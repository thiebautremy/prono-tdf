import React from "react";
import ReactDOM from "react-dom/client";
import "./Styles/general.scss";
import App from "./Components/App/App";
import "./Styles/reset.scss";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { UserContextProvider } from "./Context/userContext";
import { CyclistsContextProvider } from "./Context/cyclistsContext";
import { StagesContextProvider } from "./Context/stagesContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <CyclistsContextProvider>
        <StagesContextProvider>
          <App />
        </StagesContextProvider>
      </CyclistsContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
