import React, { useEffect, useState } from "react";
import app from "../../config/firebaseConfig";
import { getDatabase, ref, set, get, child } from "firebase/database";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// interface UserInterface {
//     email: string,
//     username: string
// }
const Admin = () => {
  const db = getFirestore(app);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    //load hospitals into hospitalsList
    const hospitals = [];
    db.collection("Hospitals")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((hospital) => {
          let currentID = hospital.id;
          let appObj = { ...hospital.data(), ["id"]: currentID };
          hospitals.push(appObj);

          hospitals.push(hospital.data());
        });
        setUsers(hospitals);
      });
  }, [db]);

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
