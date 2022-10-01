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

  const fetchOnline = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const response = await querySnapshot;
    response.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      setUsers(...users, doc.data());
    });
  };
  useEffect(() => {
    fetchOnline();
  }, []);
  return (
    <div className="admin">
      <h1>Admin</h1>
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
