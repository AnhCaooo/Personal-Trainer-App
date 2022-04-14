import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

function NavAppBar() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            <Link style={{ textDecoration: "none", color: "white" }} to="/">
              <FitnessCenterIcon /> Home
            </Link>{" "}
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/customers"
            >
              <PeopleAltIcon /> Customers
            </Link>{" "}
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/trainings"
            >
              <CalendarMonthIcon /> Trainings
            </Link>{" "}
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default NavAppBar;
