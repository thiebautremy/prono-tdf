/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import UserContext from "../../Context/userContext";
import "./Profil.scss";
import {
  getFirestore,
  updateDoc,
  collection,
  getDoc,
  DocumentData,
  doc,
  DocumentReference,
} from "firebase/firestore";
import app from "../../config/firebaseConfig";
import { InputText } from "primereact/inputtext";
import { Toast, ToastSeverityType } from "primereact/toast";

type UserProfilType = {
  imageUrl: string;
  catchPhrase: string;
};

const Profil = () => {
  const toast = useRef<Toast>(null);
  const { userConnectedInfo, setUserConnectedInfo } = useContext(UserContext);
  const [newUserProfil, setNewUserProfil] = useState<UserProfilType>({
    imageUrl: "",
    catchPhrase: "",
  });
  const [userRef, setUserRef] = useState<DocumentReference<DocumentData>>();
  const db = getFirestore(app);

  useEffect(() => {
    {
      userConnectedInfo !== undefined &&
        setNewUserProfil((prev) => {
          const newProfil = {
            ...prev,
            imageUrl: userConnectedInfo.imageUrl,
            catchPhrase: userConnectedInfo.catchPhrase,
          };
          return newProfil;
        });
    }
    if (userConnectedInfo) {
      const userRef = doc(db, "users", `${userConnectedInfo.authId}`);
      setUserRef(userRef);
    }
  }, [userConnectedInfo]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = (event.target as HTMLInputElement).name;
    setNewUserProfil((prev) => {
      const newProfil = {
        ...prev,
        [name]: event.target.value,
      };
      return newProfil;
    });
  };

  const handleUpdateProfil = () => {
    updateDoc(userRef, {
      ...newUserProfil,
    })
      .then(() => {
        saveUserConnectedInfo();
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour du profil :", error);
        toastProfil("error", "Le profil n'a pas été mis à jour");
      });
  };

  const saveUserConnectedInfo = async () => {
    const userDocumentDbRef = await getDoc(
      doc(db, "users", userConnectedInfo.authId)
    );
    if (userDocumentDbRef.exists()) {
      toastProfil("success", "Profil mis à jour");
      setUserConnectedInfo(userDocumentDbRef.data());
    } else {
      console.error("error");
    }
  };

  const toastProfil = (type: ToastSeverityType, message: string) => {
    toast.current.show({
      severity: type,
      summary: type === "success" ? "Succès" : "Erreur",
      detail: message,
      life: 3000,
    });
  };

  return (
    <div className="profil">
      <Toast ref={toast} />
      {userConnectedInfo && (
        <>
          <h1 className="profil__username">{`Bonjour ${userConnectedInfo.username}`}</h1>
          <span className="p-float-label">
            <InputText
              value={newUserProfil.catchPhrase}
              onChange={(e) => handleChange(e)}
              name="catchPhrase"
              id="profil-catchPhrase"
            />
            <label htmlFor="profil-catchPhrase">Phrase d'accroche</label>
          </span>
          <span className="p-float-label">
            <InputText
              value={newUserProfil.imageUrl}
              onChange={(e) => handleChange(e)}
              name="imageUrl"
              id="profil-imageUrl"
            />
            <label htmlFor="profil-imageUrl">Adresse image profil</label>
          </span>
          <button
            onClick={() => handleUpdateProfil()}
            className="profil__btnUpdate"
          >
            Mettre à jour les informations
          </button>
        </>
      )}
    </div>
  );
};

export default Profil;
