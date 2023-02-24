/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import app from "../../../config/firebaseConfig";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { Checkbox, CheckboxChangeParams } from "primereact/checkbox";

type UserType = {
  user: { authId: string; username: string; email: string; roles: string[] };
  setCheckAdmin: (prec: any) => void;
};
const User: React.FC<UserType> = ({ user, setCheckAdmin }) => {
  const db = getFirestore(app);
  const userRef = doc(db, "users", `${user.authId}`);

  const onRoleChange = async (e: CheckboxChangeParams) => {
    if (e.checked) {
      await updateDoc(userRef, {
        roles: ["USER_ROLE", "ADMIN_ROLE"],
      });
      setCheckAdmin((prec: any) => !prec);
    } else {
      await updateDoc(userRef, {
        roles: ["USER_ROLE"],
      });
      setCheckAdmin((prec: any) => !prec);
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
