import React, { useState, useEffect } from "react";
import app from "../../../../config/firebaseConfig";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import "../../../Pronos/Prono/prono.scss";
import ErrorMessage from "../../../Form/ErrorMessage/errorMessage";
import Dialogue from "../../../Dialogue/Dialogue";
import "./InformResult.scss";
import { FaTrashAlt } from "react-icons/fa";

interface Cyclist {
  number: string;
  lastname: string;
  firstname: string;
}
const InformResult = ({ cyclists, stageId }) => {
  const db = getFirestore(app);

  const [selectedCyclists, setSelectedCyclists] = useState({});
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
  const handleDragEnd = (e) => {
    e.preventDefault();
    console.log(e);
  };

  const handleDragStart = (e, cyclist) => {
    e.dataTransfer.setData("id", cyclist.number);
  };

  const handleOnDrop = (e, key) => {
    console.log("complete", e);
    const id = e.dataTransfer.getData("id");
    const cyclistDrag = cyclists.find((cyclist) => cyclist.number == id);
    const selectedCyclistsObj = { ...selectedCyclists };
    selectedCyclistsObj[key] = cyclistDrag;
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
              ${selectedCyclists[i].firstname}`}{" "}
              <FaTrashAlt />
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
          {cyclists
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
        onClick={handleSetProno}
        className="informResult__validatePronoBtn"
      >
        Valider les résultats
      </button>
    </div>
  );
};
export default InformResult;
