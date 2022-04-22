import React, { useState } from "react";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

function AddCustomer({ addCustomer }) {
  const [customer, setCustomer] = useState({
    firstname: "",
    lastname: "",
    streetaddress: "",
    postcode: "",
    city: "",
    email: "",
    phone: "",
  });

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    addCustomer(customer);
    setCustomer({
      firstname: "",
      lastname: "",
      streetaddress: "",
      postcode: "",
      city: "",
      email: "",
      phone: "",
    });
    setOpen(false);
  };

  const inputChanged = (event) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  };

  return (
    <>
      <IconButton
        color="primary"
        onClick={handleClickOpen}
        style={{ marginTop: 10 }}
      >
        <AddCircleOutlineIcon /> New Customer
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Upcoming Customer</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="firstname"
            value={customer.firstname}
            onChange={inputChanged}
            label="First Name"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="lastname"
            value={customer.lastname}
            onChange={inputChanged}
            label="Last Name"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="email"
            value={customer.email}
            onChange={inputChanged}
            label="Email"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="phone"
            value={customer.phone}
            onChange={inputChanged}
            label="Phone"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="streetaddress"
            value={customer.streetaddress}
            onChange={inputChanged}
            label="Street Address"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="postcode"
            value={customer.postcode}
            onChange={inputChanged}
            label="Postcode"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="city"
            value={customer.city}
            onChange={inputChanged}
            label="City"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddCustomer;
