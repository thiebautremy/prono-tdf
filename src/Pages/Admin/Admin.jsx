/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useEffect, useState } from "react";
import app from "../../config/firebaseConfig";
import { getDatabase, ref, set, get, child } from "firebase/database";
import {
  getFirestore,
  collection,
  getDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

// interface UserInterface {
//     email: string,
//     username: string
// }
const Admin = () => {
  const db = getFirestore(app);
  const [users, setUsers] = useState([]);
  const concatTwoArrays = (arrayId, arrayData) => {
    let arrayFormated = [];
    for (let i = 0; i < arrayId.length; i++) {
      arrayFormated.push({ id: arrayId[i], ...arrayData[i] });
    }
    return arrayFormated;
  };
  const fetchOnline = async () => {
    let ids = [];
    let datas = [];
    const querySnapshot = await getDocs(collection(db, "users"));
    const response = await querySnapshot;
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
    <div className="admin">
      <h1>Admin</h1>
      {users.length > 0 &&
        users.map((user) => (
          <div key={user.id}>
            <p>Username : {user.username}</p>
            <p>Email :{user.email}</p>
          </div>
        ))}
      {/* {users.length > 0 &&
        users.map((user: UserInterface) => (
          <div key={user.email}>
            <p>{user.email}</p>
            <p>{user.username}</p>
          </div>
        ))} */}
    </div>
  );
};

export default Admin;
