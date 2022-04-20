import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Snackbar from "@mui/material/Snackbar";
import AddCustomer from "../subcomponents/AddCustomer";
import EditCustomer from "../subcomponents/EditCustomer";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false);

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

  const deleteCustomer = (link) => {
    if (window.confirm("Are you sure?")) {
      fetch(link, { method: "DELETE" })
        .then((response) => {
          if (!response.ok) {
            alert("Something went wrong while deleting customer");
          } else {
            setOpen(true);
            fetchCustomers();
          }
        })
        .catch((err) => console.error(err));
    }
  };

  const addCustomer = (newCustomer) => {
    fetch("https://customerrest.herokuapp.com/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCustomer),
    })
      .then((response) => {
        if (response.ok) {
          fetchCustomers();
        } else {
          alert("Something went wrong when adding new customer!");
        }
      })
      .catch((err) => console.error(err));
  };

  const updateCustomer = (updateCustomer, link) => {
    fetch(link, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateCustomer),
    })
      .then((response) => {
        if (response.ok) {
          fetchCustomers();
        } else {
          alert("Something went wrong in editing customer profile!");
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
      width: 130,
    },
    {
      headerName: "Last Name",
      field: "lastname",
      sortable: true,
      filter: true,
      width: 130,
    },
    { field: "email", sortable: true, filter: true, width: 170 },
    { field: "phone", sortable: true, filter: true, width: 140 },
    {
      headerName: "Street Address",
      field: "streetaddress",
      sortable: true,
      filter: true,
      width: 170,
    },
    { field: "postcode", sortable: true, filter: true, width: 120 },
    { field: "city", sortable: true, filter: true, width: 110 },
    {
      headerName: "",
      field: "link",
      cellRenderer: (params) => (
        <EditCustomer params={params} updateCustomer={updateCustomer} />
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
        style={{ height: 700, width: "80%", margin: "auto" }}
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
        message="Customer was deleted successfully"
      />
    </>
  );
}

export default Customers;
