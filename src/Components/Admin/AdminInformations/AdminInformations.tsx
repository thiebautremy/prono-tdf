import { Link } from "react-router-dom";
import "./AdminInformations.scss";

const AdminInformations: React.FC = () => {
  return (
    <div className="adminInformations">
      <h1 className="adminInformations__title">
        Informations sur l'administration de l'application
      </h1>
      <ul className="adminInformations__list">
        <li className="adminInformations__list__item">
          <Link to="/admin/users">
            <h2 className="adminInformations__list__item__title">
              Utilisateurs
            </h2>
          </Link>
          <p className="adminInformations__list__item__paragraphe">
            Cet onglet permet de gérer les droits attribués aux utilisateurs de
            l'application
          </p>
        </li>
        <li className="adminInformations__list__item">
          <p>
            <Link to="/admin/cyclists">
              <h2 className="adminInformations__list__item__title">
                Cyclistes
              </h2>
            </Link>
          </p>
          <p className="adminInformations__list__item__paragraphe">
            Cet onglet permet de gérer la liste des cyclistes présent sur le
            tour de France. Il est possible d'en ajouter afin d'avoir la liste
            initiale des coureurs. Il est également possible de supprimer un
            cycliste en cas d'abandon. Il n'est pas possible de modifier un
            cycliste actuellement.
          </p>
        </li>
        <li className="adminInformations__list__item">
          <Link to="/admin/stages">
            <h2 className="adminInformations__list__item__title">Etapes</h2>
          </Link>
          <p className="adminInformations__list__item__paragraphe">
            Cet onglet permet de voir les étapes présentes en base de données.
            Il n'est pour l'instant pas possible d'ajouter les étapes via
            l'administration de l'application.
          </p>
        </li>
        <li className="adminInformations__list__item">
          <Link to="/admin/inform-results">
            <h2 className="adminInformations__list__item__title">
              Renseigner les résultats
            </h2>
          </Link>
          <p className="adminInformations__list__item__paragraphe">
            Cet onglet permet de renseigner les résultats des étapes. A chaque
            fin d'étapes un administrateur devra renseigner les 20 premiers
            cyclistes de l'étape afin de pouvoir par la suite calculer les
            points des pronostiques.
          </p>
        </li>
        <li className="adminInformations__list__item">
          <Link to="/admin/calculate">
            <h2 className="adminInformations__list__item__title">
              Calculer les points
            </h2>
          </Link>
          <p className="adminInformations__list__item__paragraphe">
            Cet onglet permet de calculer les points des utilisateurs de
            l'application. Un administrateur devra calculer les points a chaque
            fin d'étape et après avoir renseigner les résultats de cette
            dernière.
          </p>
        </li>
        <li className="adminInformations__list__item">
          <Link to="/admin/archive">
            <h2 className="adminInformations__list__item__title">
              Archiver les points et les performances
            </h2>
          </Link>
          <p className="adminInformations__list__item__paragraphe">
            Cet onglet permet d'archiver les points et les performances une fois
            une édition du tour de France terminée.
          </p>
        </li>
      </ul>
    </div>
  );
};
export default AdminInformations;
