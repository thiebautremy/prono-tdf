import React, { useState } from "react";
import { MultiSelect, MultiSelectChangeParams } from "primereact/multiselect";

const Prono = ({ cyclists }) => {
  const [selectedCyclists, setSelectedCyclists] = useState([]);

  const cyclistsTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.name}</div>
      </div>
    );
  };

  const selectedCyclistsTemplate = (option) => {
    if (option) {
      console.log(option);
      return (
        <div className="country-item country-item-value">
          <div>{option.name}</div>
        </div>
      );
    }

    return "Sélectionné vos cyclistes";
  };

  const panelFooterTemplate = () => {
    const selectedItems = selectedCyclists;
    const length = selectedItems ? selectedItems.length : 0;
    return (
      <div className="py-2 px-3">
        <b>{length}</b> cycliste{length > 1 && "s"} sélectionné
        {length > 1 && "s"}.
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

  const pronoToSend = {
    1: [1, 23, 44, 33, 55],
    2: [2, 45, 42, 43, 23],
  };
  return (
    <MultiSelect
      value={selectedCyclists}
      options={formatedCyclistsStagesForDropDown(cyclists)}
      onChange={(e: MultiSelectChangeParams) => setSelectedCyclists(e.value)}
      optionLabel="name"
      placeholder="Sélectionné vos cyclistes"
      filter
      className="multiselect-custom"
      itemTemplate={cyclistsTemplate}
      selectedItemTemplate={selectedCyclistsTemplate}
      panelFooterTemplate={panelFooterTemplate}
    />
  );
};

export default Prono;
