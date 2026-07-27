/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useState } from "react";
import { getTotalPoints, convertPointsInArray } from "../../Services/functions";
import "./Resultat.scss";
import { ProfilPicture } from "../NavBar/navBar";

export type StageRanks = Record<string, number>;

const TOTAL_STAGES = 21;

type ResultatType = {
  username: string;
  points: { [key: number]: number };
  pronos: any;
  position: number;
  color: string;
  previousTotalPoint: number;
  imageUrl: string;
  stageRanks: StageRanks;
};

const getStageModifier = (
  rank: number | undefined,
  hasPlayed: boolean,
): string => {
  if (!hasPlayed) return "empty";
  if (rank === 1) return "gold";
  if (rank === 2) return "silver";
  if (rank === 3) return "bronze";
  return "other";
};

const Resultat: React.FC<ResultatType> = ({
  username,
  points,
  pronos,
  position,
  color,
  previousTotalPoint,
  imageUrl,
  stageRanks,
}) => {
  const [modal, setModal] = useState({ isVisible: false, value: [] });

  const { keys, values } = convertPointsInArray(points);
  const total = getTotalPoints(values);
  const gap =
    previousTotalPoint !== undefined ? previousTotalPoint - total : null;

  const handleModal = (value: []) => {
    setModal({ isVisible: true, value });
  };

  // Dictionnaire étape → points pour accès rapide
  const stageData: Record<string, number> = {};
  keys.forEach((key, index) => {
    stageData[String(key)] = values[index];
  });

  const positionLabel = position === 1 ? "er" : "ième";
  const rankModifier =
    position === 1
      ? "gold"
      : position === 2
        ? "silver"
        : position === 3
          ? "bronze"
          : "default";

  return (
    <div className="resultat">
      {points === undefined && (
        <p className="resultat__empty">Pas de points attribués</p>
      )}

      {modal.isVisible && <Modal modal={modal} setModal={setModal} />}

      <div className="resultat__card">
        {/* Rang général */}
        <div
          className={`resultat__card__rank resultat__card__rank--${rankModifier}`}
        >
          {position}
          <sup>{positionLabel}</sup>
        </div>

        {/* Avatar */}
        <div
          className="resultat__card__avatar"
          style={{ backgroundColor: `rgba(${color}, 0.1)` }}
        >
          <ProfilPicture imageUrl={imageUrl} />
        </div>

        {/* Nom + total + écart */}
        <div className="resultat__card__meta">
          <span className="resultat__card__meta__name">{username}</span>
          <span className="resultat__card__meta__total">
            Total : <strong>{total} pts</strong>
          </span>
          <span
            className={`resultat__card__meta__gap${gap !== null && gap > 0 ? " resultat__card__meta__gap--positive" : ""}`}
          >
            {gap === null ? "—" : `+ ${gap} pts`}
          </span>
        </div>

        {/* 21 étapes */}
        <div className="resultat__card__stages">
          {Array.from({ length: TOTAL_STAGES }, (_, i) => i + 1).map(
            (stageNum) => {
              const stageKey = String(stageNum);
              const hasPlayed = stageKey in stageData;
              const pts = hasPlayed ? stageData[stageKey] : null;
              const modifier = getStageModifier(
                stageRanks[stageKey],
                hasPlayed,
              );

              return (
                <div key={stageNum} className="resultat__card__stage">
                  <span className="resultat__card__stage__num">{stageNum}</span>
                  <div
                    className={`resultat__card__stage__pts resultat__card__stage__pts--${modifier}`}
                    onClick={() => hasPlayed && handleModal(pronos[stageNum])}
                  >
                    {pts !== null ? pts : "—"}
                  </div>
                </div>
              );
            },
          )}
        </div>
      </div>
    </div>
  );
};

const Modal = (modal: any) => {
  return (
    <div className="modal">
      {modal.modal.value.map((item: any) => (
        <span className="modal__cyclist" key={item.name}>
          {item.name}
        </span>
      ))}
      <span
        className="cross"
        onClick={() =>
          modal.setModal({ isVisible: false, value: modal.values })
        }
      >
        X
      </span>
    </div>
  );
};

export default Resultat;
