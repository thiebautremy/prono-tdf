/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-prototype-builtins */
import React, { useState, useContext, useEffect, useRef } from "react";
import app from "../../../config/firebaseConfig";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import { MultiSelect } from "primereact/multiselect";
import UserContext from "../../../Context/userContext";
import "./prono.scss";
import ErrorMessage from "../../Form/ErrorMessage/errorMessage";
import { Toast } from "primereact/toast";

const Prono = ({ cyclists, stageId }) => {
  const toast = useRef(null);

  const db = getFirestore(app);
  const { currentUser, userConnectedInfo, setUserConnectedInfo } =
    useContext(UserContext);
  const userRef = doc(db, "users", `${currentUser?.uid}`);
  const [selectedCyclists, setSelectedCyclists] = useState([]);
  const [isError, setIsError] = useState(false);
  //? On set les cyclistes si le prono de l'étape est déjà renseigné
  const setDefaultPronoValue = () => {
    userConnectedInfo?.pronos.hasOwnProperty(stageId) &&
      setSelectedCyclists(userConnectedInfo?.pronos[stageId]);
  };

  useEffect(() => {
    userConnectedInfo.hasOwnProperty("pronos") && setDefaultPronoValue();
  }, [stageId]);
  const cyclistsTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.name}</div>
      </div>
    );
  };

  const formatedCyclistsStagesForDropDown = (arrayToChanged) => {
    const arrayFormated = [];
    for (const cyclist of arrayToChanged) {
      const cyclistObj = {};
      cyclistObj.name = `${cyclist.number} - ${cyclist.lastname} ${cyclist.firstname} - ${cyclist.team}`;
      cyclistObj.code = Number(cyclist.number);
      arrayFormated.push(cyclistObj);
    }
    return arrayFormated.sort((a, b) => Number(a.code) - Number(b.code));
  };

  const handleSetProno = () => {
    selectedCyclists.length < 5
      ? setIsError((prec) => !prec)
      : updateAndFetchData();
  };

  const updateAndFetchData = () => {
    let pronoObj = {};
    pronoObj = { ...userConnectedInfo?.pronos };
    pronoObj[stageId] = selectedCyclists;
    updateDoc(userRef, {
      pronos: pronoObj,
    })
      .then(async () => {
        const userDocumentDbRef = await getDoc(
          doc(db, "users", currentUser.uid)
        );
        setUserConnectedInfo(userDocumentDbRef.data());
        succeedUpdate();
      })
      .catch(() => errorUpdate());
  };

  const succeedUpdate = () => {
    toast.current.show({
      severity: "success",
      summary: "Succès",
      detail: "Les pronostiques ont été mis à jour",
      life: 3000,
    });
  };

  const errorUpdate = () => {
    toast.current.show({
      severity: "error",
      summary: "Erreur",
      detail: "Erreur lors de lors de la mise à jour",
      life: 3000,
    });
  };
  return (
    <div className="prono">
      <Toast ref={toast} position="bottom-left" />
      <div className="prono__inputAndSelection">
        <MultiSelect
          value={selectedCyclists}
          options={formatedCyclistsStagesForDropDown(cyclists)}
          onChange={(e) => setSelectedCyclists(e.value)}
          optionLabel="name"
          placeholder="Sélectionne 5 cyclistes"
          filter
          display="chip"
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
                .sort((a, b) => Number(a.code) - Number(b.code))
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
        Valider les pronostiques
      </button>
    </div>
  );
};

export default Prono;
