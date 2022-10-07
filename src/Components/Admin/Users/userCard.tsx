import React, { useState } from "react";
import app from "../../../config/firebaseConfig";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import { Checkbox } from "primereact/checkbox";

const UserCard = ({ user }) => {
  console.log(user);
  const db = getFirestore(app);
  const userRef = doc(db, "users", `${user.id}`);
  const onRoleChange = async (e: Checkbox) => {
    if (e.checked)
      await updateDoc(userRef, {
        roles: ["USER_ROLE", "ADMIN_ROLE"],
      });
    else
      await updateDoc(userRef, {
        roles: ["USER_ROLE"],
      });
  };

  //TODO faire les appels à Firebase pour mettre à jour le tableau des roles au click sur la checkbox
  return (
    <div>
      <p>Username : {user.username}</p>
      <p>Email :{user.email}</p>
      <div className="field-checkbox">
        <Checkbox
          inputId="admin"
          name="role"
          onChange={(e) => onRoleChange(e)}
          checked={user.roles.indexOf("ADMIN_ROLE") !== -1}
        />
        <label htmlFor="city2">Administrateur</label>
      </div>
    </div>
  );
};

export default UserCard;
