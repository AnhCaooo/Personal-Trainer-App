import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { format } from "date-fns";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import AddTraining from "../subcomponents/AddTraining";

function Trainings() {
  const [trainings, setTrainings] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then((response) => response.json())
      .then((responseData) => setTrainings(responseData))
      .then((err) => console.error(err));
  };

  const addTraining = (newTraining) => {
    fetch("https://customerrest.herokuapp.com/api/trainings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTraining),
    })
      .then((response) => {
        if (response.ok) {
          fetchTrainings();
        } else {
          alert("Something went wrong when adding new training!");
        }
      })
      .catch((err) => console.error(err));
  };

  const deleteTraining = (id) => {
    if (window.confirm("Are you sure?")) {
      fetch(`https://customerrest.herokuapp.com/api/trainings/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            alert("Something went wrong while deleting customer's training!");
          } else {
            setOpen(true);
            fetchTrainings();
          }
        })
        .catch((err) => console.error(err));
    }
  };

  const [columnDefs] = useState([
    {
      headerName: "Activity",
      field: "activity",
      sortable: true,
      filter: true,
      flex: 1,
    },
    {
      headerName: "Date",
      field: "date",
      sortable: true,
      filter: true,
      flex: 1,
      valueFormatter: (params) =>
        format(new Date(params.value), "dd.MM.yyyy HH:mm aaa"),
    },
    {
      headerName: "Duration",
      field: "duration",
      sortable: true,
      filter: true,
      flex: 1,
    },
    {
      headerName: "Customer",
      flex: 1,
      valueGetter(params) {
        return (
          params.data.customer.firstname + " " + params.data.customer.lastname
        );
      },
      sortable: true,
      filter: true,
    },
    {
      headerName: "",
      flex: 1,
      field: "id",
      cellRenderer: (params) => (
        <IconButton color="error" onClick={() => deleteTraining(params.value)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ]);

  return (
    <>
      <div
        className="ag-theme-material"
        style={{ height: 700, width: "65%", margin: "auto" }}
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
