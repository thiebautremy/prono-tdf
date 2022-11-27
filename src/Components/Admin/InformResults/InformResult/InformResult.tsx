import React, { useState, useEffect } from "react";
import app from "../../../../config/firebaseConfig";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import { MultiSelect, MultiSelectChangeParams } from "primereact/multiselect";
import "../../../Pronos/Prono/prono.scss";
import ErrorMessage from "../../../Form/ErrorMessage/errorMessage";
import Dialogue from "../../../Dialogue/Dialogue";
import "./InformResult.scss";
import Cyclist from "../../Cyclists/Cyclist/cyclist";

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
    console.log(e);
    e.dataTransfer.setData("id", cyclist.number);
    console.log(cyclist);
  };

  const handleOnDrop = (e, key) => {
    console.log("complete", e);
    const id = e.dataTransfer.getData("id");
    const cyclistDrag = cyclists.find((cyclist) => cyclist.number == id);
    const selectedCyclistsObj = { ...selectedCyclists };
    selectedCyclistsObj[key] = cyclistDrag;
    console.log(id);
    console.log(cyclistDrag);
    console.log(selectedCyclistsObj);
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
          {`Place n°: ${i}`}{" "}
          {selectedCyclists[i] !== undefined && (
            <>
              {`${selectedCyclists[i].number} - ${selectedCyclists[i].lastname}
              ${selectedCyclists[i].firstname}`}
            </>
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
        {/* <MultiSelect
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
        /> */}
        <div className="informResult__DragableAndselection__dragable">
          {cyclists.map((cyclist) => (
            <div
              key={cyclist.number}
              draggable
              onDragStart={(e) => handleDragStart(e, cyclist)}
              className="informResult__DragableAndselection__dragable--items"
            >
              {cyclist.number} - {cyclist.lasttname} {cyclist.firstname}
            </div>
          ))}
        </div>
        <div className="informResult__DragableAndselection__selections">
          {selectionsArray()}
        </div>
        {/* <div
          className="informResult__DragableAndselection__selection"
          onDragOver={(e) => handleDragEnd(e)}
          onDrop={(e) => handleOnDrop(e)}
        >
          {selectedCyclists.length > 0 && (
            <>
              <p
                className="informResult__DragableAndselection__selection__header"
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
                  key={cyclist.number}
                  className="informResult__DragableAndselection__selection__cyclist"
                >
                  {cyclist.number} - {cyclist.lastname} {cyclist.firstname}
                </p>
              ))}
            </>
          )}
        </div> */}
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
