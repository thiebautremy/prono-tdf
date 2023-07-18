/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useEffect, useContext, useState } from "react";
import "./Statistiques.scss";
import app from "../../config/firebaseConfig";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  getFirestore,
  collection,
  getDocs,
  DocumentData,
} from "firebase/firestore";
import { Line } from "react-chartjs-2";

const Statistiques = () => {
  const [usersDataTest, setUsersDataTest] = useState<
    DocumentData[] | { color: string; points: []; username: string }[]
  >(null);
  const [dataChart, setDataChart] = useState({
    options: {},
    dataChartObject: null,
  });
  const db = getFirestore(app);
  useEffect(() => {
    const datas: DocumentData[] = [];

    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const response = querySnapshot;

        if (!response.empty) {
          response.forEach((doc) => {
            datas.push(doc.data());
          });
          setUsersDataTest(datas);
          convertDatas(datas);
        } else {
          // Aucune donnée disponible
          console.log("no data retrieve");
        }
      } catch (error) {
        // Gère les erreurs de requête
        console.error("Erreur lors de la récupération des données:", error);
      }
    };

    fetchData();
  }, []);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const convertDatas = (
    data: DocumentData[] | { color: string; points: []; username: string }[]
  ) => {
    if (data.length > 0) {
      const options = {
        responsive: true,
        scales: {
          y: {
            max: 115,
          },
        },
        plugins: {
          legend: {
            position: "top" as const,
          },
          title: {
            display: true,
            text: "Points en fonction des étapes",
          },
        },
      };

      const newDatasets: {
        borderColor: string;
        backgroundColor: string;
        label: string;
        data: never[] | [];
      }[] = [];

      data.map((user) => {
        const newDataset: {
          borderColor: string;
          backgroundColor: string;
          label: string;
          data: never[] | [];
        } = {
          label: "",
          data: [],
          borderColor: "",
          backgroundColor: "",
        };

        newDataset.label = user.username;
        newDataset.data = Object.values(user.points);
        newDataset.borderColor = `rgb(${user.color})`;
        newDataset.backgroundColor = `rgba(${user.color}, 0.5)`;
        newDatasets.push(newDataset);
      });

      const dataChartObject = {
        labels: Object.keys(data[0].points),
        datasets: newDatasets,
      };
      setDataChart({ options, dataChartObject });
    }
  };

  return (
    <div className="statistiques">
      <h1 className="statistiques__title">Statistiques</h1>
      {!!dataChart.dataChartObject && (
        <Line options={dataChart.options} data={dataChart.dataChartObject} />
      )}
    </div>
  );
};

export default Statistiques;
