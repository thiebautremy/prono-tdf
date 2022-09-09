import React, { useEffect, useState } from "react";
import app from "../../config/firebaseConfig";
import { getDatabase, ref, set, get, child } from "firebase/database";
interface CyclistInterface {
  name:string,
  number: number,
  team: string,
  firstName: string,
  nationality: string
}
const CyclistCreator = () => {
  console.log(app);
  console.log(getDatabase(app));
  const db = getDatabase(app);
  const [cyclists, setCyclists] = useState([]);
  console.log(cyclists);

  useEffect(() => {
    get(child(ref(db), "/cyclists"))
      .then((snapshot) => {
        if (snapshot.exists()) setCyclists(snapshot.val());
        else console.log("No data available");
      })
      .catch((error) => console.log(error));
  }, [db]);
  return (
    <div>
      <button
        data-testid="test-push"
        onClick={() =>
          set(ref(db, "/cyclists/2"), {
            name: "Jean",
            firstName: "Claude",
            team: "FDJ",
            nationality: "french",
            number: 1,
          })
        }
      >
        Push
      </button>
      {cyclists.length > 0 &&
        cyclists.map((cyclist: CyclistInterface) => (
          <div key={cyclist.number}>
            <p>{cyclist.firstName}</p>
            <p>{cyclist.name}</p>
            <p>{cyclist.nationality}</p>
            <p>{cyclist.team}</p>
            <p>{cyclist.number}</p>
          </div>
        ))}
    </div>
  );
};
export default CyclistCreator;
