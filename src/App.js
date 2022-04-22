import "./App.css";
import NavAppBar from "./components/subcomponents/NavAppBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Customers from "./components/routes/Customers";
import Trainings from "./components/routes/Trainings";
import PageNotFound from "./components/routes/PageNotFound";
import Home from "./components/routes/Home";
import CalendarScreen from "./components/routes/CalendarScreen";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavAppBar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/customers" element={<Customers />}></Route>
          <Route path="/trainings" element={<Trainings />}></Route>
          <Route path="/calendar" element={<CalendarScreen />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
