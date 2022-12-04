import React, { useState, useEffect } from "react";
import app from "../../../../config/firebaseConfig";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import "../../../Pronos/Prono/prono.scss";
import ErrorMessage from "../../../Form/ErrorMessage/errorMessage";
import Dialogue from "../../../Dialogue/Dialogue";
import "./InformResult.scss";

type Props = {
  cyclists: { number: string; lastname: string; firstname: string };
  stageId: number;
};

const InformResult = ({ cyclists, stageId }: Props) => {
  const db = getFirestore(app);
  const [selectedCyclists, setSelectedCyclists] = useState({});
  const [isError, setIsError] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [cyclistsList, setCyclistsList] = useState(cyclists);
  //? On set les cyclistes si les résultats de l'étape ont déjà étaient renseignés
  const setDefaultPronoValue = () => {
    // userConnectedInfo.pronos.hasOwnProperty(stageId) &&
    //   setSelectedCyclists(userConnectedInfo.pronos[stageId]);
  };

  useEffect(() => {
    setDefaultPronoValue();
  }, [stageId]);

  const handleSetResults = async () => {
    Object.keys(selectedCyclists).length < 20
      ? setIsError((prec) => !prec)
      : await updateAndFetchData();
  };

  const updateAndFetchData = async () => {
    await setDoc(doc(db, "results", stageId.toString()), selectedCyclists);
    setVisibleModal(true);
    setIsError(false);
  };
  const handleDragEnd = (e: DragEvent) => {
    e.preventDefault();
  };

  const handleDragStart = (e, cyclist: { number: number }) => {
    e.dataTransfer.setData("id", cyclist.number);
  };

  const handleOnDrop = (e, key) => {
    const id = e.dataTransfer.getData("id");
    const cyclistDrag = cyclists.find((cyclist) => cyclist.number == id);
    const selectedCyclistsObj = { ...selectedCyclists };
    selectedCyclistsObj[key] = cyclistDrag;
    setCyclistsList(cyclistsList.filter((cyclist) => cyclist.number !== id));
    setSelectedCyclists({ ...selectedCyclistsObj });
  };

  const selectionsArray = () => {
    const row = [];
    for (let i = 1; i <= 20; i++) {
      row.push(
        <div
          className="informResult__DragableAndselection__selection"
          onDragOver={(e) => handleDragEnd(e)}
          onDrop={(e) => handleOnDrop(e, i)}
          key={i}
        >
          <span className="informResult__DragableAndselection__selection--strong">
            {`Place n° ${i} :`}{" "}
          </span>
          {selectedCyclists[i] !== undefined && (
            <span className="informResult__DragableAndselection__selection__cyclist">
              {`${selectedCyclists[i].number} - ${selectedCyclists[i].lastname}
              ${selectedCyclists[i].firstname}`}
            </span>
          )}
        </div>
      );
    }
    return row;
  };

  return (
    <div className="informResult">
      <Dialogue
        isVisible={visibleModal}
        setIsVisible={setVisibleModal}
        message={"Résultats mis à jour."}
      />
      <div className="informResult__DragableAndselection">
        <div className="informResult__DragableAndselection__dragable">
          {cyclistsList
            .sort((a, b) => a.number - b.number)
            .map((cyclist) => (
              <div
                key={cyclist.number}
                draggable
                onDragStart={(e) => handleDragStart(e, cyclist)}
                className="informResult__DragableAndselection__dragable--items"
              >
                {cyclist.number} - {cyclist.lastname} {cyclist.firstname}
              </div>
            ))}
        </div>
        <div className="informResult__DragableAndselection__selections">
          {selectionsArray()}
        </div>
      </div>
      {isError && (
        <div className="informResult__errorMessage">
          <ErrorMessage message={"Tu dois sélectionner 20 cyclistes"} />
        </div>
      )}
      <button
        onClick={handleSetResults}
        className="informResult__validatePronoBtn"
      >
        Valider les résultats
      </button>
    </div>
  );
};
export default InformResult;
