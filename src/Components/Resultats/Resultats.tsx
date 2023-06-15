/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect, useState } from "react";
import app from "../../config/firebaseConfig";
import {
  getFirestore,
  collection,
  getDocs,
  DocumentData,
} from "firebase/firestore";
import { UserConnectedInfo } from "../../Context/userContext";
import Resultat from "./Resultat";
import "./Resultats.scss";

const Resultats = () => {
  const [users, setUsers] = useState<DocumentData>([]);
  const db = getFirestore(app);

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
  return (
    <div className="resultats">
      <div className="resultats__fixture">
        <p>Classement</p>
      </div>
      <div className="resultats__scores">
        {users.length > 0 &&
          users.map((user: UserConnectedInfo) => (
            <Resultat key={user.authId} {...user} />
          ))}
      </div>
    </div>
  );
};

export default Resultats;
