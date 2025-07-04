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
import { Toast, ToastSeverityType } from "primereact/toast";
import { SelectItemOptionsType } from "primereact/selectitem";
import { InputNumber } from "primereact/inputnumber";
import {
  getTotalPoints,
  convertPointsInArray,
} from "../../../Services/functions";

const Archive = () => {
  const db = getFirestore(app);
  const toast = useRef<Toast>(null);
  const [selectedYear, setSelectedYear] = useState("");
  const [userSelected, setUserSelected] = useState<{
    username: string;
    authId: string;
  }>({ username: "", authId: "" });
  const [performances, setPerformances] = useState({
    victoriesStages: null,
  });
  const [users, setUsers] = useState<DocumentData>([]);

  const years = [
    { label: "2024", value: 2024 },
    { label: "2025", value: 2025 },
    { label: "2026", value: 2026 },
    { label: "2027", value: 2027 },
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
        const convertedArray = convertPointsInArray(userDocumentDbData.points);
        const maxNumber =
          convertedArray.values.length > 0
            ? Math.max(...convertedArray.values)
            : 0;
        const minNumber =
          convertedArray.values.length > 0
            ? Math.min(...convertedArray.values)
            : 0;
        const archive = {
          historic: {
            ...userDocumentDbData?.historic,
            [selectedYear]: {
              ["points"]: userDocumentDbData.points,
              ["totalPoints"]: getTotalPoints(convertedArray.values),
              ["maxPoint"]: maxNumber,
              ["minPoint"]: minNumber,
              ["averagePoint"]: Math.round(
                getTotalPoints(convertedArray.values) / 21
              ),
            },
          },
        };

        updateDoc(userDocumentDbRef, archive)
          .then(() => {
            toastArchive("success", "Les points ont correctement été archivés");
          })
          .catch((error) => {
            console.error("Erreur lors de la mise à jour du document :", error);
            toastArchive("error", "Les points n'ont pas pu être archivés");
          });
      });
    }
  };

  const handleArchivePerf = async () => {
    const userDocumentDbRef = doc(db, "users", `${userSelected.authId}`);
    const userDocumentDbData = (await getDoc(userDocumentDbRef)).data();

    const archive = {
      historic: {
        [selectedYear]: {
          ...userDocumentDbData?.historic[selectedYear],
          ...performances,
        },
      },
    };

    updateDoc(userDocumentDbRef, archive)
      .then(() => {
        toastArchive(
          "success",
          "Les performances ont correctement été archivés"
        );
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour du document :", error);
        toastArchive("error", "Les points n'ont pas pu être archivés");
      });
  };

  const toastArchive = (type: ToastSeverityType, message: string) => {
    toast.current.show({
      severity: type,
      summary: type === "success" ? "Succès" : "Erreur",
      detail: message,
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
    if (Object.values(performances).every((property) => property !== null)) {
      setPerformances({
        victoriesStages: null,
      });
    }
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
          />
          {userSelected !== null && (
            <div className="archive__performances__inputsContainer">
              <span className="p-float-label">
                <InputNumber
                  value={performances.victoriesStages}
                  onChange={(e) => handleChangePerfInputs(e)}
                  name="victoriesStages"
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
                  {`Cliquer ici si vous souhaitez archiver le nombre de victoire pour l'année ${selectedYear} pour l'utilisateur ${userSelected.username}`}
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
