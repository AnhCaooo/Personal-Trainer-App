import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { format } from "date-fns";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

function Trainings() {
  const [trainings, setTrainings] = useState([]);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = () => {
    fetch(process.env.REACT_APP_TRAININGS_URL)
      .then((response) => response.json())
      .then((responseData) => setTrainings(responseData))
      .then((err) => console.error(err));
  };

  const deleteTraining = async (id) => {
    if (window.confirm("Are you sure?")) {
      await fetch(process.env.REACT_APP_API_URL + `/trainings/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            alert("Something went wrong while deleting customer's training!");
          } else {
            setMsg("Training was deleted successfully");
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
      width: 100,
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
        style={{ height: 650, width: "50%", margin: "auto" }}
      >
        <AgGridReact
          rowData={trainings}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
        ></AgGridReact>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert severity="success">{msg}</Alert>
      </Snackbar>
    </>
  );
}

export default Trainings;
