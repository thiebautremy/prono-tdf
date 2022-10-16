import React, { createContext, useState } from "react";
interface IContextProps {
  setCyclists: (param: unknown) => void;
  cyclists: [string];
}
export const CyclistsContext = createContext({} as IContextProps);

interface Props {
  children: JSX.Element | JSX.Element[];
}
export const CyclistsContextProvider: React.FC<Props> = ({ children }) => {
  const [cyclists, setCyclists] = useState([]);
  return (
    <CyclistsContext.Provider
      value={{
        setCyclists,
        cyclists,
      }}
    >
      {children}
    </CyclistsContext.Provider>
  );
};
export default CyclistsContext;
