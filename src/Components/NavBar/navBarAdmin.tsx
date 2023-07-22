import React from "react";
import "./navBar.scss";
import { Menubar } from "primereact/menubar";
import { MenuItem } from "primereact/menuitem";
import {
  MdOutlineDirectionsBike,
  MdOutlineSave,
  MdFormatListNumbered,
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
  ];
  return (
    <div className="navBarAdmin">
      {/* <>
        <nav>
          <Link to="/" className="navBar__link">
            <FaAngleLeft />
            Retour à l'application
          </Link>
          <Link to="/admin" className="navBar__link">
            Administration
          </Link>
          <Link to="/admin/users" className="navBar__link">
            Utilisateurs
          </Link>
          <Link to="/admin/cyclists" className="navBar__link">
            Cyclistes
          </Link>
          <Link to="/admin/stages" className="navBar__link">
            Etapes
          </Link>
          <Link to="/admin/inform-results" className="navBar__link">
            Renseigner les résultats
          </Link>
          <Link to="/admin/calculate" className="navBar__link">
            Calculer les points
          </Link>
        </nav>
      </> */}
      <Menubar model={itemsAdmin} />
    </div>
  );
};

export default NavBarAdmin;
