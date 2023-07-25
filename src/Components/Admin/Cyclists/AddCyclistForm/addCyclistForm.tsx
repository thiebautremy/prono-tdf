/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState, useRef } from "react";
import "./addCyclistForm.scss";
import nationalitiesData from "../../../../assets/data/countries.json";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import app from "../../../../config/firebaseConfig";
import teamsArray from "./teams";
import { Toast } from "primereact/toast";

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
  const toast = useRef<Toast>(null);
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
    })
      .then(() => succeedAdd())
      .catch((err) => {
        console.error(err);
        errorAdd();
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

  const succeedAdd = () => {
    toast.current.show({
      severity: "success",
      summary: "Succès",
      detail: "Le cycliste a été correctement ajouté",
      life: 3000,
    });
  };

  const errorAdd = () => {
    toast.current.show({
      severity: "error",
      summary: "Erreur",
      detail: "Erreur lors de l'ajout",
      life: 3000,
    });
  };
  return (
    <div className="addCyclistForm">
      <Toast ref={toast} />
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
              lastname: e.currentTarget.value.toLocaleUpperCase(),
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
          {teamsArray.map((team: { value: string; name: string }) => (
            <option value={team.value} key={team.value}>
              {team.name}
            </option>
          ))}
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
