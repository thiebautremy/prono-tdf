/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable no-prototype-builtins */
import React, { useContext } from "react";
import { UserContext } from "../../Context/userContext";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import "./navBar.scss";
import { Menubar } from "primereact/menubar";
import { MenuItem } from "primereact/menuitem";
import { MdOutlineDirectionsBike, MdOutlineFolderShared } from "react-icons/md";
import { IoGameControllerOutline } from "react-icons/io5";

const NavBar = () => {
  const { currentUser, userConnectedInfo, setCurrentUser } =
    useContext(UserContext);
  const logOut = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      window.location.replace("/");
    } catch (err) {
      console.log(err);
    }
  };

  const items: MenuItem[] = [
    {
      label: "Mon profil",
      icon: "pi pi-fw pi-user",
      url: "/profil",
    },
    {
      label: "Accueil & Scores",
      icon: "pi pi-fw pi-home",
      url: "/",
    },
    {
      label: "Pronostiquer",
      icon: <IoGameControllerOutline />,
      url: "/prono",
    },
    {
      label: "Cyclistes",
      icon: <MdOutlineDirectionsBike />,
      url: "/cyclists",
    },
    {
      label: "Statistiques",
      icon: "pi pi-fw pi-chart-line",
      url: "/stats",
    },
  ];

  const itemsNotAdmin = [
    ...items,
    {
      label: "Se déconnecter",
      icon: "pi pi-fw pi-power-off",
      command: logOut,
    },
  ];
  const itemsAdmin = [
    ...items,
    {
      label: "Administration",
      icon: <MdOutlineFolderShared />,
      url: "/admin",
    },
    {
      label: "Se déconnecter",
      icon: "pi pi-fw pi-power-off",
      command: logOut,
    },
  ];

  return (
    <div className="navBar">
      {currentUser && (
        <Menubar
          model={
            userConnectedInfo?.hasOwnProperty("roles") &&
            userConnectedInfo?.roles.some((role) => role === "ADMIN_ROLE")
              ? itemsAdmin
              : itemsNotAdmin
          }
        />
      )}
    </div>
  );
};

export default NavBar;
