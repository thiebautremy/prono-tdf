import React, { useContext, useEffect } from "react";
import { StagesContext } from "../../../Context/stagesContext";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from "../../../config/firebaseConfig";
import Stage from "./Stage/Stage";
import "./stages.scss";

const Stages = () => {
  const db = getFirestore(app);
  const { stages, setStages } = useContext(StagesContext);
  const fetchStages = async () => {
    const datas: [] = [];
    try {
      const querySnapshot = await getDocs(collection(db, "stages"));
      const response = querySnapshot;
      if (response) {
        response.forEach((doc) => {
          datas.push(doc.data());
          setStages(datas);
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    void fetchStages();
  }, []);
  return (
    <div className="stages">
      {stages.length > 0 &&
        stages.map((stage) => <Stage stage={stage} key={stage.stageId} />)}
    </div>
  );
};

export default Stages;
