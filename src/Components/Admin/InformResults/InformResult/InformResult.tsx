import React, { useState, useEffect } from "react";
import app from "../../../../config/firebaseConfig";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import { MultiSelect, MultiSelectChangeParams } from "primereact/multiselect";
import "../../../Pronos/Prono/prono.scss";
import ErrorMessage from "../../../Form/ErrorMessage/errorMessage";
import Dialogue from "../../../Dialogue/Dialogue";

interface Cyclist {
  number: string;
  lastname: string;
  firstname: string;
}
const InformResult = ({ cyclists, stageId }) => {
  const db = getFirestore(app);

  const [selectedCyclists, setSelectedCyclists] = useState([]);
  const [isError, setIsError] = useState(false);
  //? On set les cyclistes si les résultats de l'étape ont déjà étaient renseignés
  const setDefaultPronoValue = () => {
    // userConnectedInfo.pronos.hasOwnProperty(stageId) &&
    //   setSelectedCyclists(userConnectedInfo.pronos[stageId]);
  };

  useEffect(() => {
    setDefaultPronoValue();
  }, [stageId]);
  const cyclistsTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.name}</div>
      </div>
    );
  };

  const formatedCyclistsStagesForDropDown = (
    arrayToChanged: { number: string; lastname: string; firstname: string }[]
  ) => {
    const arrayFormated = [];
    for (const cyclist of arrayToChanged) {
      const cyclistObj: { name: string; code: string } = { name: "", code: "" };
      cyclistObj.name = `${cyclist.number} - ${cyclist.lastname} ${cyclist.firstname}`;
      cyclistObj.code = cyclist.number;
      arrayFormated.push(cyclistObj);
    }
    return arrayFormated.sort((a, b) => a.code - b.code);
  };

  const handleSetProno = () => {
    selectedCyclists.length < 20
      ? setIsError((prec) => !prec)
      : updateAndFetchData();
  };
  const [visibleModal, setVisibleModal] = useState(false);
  const updateAndFetchData = async () => {
    let pronoObj: { number: string; name: string } = {};
    pronoObj = { ...userConnectedInfo?.pronos };
    pronoObj[stageId] = selectedCyclists;
    console.log(pronoObj);
    // await updateDoc(userRef, {
    //   pronos: pronoObj,
    // });
    // const userDocumentDbRef = await getDoc(doc(db, "users", currentUser.uid));
    // console.log(userDocumentDbRef);
    // setUserConnectedInfo(userDocumentDbRef.data());
    setVisibleModal(true);
  };
  return (
    <div className="prono">
      <Dialogue
        isVisible={visibleModal}
        setIsVisible={setVisibleModal}
        message={"Résultats mis à jour."}
      />
      <div className="prono__inputAndSelection">
        <MultiSelect
          value={selectedCyclists}
          options={formatedCyclistsStagesForDropDown(cyclists)}
          onChange={(e: MultiSelectChangeParams) =>
            setSelectedCyclists(e.value)
          }
          optionLabel="name"
          placeholder="Sélectionne les 20 premiers cyclistes"
          filter
          showSelectAll={false}
          className="multiselect-custom"
          itemTemplate={cyclistsTemplate}
          selectionLimit={20}
          fixedPlaceholder={true}
        />
        <div className="prono__inputAndSelection__selection">
          {selectedCyclists.length > 0 ? (
            <>
              <p
                className="prono__inputAndSelection__selection__header"
                style={{
                  color:
                    selectedCyclists.length < 20
                      ? "rgb(228, 13, 13)"
                      : "rgb(64, 172, 60)",
                }}
              >
                <strong>{selectedCyclists.length}</strong> cycliste
                {selectedCyclists.length > 1 && "s"} sélectionné
                {selectedCyclists.length > 1 && "s"}{" "}
              </p>
              {selectedCyclists.map((cyclist, index) => (
                <p
                  key={cyclist.code}
                  className="prono__inputAndSelection__selection__cyclist"
                >
                  Place n°{index + 1} : {cyclist.name}
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
          <ErrorMessage message={"Tu dois sélectionner 20 cyclistes"} />
        </div>
      )}
      <button onClick={handleSetProno} className="prono__validatePronoBtn">
        Valider les résultats
      </button>
    </div>
  );
};

export default InformResult;
