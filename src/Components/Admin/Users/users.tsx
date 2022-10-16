import React, { useState, useEffect } from "react";
import "./user.scss";
import app from "../../../config/firebaseConfig";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import User from "./user";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [checkedAdmin, setCheckAdmin] = useState(true);
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
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const response = querySnapshot;
      if (response) {
        response.forEach((doc) => {
          ids.push(doc.id);
          datas.push(doc.data());
          setUsers(concatTwoArrays(ids, datas));
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchOnline();
  }, [checkedAdmin]);
  return (
    <div className="users">
      {users.length > 0 ? (
        users.map((user: { id: string; username: string; email: string }) => (
          <User key={user.id} user={user} setCheckAdmin={setCheckAdmin} />
        ))
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
};

export default Users;
