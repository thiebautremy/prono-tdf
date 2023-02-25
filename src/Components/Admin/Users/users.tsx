/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useState, useEffect } from "react";
import "./user.scss";
import app from "../../../config/firebaseConfig";
import {
  getFirestore,
  collection,
  getDocs,
  DocumentData,
} from "firebase/firestore";
import User from "./user";

const Users = () => {
  const [users, setUsers] = useState<DocumentData>([]);
  const [checkedAdmin, setCheckAdmin] = useState(true);
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
  }, [checkedAdmin]);
  return (
    <div className="users">
      {users.length > 0 ? (
        users.map(
          (user: {
            authId: string;
            username: string;
            email: string;
            roles: string[];
          }) => (
            <User key={user.authId} user={user} setCheckAdmin={setCheckAdmin} />
          )
        )
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
};

export default Users;
