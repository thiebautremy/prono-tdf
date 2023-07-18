/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable no-prototype-builtins */
import React, { useContext } from "react";
import { UserContext } from "../../Context/userContext";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./navBar.scss";
import { Menubar } from "primereact/menubar";
import { MenuItem } from "primereact/menuitem";

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
  const handleLog = () => {
    console.log("elem cliqué");
  };

  const items: MenuItem[] = [
    {
      label: `Bonjour ${currentUser.displayName}`,
      icon: "pi pi-fw pi-user",
    },
    {
      label: "Accueil & Scores",
      icon: "pi pi-fw pi-home",
      url: "/",
    },
    {
      label: "Pronostiquer",
      icon: "pi pi-fw pi-save",
      url: "/prono",
    },
    {
      label: "Statistiques",
      icon: "pi pi-fw pi-chart-line",
      url: "/stats",
    },
    // userConnectedInfo?.hasOwnProperty("roles") &&
    //   userConnectedInfo?.roles.some((role) => role === "ADMIN_ROLE") && {
    //     label: "Administration",
    //     icon: "pi pi-fw pi-sitemap",
    //     url: "/admin",
    //   },
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
      icon: "pi pi-fw pi-sitemap",
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
