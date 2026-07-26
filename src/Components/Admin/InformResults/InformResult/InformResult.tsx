/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState, useEffect } from "react";
import app from "../../../../config/firebaseConfig";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import ErrorMessage from "../../../Form/ErrorMessage/errorMessage";
import { Dropdown } from "primereact/dropdown";
import Dialogue from "../../../Dialogue/Dialogue";
import "./InformResult.scss";

type Cyclist = {
  number: string | number;
  lastname: string;
  firstname: string;
  nationality: string;
  team: string;
};

type InformResultType = {
  cyclists: Cyclist[];
  stageId: number;
  currentResults: { [key: string]: Cyclist };
};

const POSITIONS = Array.from({ length: 20 }, (_, i) => i + 1);

const InformResult: React.FC<InformResultType> = ({
  cyclists,
  stageId,
  currentResults,
}) => {
  const db = getFirestore(app);

  // { "1": Cyclist | null, "2": Cyclist | null, ... }
  const [selectedCyclists, setSelectedCyclists] = useState<{
    [position: string]: Cyclist | null;
  }>({});
  const [isError, setIsError] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);

  const sortedCyclists = [...cyclists].sort(
    (a, b) => Number(a.number) - Number(b.number),
  );

  // Initialise depuis currentResults quand l'étape change
  useEffect(() => {
    if (currentResults && Object.keys(currentResults).length > 0) {
      setSelectedCyclists(
        Object.fromEntries(
          Object.entries(currentResults).map(([pos, cyclist]) => [
            pos,
            cyclist,
          ]),
        ),
      );
    } else {
      setSelectedCyclists({});
    }
  }, [stageId]);

  // Retourne la liste filtrée : exclut les cyclistes déjà sélectionnés ailleurs
  const getAvailableCyclists = (currentPosition: number): Cyclist[] => {
    const selectedElsewhere = new Set(
      Object.entries(selectedCyclists)
        .filter(([pos]) => Number(pos) !== currentPosition)
        .map(([, cyclist]) => cyclist?.number)
        .filter(Boolean),
    );
    return sortedCyclists.filter((c) => !selectedElsewhere.has(c.number));
  };

  const handleSelect = (position: number, cyclist: Cyclist | null) => {
    setSelectedCyclists((prev) => ({
      ...prev,
      [String(position)]: cyclist,
    }));
    setIsError(false);
  };

  const handleSetResults = async () => {
    const filledPositions = Object.values(selectedCyclists).filter(Boolean);
    if (filledPositions.length < 20) {
      setIsError(true);
      return;
    }

    // Construit { "1": Cyclist, "2": Cyclist, ... } pour Firebase
    const resultsMap = Object.fromEntries(
      Object.entries(selectedCyclists)
        .filter(([, cyclist]) => cyclist !== null)
        .map(([pos, cyclist]) => [pos, cyclist]),
    );

    await setDoc(doc(db, "results", stageId.toString()), resultsMap);
    setVisibleModal(true);
    setIsError(false);
  };

  const cyclistTemplate = (option: Cyclist) => (
    <div className="cyclist-option">
      <span className="cyclist-option__number">{option.number} </span>
      <span className="cyclist-option__name">
        - {option.firstname} {option.lastname}
      </span>
    </div>
  );

  const selectedCyclistTemplate = (option: Cyclist | null) => {
    if (!option) return <span>Sélectionner</span>;
    return (
      <div className="cyclist-option">
        <span className="cyclist-option__number">{option.number} </span>
        <span className="cyclist-option__name">
          - {option.firstname} {option.lastname}
        </span>
      </div>
    );
  };

  return (
    <div className="informResult">
      <Dialogue
        isVisible={visibleModal}
        setIsVisible={setVisibleModal}
        message="Résultats mis à jour."
      />

      <div className="informResult__positions">
        {POSITIONS.map((position) => (
          <div key={position} className="informResult__position">
            <span className="informResult__position__label">
              {position}
              <sup>{position === 1 ? "er" : "ième"}</sup>
            </span>
            <Dropdown
              value={selectedCyclists[String(position)] ?? null}
              onChange={(e) => handleSelect(position, e.value)}
              options={getAvailableCyclists(position)}
              optionLabel="lastname"
              placeholder="Sélectionner"
              filter
              valueTemplate={selectedCyclistTemplate}
              filterBy="number,lastname,firstname"
              itemTemplate={cyclistTemplate}
              className="informResult__position__dropdown"
              showClear
            />
          </div>
        ))}
      </div>

      {isError && (
        <div className="informResult__errorMessage">
          <ErrorMessage message="Tu dois sélectionner 20 cyclistes" />
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
