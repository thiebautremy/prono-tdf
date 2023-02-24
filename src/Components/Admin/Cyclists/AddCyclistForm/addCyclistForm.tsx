/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from "react";
import "./addCyclistForm.scss";
import nationalitiesData from "../../../../assets/data/countries.json";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import app from "../../../../config/firebaseConfig";

type Props = {
  fetchCyclists: () => void;
};
const AddCyclistForm = ({ fetchCyclists }: Props) => {
  const [cyclistToAdd, setCyclistToAdd] = useState({
    lastname: "",
    firstname: "",
    team: "DEFAULT_TEAM",
    number: "",
    nationality: "DEFAULT_NATIONALITY",
  });
  //TODO Check si aucune info est vide avant d'envoyer
  //TODO Conditionner le retour de l'API pour afficher une pop up de confirmation
  const handleAddCyclistSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const db = getFirestore(app);
    await setDoc(doc(db, "cyclists", cyclistToAdd.number), {
      firstname: cyclistToAdd.firstname,
      lastname: cyclistToAdd.lastname.toUpperCase(),
      nationality: cyclistToAdd.nationality,
      number: cyclistToAdd.number,
      team: cyclistToAdd.team,
    });
    setCyclistToAdd({
      lastname: "",
      firstname: "",
      team: "DEFAULT_TEAM",
      number: "",
      nationality: "DEFAULT_NATIONALITY",
    });
    fetchCyclists();
  };
  const nationalitiesDataSortedByName = nationalitiesData.sort((a, b) => {
    return a.nom_fr.toLowerCase() > b.nom_fr.toLowerCase() ? 1 : -1;
  });
  return (
    <div className="addCyclistForm">
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
          handleAddCyclistSubmit(e)
        }
        className="addCyclistForm__form"
      >
        <label htmlFor="lastname" className="addCyclistForm__form__label">
          Nom
        </label>
        <input
          type="text"
          name="lastname"
          id="lastname"
          value={cyclistToAdd.lastname}
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
          value={cyclistToAdd.firstname}
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
          className="addCyclistForm__form__input addCyclistForm__form__input--select"
          value={cyclistToAdd.team}
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
          className="addCyclistForm__form__input addCyclistForm__form__input--select"
          value={cyclistToAdd.nationality}
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
          value={cyclistToAdd.number}
          placeholder="Numéro de dossard"
          className="addCyclistForm__form__input"
          onChange={(e) =>
            setCyclistToAdd({
              ...cyclistToAdd,
              number: e.currentTarget.value,
            })
          }
        />
        <button type="submit" className="addCyclistForm__form__btnSubmit">
          Ajouter
        </button>
      </form>
    </div>
  );
};

export default AddCyclistForm;
