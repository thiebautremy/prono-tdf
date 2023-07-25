/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect, useContext, useState, useRef } from "react";
import Cyclist from "./Cyclist/cyclist";
import { CyclistsContext } from "../../../Context/cyclistsContext";
import app from "../../../config/firebaseConfig";
import {
  getFirestore,
  collection,
  getDocs,
  DocumentData,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import AddCyclistForm from "./AddCyclistForm/addCyclistForm";
import "./cyclists.scss";
import Dialog from "../../Dialog/Dialog";
import { Toast } from "primereact/toast";

const Cyclists = () => {
  const toast = useRef<Toast>(null);
  const [isConfirmDialog, setIsConfirmDialog] = useState(false);
  const [message, setMessage] = useState({
    number: "",
    firstname: "",
    lastname: "",
  });
  const db = getFirestore(app);

  const { cyclists, setCyclists } = useContext(CyclistsContext);
  const fetchCyclists = async () => {
    const datas: DocumentData = [];
    try {
      const querySnapshot = await getDocs(collection(db, "cyclists"));
      const response = querySnapshot;
      if (response) {
        response.forEach((doc) => {
          datas.push(doc.data());
          setCyclists(datas);
        });
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchCyclists();
  }, []);

  const handleDeleteCyclist = () => {
    if (message.firstname !== "") {
      const queryRef = query(
        collection(db, "cyclists"),
        where("firstname", "==", message.firstname),
        where("lastname", "==", message.lastname),
        where("number", "==", message.number)
      );
      getDocs(queryRef)
        .then((querySnapshot) => {
          querySnapshot.forEach((docRetrieve) => {
            const documentId: string = docRetrieve.id;
            const documentRef = doc(collection(db, "cyclists"), documentId);
            deleteDoc(documentRef)
              .then(() => {
                setMessage({ firstname: "", lastname: "", number: "" });
                fetchCyclists();
                setIsConfirmDialog(false);
                succeedDelete();
              })
              .catch((error) => {
                console.error(
                  "Erreur lors de la suppression du document :",
                  error
                );
              });
          });
        })
        .catch((error) => {
          errorDelete();
          console.error(error);
        });
    }
  };

  const succeedDelete = () => {
    toast.current.show({
      severity: "success",
      summary: "Succès",
      detail: "Le cycliste a été correctement supprimé",
      life: 3000,
    });
  };

  const errorDelete = () => {
    toast.current.show({
      severity: "error",
      summary: "Erreur",
      detail: "Erreur lors de la suppression",
      life: 3000,
    });
  };
  return (
    <div className="cyclists">
      <Toast ref={toast} />
      {isConfirmDialog && (
        <Dialog
          title={"Êtes-vous sur de vouloir supprimer ce cycliste ?"}
          message={<Message {...message} />}
          handleNo={() => setIsConfirmDialog(false)}
          handleYes={() => handleDeleteCyclist()}
        />
      )}
      <AddCyclistForm fetchCyclists={fetchCyclists} />
      <div className="cyclists__container">
        <h1 className="cyclists__container__title">
          Liste des cyclistes participants :
        </h1>
        {cyclists.length > 0 &&
          cyclists
            .sort((a, b) => Number(a.number) - Number(b.number))
            .map((cyclist) => (
              <Cyclist
                key={cyclist.number}
                {...cyclist}
                setIsConfirmDialog={setIsConfirmDialog}
                setMessage={setMessage}
              />
            ))}
      </div>
    </div>
  );
};

type MessageType = {
  number: string;
  firstname: string;
  lastname: string;
};

const Message = ({ number, firstname, lastname }: MessageType) => {
  return <p className="message">{`${number} - ${firstname} ${lastname}`}</p>;
};

export default Cyclists;
