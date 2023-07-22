/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useEffect, useState } from "react";
import "./CyclistsList.scss";
import app from "../../config/firebaseConfig";
import {
  getFirestore,
  collection,
  getDocs,
  DocumentData,
} from "firebase/firestore";
import Loader from "../Loader/Loader";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";

const CyclistsList = () => {
  const [isLoader, setIsLoader] = useState(true);
  const [cyclistsList, setCyclistsList] = useState<
    DocumentData[] | { color: string; points: []; username: string }[]
  >(null);

  const [filters, setFilters] = useState<DataTableFilterMeta>({
    firstname: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    lastname: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    nationality: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    number: { value: null, matchMode: FilterMatchMode.EQUALS },
    team: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  });

  const db = getFirestore(app);
  useEffect(() => {
    const datas: DocumentData[] = [];

    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "cyclists"));
        const response = querySnapshot;

        if (!response.empty) {
          response.forEach((doc) => {
            datas.push(doc.data());
          });
          setCyclistsList(datas);
          setIsLoader(false);
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

  return (
    <div className="cyclistsList">
      {isLoader && <Loader />}
      {cyclistsList && (
        <DataTable
          value={cyclistsList.sort(
            (a, b) => Number(a.number) - Number(b.number)
          )}
          paginator
          rows={100}
          dataKey="id"
          filterDisplay="row"
          filters={filters}
          responsiveLayout="scroll"
          className="p-datatable-responsive-demo"
        >
          <Column
            field="number"
            header="Dossard"
            filter
            filterPlaceholder="Recherche par dossard"
            style={{ minWidth: "10rem" }}
          />
          <Column
            field="lastname"
            header="Nom"
            filter
            filterPlaceholder="Recherche par nom"
            style={{ minWidth: "12rem" }}
          />
          <Column
            field="firstname"
            header="Prénom"
            filter
            filterPlaceholder="Recherche par prénom"
            style={{ minWidth: "12rem" }}
          />
          <Column
            field="team"
            header="Equipe"
            filter
            filterPlaceholder="Recherche par équipe"
            style={{ minWidth: "12rem" }}
          />
          <Column
            field="nationality"
            header="Nationalité"
            filter
            filterPlaceholder="Recherche par nationalité"
            style={{ minWidth: "10rem" }}
          />
        </DataTable>
      )}
    </div>
  );
};

export default CyclistsList;
