import React, { useState } from "react";
import { Checkbox } from "primereact/checkbox";

const UserCard = ({ user }) => {
  const [cities, setCities] = useState([]);
  const [roles, setRoles] = useState(user.roles);
  console.log(user);
  const onRoleChange = (e: Checkbox) => {
    console.log(e);
    let selectedRoles = [...roles];
    if (e.checked) selectedRoles.push(e.value);
    else selectedRoles.splice(selectedRoles.indexOf(e.value), 1);
    setCities(selectedRoles);
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
