import React, { useState, useContext } from "react";
import app from "../../../config/firebaseConfig";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import { MultiSelect, MultiSelectChangeParams } from "primereact/multiselect";
import UserContext from "../../../Context/userContext";
import "./prono.scss";
import ErrorMessage from "../../Form/ErrorMessage/errorMessage";

const Prono = ({ cyclists, stageId }) => {
  //TODO Afficher message de succès de la réponse de l'API de firebase
  const db = getFirestore(app);
  const { currentUser, userConnectedInfo, setUserConnectedInfo } =
    useContext(UserContext);
  const userRef = doc(db, "users", `${currentUser.uid}`);
  const [selectedCyclists, setSelectedCyclists] = useState([]);
  const [isError, setIsError] = useState(false);
  const cyclistsTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.name}</div>
      </div>
    );
  };

  const formatedCyclistsStagesForDropDown = (arrayToChanged) => {
    const arrayFormated: string[] = [];
    for (let i = 0; i < arrayToChanged.length; i++) {
      const cyclistObj: { name: string; code: string } = {};
      cyclistObj.name = `${arrayToChanged[i].number} - ${arrayToChanged[i].lastname} ${arrayToChanged[i].firstname}`;
      cyclistObj.code = arrayToChanged[i].number;
      arrayFormated.push(cyclistObj);
    }
    return arrayFormated.sort((a, b) => a.code - b.code);
  };

  const handleSetProno = () => {
    selectedCyclists.length < 5
      ? setIsError((prec) => !prec)
      : updateAndFetchData();
    //TODO faire un get du user pour récupérer les pronos et afficher un message de MAJ des prono après avoir updateDoc
  };

  const updateAndFetchData = async () => {
    const numeroCyclists = selectedCyclists.map((cyclist) => cyclist.code);
    console.log(userConnectedInfo);
    const pronoObj = { ...userConnectedInfo?.pronos };
    console.log(pronoObj);
    pronoObj[stageId] = numeroCyclists;
    console.log(pronoObj);
    await updateDoc(userRef, {
      pronos: pronoObj,
    });
    const userDocumentDbRef = await getDoc(doc(db, "users", currentUser.uid));
    setUserConnectedInfo(userDocumentDbRef.data());
  };
  return (
    <div className="prono">
      <div className="prono__inputAndSelection">
        <MultiSelect
          value={selectedCyclists}
          options={formatedCyclistsStagesForDropDown(cyclists)}
          onChange={(e: MultiSelectChangeParams) =>
            setSelectedCyclists(e.value)
          }
          optionLabel="name"
          placeholder="Sélectionne 5 cyclistes"
          filter
          showSelectAll={false}
          className="multiselect-custom"
          itemTemplate={cyclistsTemplate}
          selectionLimit={5}
          fixedPlaceholder={true}
        />
        <div className="prono__inputAndSelection__selection">
          {selectedCyclists.length > 0 ? (
            <>
              <p
                className="prono__inputAndSelection__selection__header"
                style={{
                  color:
                    selectedCyclists.length < 5
                      ? "rgb(228, 13, 13)"
                      : "rgb(64, 172, 60)",
                }}
              >
                <strong>{selectedCyclists.length}</strong> cycliste
                {selectedCyclists.length > 1 && "s"} sélectionné
                {selectedCyclists.length > 1 && "s"}{" "}
              </p>
              {selectedCyclists
                .sort((a, b) => a.code - b.code)
                .map((cyclist) => (
                  <p
                    key={cyclist.code}
                    className="prono__inputAndSelection__selection__cyclist"
                  >
                    {cyclist.name}
                  </p>
                ))}
            </>
          ) : (
            <p className="prono__inputAndSelection__selection__header">
              Aucun cyclistes sélectionnés
            </p>
          )}
        </div>
      </div>
      {isError && (
        <div className="prono__errorMessage">
          <ErrorMessage message={"Tu dois sélectionner 5 cyclistes"} />
        </div>
      )}
      <button onClick={handleSetProno} className="prono__validatePronoBtn">
        Valider tes pronostiques
      </button>
    </div>
  );
};

export default Prono;