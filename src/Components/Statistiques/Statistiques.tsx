/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useEffect, useState } from "react";
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
import { Dropdown } from "primereact/dropdown";

const Statistiques = () => {
  const [selectedYear, setSelectedYear] = useState({
    name: "Actuelle",
    code: "Actuelle",
  });
  const [dataChart, setDataChart] = useState({
    options: {},
    dataChartObject: null,
  });
  const [users, setUsers] = useState<DocumentData[]>();
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
          convertDatas(datas);
          setUsers(datas);
        } else {
          // Aucune donnée disponible
          console.error("no data retrieve");
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
    data:
      | DocumentData[]
      | {
          color: string;
          points: [];
          username: string;
          historic: { [key: string]: { points: Record<string, unknown> } };
        }[],
    year = "Actuelle"
  ) => {
    if (data.length > 0) {
      const newDatasets: {
        borderColor: string;
        backgroundColor: string;
        label: string;
        data: never[] | [];
      }[] = [];

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
        console.log(selectedYear);
        newDataset.data =
          year === "Actuelle"
            ? Object.values(user.points)
            : Object.values(user.historic[year].points);

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

  const years = [
    { name: "Actuelle", code: "Actuelle" },
    { name: "2023", code: "2023" },
  ];

  const handleSelectedYear = (event: {
    value: { code: string; name: string };
  }) => {
    setSelectedYear(event.value);
    convertDatas(users, event.value.code);
  };

  return (
    <div className="statistiques">
      <h1 className="statistiques__title">Statistiques</h1>
      <div className="statistiques__dropdown">
        <Dropdown
          value={selectedYear}
          onChange={(e) => handleSelectedYear(e)}
          options={years}
          optionLabel="name"
          placeholder="Sélectionner une année"
        />
      </div>
      {!!dataChart.dataChartObject && (
        <Line options={dataChart.options} data={dataChart.dataChartObject} />
      )}
    </div>
  );
};

export default Statistiques;
