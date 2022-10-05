import React, { useState, useEffect } from "react";
import app from "../../config/firebaseConfig";
import {
  getFirestore,
  collection,
  getDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const Users = () => {
  const [users, setUsers] = useState([]);
  const db = getFirestore(app);
  const concatTwoArrays = (
    arrayId: [string],
    arrayData: [Record<string, unknown>]
  ): [] => {
    const arrayFormated = [];
    for (let i = 0; i < arrayId.length; i++) {
      arrayFormated.push({ id: arrayId[i], ...arrayData[i] });
    }
    return arrayFormated;
  };
  const fetchOnline = async () => {
    const ids: [string | number] = [];
    const datas: [] = [];
    const querySnapshot = await getDocs(collection(db, "users"));
    const response = querySnapshot;
    console.log(response);
    response.forEach((doc) => {
      ids.push(doc.id);
      datas.push(doc.data());
      setUsers(concatTwoArrays(ids, datas));
    });
  };
  useEffect(() => {
    fetchOnline();
  }, []);
  return (
    <>
      <h1>Utilisateurs</h1>
      {users.length > 0 &&
        users.map((user: { id: string; username: string; email: string }) => (
          <div key={user.id}>
            <p>Username : {user.username}</p>
            <p>Email :{user.email}</p>
          </div>
        ))}
    </>
  );
};

export default Users;
