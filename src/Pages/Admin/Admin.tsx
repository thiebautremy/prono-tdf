import React, { PropsWithChildren } from "react";
import NavBarAdmin from "../../Components/NavBar/navBarAdmin";

const Admin: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="admin">
      <NavBarAdmin />
      {children}
    </div>
  );
};

export default Admin;
