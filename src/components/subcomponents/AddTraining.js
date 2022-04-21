import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

function AddTraining({ addTraining }) {
  const [training, setTraining] = useState({
    date: "",
    activity: "",
    duration: "",
    customer: "",
  });

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    addTraining(training);
    setTraining({
      date: "",
      activity: "",
      duration: "",
      customer: "",
    });
    setOpen(false);
  };

  const inputChanged = (event) => {
    setTraining({ ...training, [event.target.name]: event.target.value });
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        style={{ marginTop: 10 }}
      >
        Add new training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Training</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="date"
            value={training.date}
            onChange={inputChanged}
            label="Date"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="activity"
            value={training.activity}
            onChange={inputChanged}
            label="Activity"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="duration"
            value={training.duration}
            onChange={inputChanged}
            label="Duration"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="customer"
            value={training.customer}
            onChange={inputChanged}
            label="Customer"
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

export default AddTraining;
