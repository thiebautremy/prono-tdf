/* eslint-disable @typescript-eslint/no-unsafe-return */
import { useState, useEffect } from "react";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import app from "../config/firebaseConfig";

const db = getFirestore(app);

export const useFetch = (tableName: string) => {
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!tableName) return;

    const fetchData = async () => {
      setStatus("fetching");
      const querySnapshot = await getDocs(collection(db, tableName));
      const response = querySnapshot;
      if (response) {
        response.forEach((doc) => {
          setData((prec: []) => [...prec, doc.data()]);
        });
        setStatus("fetched");
      }
    };
    void fetchData();
    return () => setData([]);
  }, [tableName]);

  return { status, data };
};
