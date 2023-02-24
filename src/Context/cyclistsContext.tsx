import React, { createContext, useState } from "react";
interface IContextProps {
  setCyclists: (newCyclists: Cyclist[]) => void;
  cyclists: Cyclist[];
}
export const CyclistsContext = createContext({} as IContextProps);

export type Cyclist = {
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
  return (
    <CyclistsContext.Provider value={{ cyclists, setCyclists }}>
      {children}
    </CyclistsContext.Provider>
  );
};
export default CyclistsContext;
