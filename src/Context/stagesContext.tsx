import { DocumentData } from "firebase/firestore";
import React, { createContext, useState } from "react";
export type IStage = {
  stageId: number;
  startCity: string;
  endCity: string;
  date: { seconds: number; nanoseconds: number };
  lengthStage: number;
  type: string;
};
interface IContextProps {
  setStages: (newValue: IStage[] | DocumentData) => void;
  stages: IStage[];
}
export const StagesContext = createContext({} as IContextProps);

interface Props {
  children: JSX.Element | JSX.Element[];
}
export const StagesContextProvider: React.FC<Props> = ({ children }) => {
  const [stages, setStages] = useState<IStage[] | []>([]);
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
