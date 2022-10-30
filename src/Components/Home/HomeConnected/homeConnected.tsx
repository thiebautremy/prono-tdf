import React, { useEffect, useContext, PropsWithChildren } from "react";
import { UserContext } from "../../../Context/userContext";
import app from "../../../config/firebaseConfig";
import NavBar from "../../NavBar/navBar";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const HomeConnected: React.FC<PropsWithChildren> = ({ children }) => {
  const { currentUser, setUserConnectedInfo } = useContext(UserContext);
  const db = getFirestore(app);
  useEffect(() => {
    saveUserConnectedInfo();
  }, []);
  const saveUserConnectedInfo = async () => {
    const userDocumentDbRef = await getDoc(doc(db, "users", currentUser.uid));
    setUserConnectedInfo(userDocumentDbRef.data());
  };
  return (
    <>
      {<NavBar />} {children}
    </>
  );
};

export default HomeConnected;
