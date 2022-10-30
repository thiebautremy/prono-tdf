import React, { createContext, useState } from "react";
interface IContextProps {
  setStages: (param: []) => void;
  stages: {
    stageId: number;
    startCity: string;
    endCity: string;
    date: string;
    lengthStage: number;
    type: string;
  }[];
}
export const StagesContext = createContext({} as IContextProps);

interface Props {
  children: JSX.Element | JSX.Element[];
}
export const StagesContextProvider: React.FC<Props> = ({ children }) => {
  const [stages, setStages] = useState([]);
  return (
    <StagesContext.Provider
      value={{
        setStages,
        stages,
      }}
    >
      {children}
    </StagesContext.Provider>
  );
};
export default StagesContext;
