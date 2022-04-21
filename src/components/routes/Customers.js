import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AddCustomer from "../subcomponents/AddCustomer";
import EditCustomer from "../subcomponents/EditCustomer";
import AddTraining from "../subcomponents/AddTraining";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then((response) => response.json())
      .then((responseData) => {
        const customers = responseData.content.map((customer) => {
          customer.link = customer.links[0].href;
          return customer;
        });
        setCustomers(customers);
      })

      .catch((err) => console.error(err));
  };

  const deleteCustomer = async (link) => {
    if (window.confirm("Are you sure?")) {
      await fetch(link, { method: "DELETE" })
        .then((response) => {
          if (!response.ok) {
            alert("Something went wrong while deleting customer");
          } else {
            setMsg("Customer deleted!");
            setOpen(true);
            fetchCustomers();
          }
        })
        .catch((err) => console.error(err));
    }
  };

  const addCustomer = async (newCustomer) => {
    await fetch("https://customerrest.herokuapp.com/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCustomer),
    })
      .then((response) => {
        if (response.ok) {
          setMsg("Customer added successfully!");
          setOpen(true);
          fetchCustomers();
        } else {
          alert("Something went wrong when adding new customer!");
        }
      })
      .catch((err) => console.error(err));
  };

  const updateCustomer = async (updateCustomer, link) => {
    await fetch(link, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateCustomer),
    })
      .then((response) => {
        if (response.ok) {
          setMsg("Customer profile was updated!");
          setOpen(true);
          fetchCustomers();
        } else {
          alert("Something went wrong in editing customer profile!");
        }
      })
      .catch((err) => console.error(err));
  };

  const addTraining = async (newTraining) => {
    await fetch("https://customerrest.herokuapp.com/api/trainings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTraining),
    })
      .then((response) => {
        if (response.ok) {
          setMsg("Training was added for customer!");
          setOpen(true);
          fetchCustomers();
        } else {
          alert("Something when wrong while adding training to the customer!");
        }
      })
      .catch((err) => console.error(err));
  };

  const [columnDefs] = useState([
    {
      headerName: "First Name",
      field: "firstname",
      sortable: true,
      filter: true,
      flex: 1,
    },
    {
      headerName: "Last Name",
      field: "lastname",
      sortable: true,
      filter: true,
      flex: 1,
    },
    {
      headerName: "Email",
      field: "email",
      sortable: true,
      filter: true,
      flex: 1,
    },
    {
      headerName: "Phone",
      field: "phone",
      sortable: true,
      filter: true,
      flex: 1,
    },
    {
      headerName: "Street Address",
      field: "streetaddress",
      sortable: true,
      filter: true,
      flex: 1,
    },
    {
      headerName: "Postcode",
      field: "postcode",
      sortable: true,
      filter: true,
      flex: 1,
    },
    {
      headerName: "City",
      field: "city",
      sortable: true,
      filter: true,
      flex: 1,
    },
    {
      headerName: "",
      field: "link",
      width: 100,
      cellRenderer: (params) => (
        <EditCustomer params={params} updateCustomer={updateCustomer} />
      ),
    },
    {
      headerName: "",
      field: "link",
      width: 100,
      cellRenderer: (params) => (
        <AddTraining addTraining={addTraining} params={params} />
      ),
    },
    {
      headerName: "",
      field: "link",
      width: 100,
      cellRenderer: (params) => (
        <IconButton color="error" onClick={() => deleteCustomer(params.value)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ]);

  return (
    <>
      <AddCustomer addCustomer={addCustomer} />
      <div
        className="ag-theme-material"
        style={{ height: 650, width: "80%", margin: "auto" }}
      >
        <AgGridReact
          rowData={customers}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
          suppressCellFocus={true}
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

export default Customers;
