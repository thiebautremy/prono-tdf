import React, { createContext, useMemo, useState } from "react";
interface IContextProps {
  setCyclists: Cyclist[];
  cyclists: Cyclist[];
}
export const CyclistsContext = createContext({} as IContextProps);

type Cyclist = {
  firstname: string;
  lastname: string;
  team: string;
  nationality: string;
  number: number;
};
interface Props {
  children: JSX.Element | JSX.Element[];
}
export const CyclistsContextProvider: React.FC<Props> = ({ children }) => {
  const [cyclists, setCyclists] = useState<Cyclist[]>([]);
  const providerValue = useMemo(
    () => ({
      cyclists,
      setCyclists,
    }),
    [cyclists]
  );
  return (
    <CyclistsContext.Provider value={providerValue}>
      {children}
    </CyclistsContext.Provider>
  );
};
export default CyclistsContext;
