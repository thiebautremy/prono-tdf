/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { createContext, useState } from "react";
import { DocumentData } from "firebase/firestore";

export type UserInfo = {
  authId: string;
  email: string;
  roles: string[];
  username: string;
  color: string;
  points: { [key: number]: number };
  pronos: [
    string,
    {
      [stageId: string]: {
        number: string;
        firstname: string;
        lastname: string;
      };
      [stageId: number]: {
        number: string;
        firstname: string;
        lastname: string;
      };
    }
  ][];
};
interface IContextProps {
  usersData: UserInfo[] | DocumentData[];
  setUsersData: (newUsers: UserInfo[] | DocumentData) => void;
}

export const UsersContext = createContext<IContextProps | undefined>(undefined);

interface Props {
  children: JSX.Element | JSX.Element[];
}
export const UsersContextProvider: React.FC<Props> = ({ children }) => {
  const [usersData, setUsersData] = useState<UserInfo[]>();

  return (
    <UsersContext.Provider
      value={{
        usersData,
        setUsersData,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
export default UsersContext;
