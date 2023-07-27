/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { useEffect, useState, useRef } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  updateDoc,
  doc,
  DocumentData,
} from "firebase/firestore";
import app from "../../../config/firebaseConfig";
import "./Archive.scss";
import { Dropdown, DropdownChangeParams } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { SelectItemOptionsType } from "primereact/selectitem";
import { InputNumber } from "primereact/inputnumber";

const Archive = () => {
  const db = getFirestore(app);
  const toast = useRef<Toast>(null);
  const [selectedYear, setSelectedYear] = useState("");
  const [userSelected, setUserSelected] = useState<{
    username: string;
    authId: string;
  }>(null);
  const [performances, setPerformances] = useState({
    maxPoint: null,
    minPoint: null,
    averagePoint: null,
    victoriesStages: null,
  });
  const [users, setUsers] = useState<DocumentData>([]);

  const years = [
    { label: "2023", value: 2023 },
    { label: "2024", value: 2024 },
    { label: "2025", value: 2025 },
    { label: "2026", value: 2026 },
  ];

  const fetchUsers = async () => {
    const datas: DocumentData = [];
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const response = querySnapshot;
      if (response) {
        response.forEach((doc) => {
          datas.push(doc.data());
          setUsers(datas);
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const onYearChange = (event: DropdownChangeParams) => {
    setSelectedYear(event.value);
  };

  const handleArchive = () => {
    if (users.length > 0) {
      users.map(async (user: { authId: string }) => {
        const userDocumentDbRef = doc(db, "users", `${user.authId}`);
        const userDocumentDbData = (await getDoc(userDocumentDbRef)).data();

        const archive = {
          historic: {
            ...userDocumentDbData?.historic,
            [selectedYear]: { ["points"]: userDocumentDbData.points },
          },
        };

        updateDoc(userDocumentDbRef, archive)
          .then(() => {
            succeedArchive();
          })
          .catch((error) => {
            console.error("Erreur lors de la mise à jour du document :", error);
            errorArchive();
          });
      });
    }
  };

  const handleArchivePerf = async () => {
    const userDocumentDbRef = doc(db, "users", `${userSelected.authId}`);
    const userDocumentDbData = (await getDoc(userDocumentDbRef)).data();

    const archive = {
      historic: {
        ...userDocumentDbData?.historic,
        [selectedYear]: {
          ["points"]: userDocumentDbData.points,
          ...performances,
        },
      },
    };

    updateDoc(userDocumentDbRef, archive)
      .then(() => {
        succeedArchivePerf();
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour du document :", error);
        errorArchive();
      });
  };

  const succeedArchive = () => {
    toast.current.show({
      severity: "success",
      summary: "Succès",
      detail: "Les points ont correctement été archivés",
      life: 3000,
    });
  };

  const succeedArchivePerf = () => {
    toast.current.show({
      severity: "success",
      summary: "Succès",
      detail: "Les performances ont correctement été archivés",
      life: 3000,
    });
  };

  const errorArchive = () => {
    toast.current.show({
      severity: "error",
      summary: "Erreur",
      detail: "Les points n'ont pas pu être archivés",
      life: 3000,
    });
  };

  const optionsUsers: SelectItemOptionsType = users.map(
    (user: { username: string; authId: string }) => ({
      value: user.username,
      label: user.username,
    })
  );

  const handleChangePerfUser = (value: string) => {
    setUserSelected(
      users.find((user: { username: string }) => user.username === value)
    );
  };

  const handleChangePerfInputs = (event: {
    value: number;
    originalEvent: React.SyntheticEvent;
  }) => {
    const name = (event.originalEvent.target as HTMLInputElement).name;
    setPerformances((prev) => {
      const newPerf = {
        ...prev,
        [name]: event.value,
      };
      return newPerf;
    });
  };

  return (
    <div className="archive">
      <Toast ref={toast} />
      <div className="archive__points">
        <h1 className="archive__title">
          Archiver les points et performances des utilisateurs en fonction des
          années.
        </h1>
        <Dropdown
          value={selectedYear}
          options={years}
          onChange={(e) => onYearChange(e)}
          placeholder="Sélectionner une année"
          optionLabel="label"
          showClear
          className="archive__inputYear"
        />
        {!!selectedYear && (
          <button
            onClick={() => handleArchive()}
            className="archive__btnPoints"
          >
            {`Cliquer ici si vous souhaitez archiver les points pour l'année ${selectedYear}`}
          </button>
        )}
      </div>
      {!!selectedYear && (
        <div className="archive__performances">
          <h2 className="archive__performances__title">
            Rentrez les performances individuelles de chaque utilisateur
          </h2>
          <Dropdown
            value={userSelected.username}
            options={optionsUsers}
            optionLabel="label"
            onChange={(e) => handleChangePerfUser(e.value)}
            placeholder="Sélectionner un utilisateur"
            showClear
          />
          {userSelected !== null && (
            <div className="archive__performances__inputsContainer">
              <InputNumber
                value={performances.maxPoint}
                onChange={(e) => handleChangePerfInputs(e)}
                name="maxPoint"
                placeholder="Points maximum"
              />
              <InputNumber
                value={performances.minPoint}
                onChange={(e) => handleChangePerfInputs(e)}
                name="minPoint"
                placeholder="Points minimum"
              />
              <InputNumber
                value={performances.averagePoint}
                onChange={(e) => handleChangePerfInputs(e)}
                name="averagePoint"
                placeholder="Moyenne de point"
              />
              <span className="p-float-label">
                <InputNumber
                  value={performances.victoriesStages}
                  onChange={(e) => handleChangePerfInputs(e)}
                  name="victoriesStages"
                  placeholder="Nombre de victoire d'étape"
                  id="number-victoriesStages"
                />
                <label htmlFor="number-victoriesStages">
                  Nombre de victoire d'étape
                </label>
              </span>
              {Object.values(performances).every(
                (property) => property !== null
              ) && (
                <button
                  onClick={() => handleArchivePerf()}
                  className="archive__btnPoints"
                >
                  {`Cliquer ici si vous souhaitez archiver les performance pour l'année ${selectedYear} pour l'utilisateur ${userSelected.username}`}
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Archive;
