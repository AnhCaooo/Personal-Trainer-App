import "./App.css";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Customers from "./components/routes/Customers";
import Trainings from "./components/routes/Trainings";
import PageNotFound from "./components/routes/PageNotFound";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/customers" element={<Customers />}></Route>
          <Route path="/trainings" element={<Trainings />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
