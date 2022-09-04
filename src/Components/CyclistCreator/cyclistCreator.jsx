import React, { useEffect, useState } from "react";
import app from "../../config/firebaseConfig";
import { getDatabase, ref, set, get, child } from "firebase/database";

const CyclistCreator = () => {
  console.log(app);
  console.log(getDatabase(app));
  const db = getDatabase(app);
  const [cyclists, setCyclists] = useState({});
  console.log(cyclists);

  useEffect(() => {
    get(child(ref(db), "cyclists"))
      .then((snapshot) => {
        if (snapshot.exists()) setCyclists(snapshot.val());
        else console.log("No data available");
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <button
        data-testid="test-push"
        onClick={() =>
          set(ref(db, "cyclists"), {
            name: "Nelson",
            firstName: "Kradock",
            team: "Education First",
            nationality: "danish",
            number: 15,
          })
        }
      >
        Push
      </button>
      {cyclists && (
        <>
          <p>{cyclists.firstName}</p>
          <p>{cyclists.name}</p>
          <p>{cyclists.nationality}</p>
          <p>{cyclists.team}</p>
          <p>{cyclists.number}</p>
        </>
      )}
    </div>
  );
};
export default CyclistCreator;
