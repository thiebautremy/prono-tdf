import React from "react";
import "./navBar.scss";
import { Menubar } from "primereact/menubar";
import { MenuItem } from "primereact/menuitem";
import {
  MdOutlineDirectionsBike,
  MdOutlineSave,
  MdFormatListNumbered,
  MdArchive,
} from "react-icons/md";
import { BsCalculator } from "react-icons/bs";

const NavBarAdmin = () => {
  const itemsAdmin: MenuItem[] = [
    {
      label: "Retour à l'application",
      icon: "pi pi-fw pi-chevron-circle-left",
      url: "/",
    },
    {
      label: "Utilisateurs",
      icon: "pi pi-fw pi-user-edit",
      url: "/admin/users",
    },
    {
      label: "Cyclistes",
      icon: <MdOutlineDirectionsBike />,
      url: "/admin/cyclists",
    },
    {
      label: "Etapes",
      icon: <MdFormatListNumbered />,
      url: "/admin/stages",
    },
    {
      label: "Renseigner les résultats",
      icon: <MdOutlineSave />,
      url: "/admin/inform-results",
    },
    {
      label: "Calculer les points",
      icon: <BsCalculator />,
      url: "/admin/calculate",
    },
    {
      label: "Archiver les points",
      icon: <MdArchive />,
      url: "/admin/archive",
    },
  ];
  return (
    <div className="navBarAdmin">
      <Menubar model={itemsAdmin} />
    </div>
  );
};

export default NavBarAdmin;
