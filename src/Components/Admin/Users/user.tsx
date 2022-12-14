import React from "react";
import app from "../../../config/firebaseConfig";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { Checkbox } from "primereact/checkbox";

const User = ({ user, setCheckAdmin }) => {
  const db = getFirestore(app);
  const userRef = doc(db, "users", `${user.authId}`);
  const onRoleChange = async (e: Checkbox) => {
    if (e.checked) {
      await updateDoc(userRef, {
        roles: ["USER_ROLE", "ADMIN_ROLE"],
      });
      setCheckAdmin((prec) => !prec);
    } else {
      await updateDoc(userRef, {
        roles: ["USER_ROLE"],
      });
      setCheckAdmin((prec) => !prec);
    }
  };
  return (
    <div className="user">
      <p className="user__name">
        <strong>Username :</strong> {user.username}
      </p>
      <p className="user__email">
        <strong>Email :</strong> {user.email}
      </p>
      <div className="user__checkbox">
        <label htmlFor="city2">
          <strong>Administrateur</strong>
        </label>
        <Checkbox
          inputId="admin"
          name="role"
          onChange={(e) => onRoleChange(e)}
          checked={user.roles.some((role) => role == "ADMIN_ROLE")}
        />
      </div>
    </div>
  );
};

export default User;
