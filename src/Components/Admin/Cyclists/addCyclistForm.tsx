import React, { useState } from "react";
import nationalitiesData from "../../../assets/data/countries.json";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import app from "../../../config/firebaseConfig";

const AddCyclistForm = ({ fetchCyclists }) => {
  const [cyclistToAdd, setCyclistToAdd] = useState({});
  //TODO Check si aucune info est vide avant d'envoyer
  //TODO Conditionner le retour de l'API pour afficher une pop up de confirmation
  const handleAddCyclistSubmit = async (e) => {
    e.preventDefault();
    const db = getFirestore(app);
    await setDoc(doc(db, "cyclists", cyclistToAdd.number), {
      firstname: cyclistToAdd.firstname,
      lastname: cyclistToAdd.lastname.toUpperCase(),
      nationality: cyclistToAdd.nationality,
      number: cyclistToAdd.number,
      team: cyclistToAdd.team,
    });
    fetchCyclists();
  };
  const nationalitiesDataSortedByName = nationalitiesData.sort((a, b) => {
    return a.nom_fr.toLowerCase() > b.nom_fr.toLowerCase() ? 1 : -1;
  });
  return (
    <div className="addCyclistForm">
      <form
        onSubmit={(e) => handleAddCyclistSubmit(e)}
        className="addCyclistForm__form"
      >
        <label htmlFor="lastname" className="addCyclistForm__form__label">
          Nom
        </label>
        <input
          type="text"
          name="lastname"
          id="lastname"
          placeholder="Nom de famille"
          className="addCyclistForm__form__input"
          onChange={(e) =>
            setCyclistToAdd({
              ...cyclistToAdd,
              lastname: e.currentTarget.value,
            })
          }
        />
        <label htmlFor="firstname" className="addCyclistForm__form__label">
          Prénom
        </label>
        <input
          type="text"
          name="firstname"
          id="firstname"
          placeholder="Prénom"
          className="addCyclistForm__form__input"
          onChange={(e) =>
            setCyclistToAdd({
              ...cyclistToAdd,
              firstname: e.currentTarget.value,
            })
          }
        />
        <label htmlFor="team" className="addCyclistForm__form__label">
          Equipe
        </label>
        <select
          name="team"
          id="team"
          className="addCyclistForm__form__input"
          onChange={(e) =>
            setCyclistToAdd({
              ...cyclistToAdd,
              team: e.currentTarget.value,
            })
          }
          defaultValue={"DEFAULT_TEAM"}
        >
          <option value="DEFAULT_TEAM" disabled>
            Sélectionner une équipe
          </option>
          <option value="FDJ">Française des jeux</option>
          <option value="UAE">UAE</option>
          <option value="BOUH">Bouh</option>
        </select>
        <label htmlFor="nationality" className="addCyclistForm__form__label">
          Nationalité
        </label>
        <select
          name="nationality"
          id="nationality"
          className="addCyclistForm__form__input"
          onChange={(e) =>
            setCyclistToAdd({
              ...cyclistToAdd,
              nationality: e.currentTarget.value,
            })
          }
          defaultValue={"DEFAULT_NATIONALITY"}
        >
          <option value="DEFAULT_NATIONALITY" disabled>
            Sélectionner une nationalité
          </option>
          {nationalitiesDataSortedByName.map(
            (nationality: { id: string; alpha: string; nom_fr: string }) => (
              <option value={nationality.alpha} key={nationality.id}>
                {nationality.nom_fr}
              </option>
            )
          )}
        </select>
        <label htmlFor="number" className="addCyclistForm__form__label">
          Numéro de dossard
        </label>
        <input
          type="number"
          name="number"
          id="number"
          placeholder="Numéro de dossard"
          className="addCyclistForm__form__input"
          onChange={(e) =>
            setCyclistToAdd({
              ...cyclistToAdd,
              number: e.currentTarget.value,
            })
          }
        />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default AddCyclistForm;
