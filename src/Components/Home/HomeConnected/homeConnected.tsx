import React, { useEffect, useContext } from "react";
import { UserContext } from "../../../Context/userContext";
import app from "../../../config/firebaseConfig";
import NavBar from "../../NavBar/navBar";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const HomeConnected: React.FC = () => {
  const { currentUser, setUserConnectedInfo, userConnectedInfo } =
    useContext(UserContext);
  const db = getFirestore(app);
  useEffect(() => {
    saveUserConnectedInfo();
  }, []);
  const saveUserConnectedInfo = async () => {
    const userDocumentDbRef = await getDoc(doc(db, "users", currentUser.uid));
    setUserConnectedInfo(userDocumentDbRef.data());
  };
  return <>{<NavBar />}</>;
};

export default HomeConnected;
