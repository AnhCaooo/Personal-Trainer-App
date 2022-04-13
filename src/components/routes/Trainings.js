import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

function Trainings() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetchTrainings();
  });

  const fetchTrainings = () => {
    fetch("https://customerrest.herokuapp.com/api/trainings")
      .then((response) => response.json())
      .then((responseData) => setTrainings(responseData.content))
      .then((err) => console.error(err));
  };

  const [columnDefs] = useState([
    { field: "date", sortable: true, filter: true },
    { field: "duration", sortable: true, filter: true },
    { field: "activity", sortable: true, filter: true },
    {
      headerName: "Customer",
      field: "links[2]",
      sortable: true,
      filter: true,
    },
  ]);

  return (
    <>
      <div
        className="ag-theme-material"
        style={{ height: 700, width: "80%", margin: "auto" }}
      >
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
