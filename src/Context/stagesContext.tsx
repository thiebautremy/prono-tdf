import React, { createContext, useState } from "react";
interface IStage {
  stageId: number;
  startCity: string;
  endCity: string;
  date: { seconds: string; nanoseconds: string };
  lengthStage: number;
  type: string;
}
interface IContextProps {
  setStages: IStage[];
  stages: IStage[];
}
export const StagesContext = createContext({} as IContextProps);

interface Props {
  children: JSX.Element | JSX.Element[];
}
export const StagesContextProvider: React.FC<Props> = ({ children }) => {
  const [stages, setStages] = useState<IStage[]>([]);
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
