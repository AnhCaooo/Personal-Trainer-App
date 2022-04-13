import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Customers from "./components/routes/Customers";
import Trainings from "./components/routes/Trainings";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import PageNotFound from "./components/routes/PageNotFound";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Link to="/">
          <PeopleAltIcon /> Customers
        </Link>{" "}
        <Link to="/trainings">
          <CalendarMonthOutlinedIcon /> Trainings
        </Link>{" "}
        <Routes>
          <Route exact path="/" element={<Customers />} />
          <Route path="trainings" element={<Trainings />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
