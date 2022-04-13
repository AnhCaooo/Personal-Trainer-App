import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { format } from "date-fns";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

function Trainings() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then((response) => response.json())
      .then((responseData) => setTrainings(responseData))
      .then((err) => console.error(err));
  };

  const [columnDefs] = useState([
    { field: "activity", sortable: true, filter: true },
    {
      field: "date",
      sortable: true,
      filter: true,
      valueFormatter: (params) =>
        format(new Date(params.value), "dd.MM.yyyy HH:mm aaa"),
    },
    { field: "duration", sortable: true, filter: true },
    {
      headerName: "Customer",
      valueGetter(params) {
        return (
          params.data.customer.firstname + " " + params.data.customer.lastname
        );
      },
      sortable: true,
      filter: true,
    },
  ]);

  return (
    <>
      <div className="ag-theme-material" style={{ height: 700, width: "70%" }}>
        <AgGridReact
          rowData={trainings}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
        ></AgGridReact>
      </div>
    </>
  );
}

export default Trainings;
