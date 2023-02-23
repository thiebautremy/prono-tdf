import { useState, useEffect } from "react";
import {
  updateDoc,
  doc,
  getFirestore,
  getDocs,
  collection,
} from "firebase/firestore";
import app from "../config/firebaseConfig";

const db = getFirestore(app);

export const updateFirebaseDoc = async (
  tableName: string,
  id: string,
  data: Record<string, unknown>
) => {
  const ref = doc(db, tableName, id);
  return updateDoc(ref, {
    data,
  })
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};

export const fetchFirebaseData = async (tableName: string) => {
  const datas: [] = [];
  try {
    const querySnapshot = await getDocs(collection(db, tableName));
    const response = querySnapshot;
    if (response) {
      response.forEach((doc) => {
        datas.push(doc.data());
        return datas;
      });
    }
  } catch (err) {
    console.log(err);
  }
};

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
          setData((prec) => [...prec, doc.data()]);
        });
        setStatus("fetched");
      }
    };
    fetchData();
    return () => setData([]);
  }, [tableName]);

  return { status, data };
};
