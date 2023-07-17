/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useEffect, useContext, useState } from "react";
import "./Statistiques.scss";
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
import { Line } from "react-chartjs-2";
import UsersContext from "../../Context/usersContext";
import { DocumentData } from "firebase/firestore";

const Statistiques = () => {
  const { usersData } = useContext(UsersContext);
  const [dataChart, setDataChart] = useState({
    options: {},
    dataChartObject: null,
  });

  useEffect(() => {
    convertDatas(usersData);
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
    console.log(data);
    if (data.length > 0) {
      const options = {
        responsive: true,
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
        console.log(newDataset);
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
