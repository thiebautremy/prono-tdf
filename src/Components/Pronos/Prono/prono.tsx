/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-prototype-builtins */
import React, { useState, useContext, useEffect } from "react";
import app from "../../../config/firebaseConfig";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import { MultiSelect, MultiSelectChangeParams } from "primereact/multiselect";
import UserContext from "../../../Context/userContext";
import "./prono.scss";
import ErrorMessage from "../../Form/ErrorMessage/errorMessage";
import Dialogue from "../../Dialogue/Dialogue";
import Cyclist from "../../../Context/cyclistsContext";

interface Cyclist {
  number: string;
  lastname: string;
  firstname: string;
}
type PronoType = {
  cyclists: Cyclist[];
  stageId: string | number;
};
const Prono: React.FC<PronoType> = ({ cyclists, stageId }) => {
  const db = getFirestore(app);
  const { currentUser, userConnectedInfo, setUserConnectedInfo } =
    useContext(UserContext);
  const userRef = doc(db, "users", `${currentUser?.uid}`);
  const [selectedCyclists, setSelectedCyclists] = useState<
    | {
        number: string;
        lastname: string;
        firstname: string;
        code: string;
        name: string;
      }[]
    | null
  >([]);
  const [isError, setIsError] = useState<boolean>(false);
  //? On set les cyclistes si le prono de l'étape est déjà renseigné
  const setDefaultPronoValue = () => {
    userConnectedInfo?.pronos.hasOwnProperty(stageId) &&
      setSelectedCyclists(userConnectedInfo?.pronos[stageId]);
  };

  useEffect(() => {
    userConnectedInfo.hasOwnProperty("prono") && setDefaultPronoValue();
  }, [stageId]);
  const cyclistsTemplate = (option: { name: string }) => {
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
    return arrayFormated.sort(
      (a: { code: string }, b: { code: string }) =>
        Number(a.code) - Number(b.code)
    );
  };

  const handleSetProno = () => {
    selectedCyclists.length < 5
      ? setIsError((prec) => !prec)
      : updateAndFetchData();
  };
  const [visibleModal, setVisibleModal] = useState(false);
  const updateAndFetchData = async () => {
    let pronoObj: { [stageId: number]: { number: string; name: string } } = {};
    pronoObj = { ...userConnectedInfo?.pronos };
    pronoObj[stageId] = selectedCyclists;
    await updateDoc(userRef, {
      pronos: pronoObj,
    });
    const userDocumentDbRef = await getDoc(doc(db, "users", currentUser.uid));
    setUserConnectedInfo(userDocumentDbRef.data());
    setVisibleModal(true);
  };
  return (
    <div className="prono">
      <Dialogue
        isVisible={visibleModal}
        setIsVisible={setVisibleModal}
        message={"Votre pronostique a été mis à jour."}
      />
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
        Valider tes pronostiques
      </button>
    </div>
  );
};

export default Prono;
