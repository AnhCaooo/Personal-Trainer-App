import "./App.css";
import { Link } from "react-router-dom";
import Customers from "./components/routes/Customers";
import Trainings from "./components/routes/Trainings";

function App() {
  return (
    <div className="App">
      <Customers />
      <Trainings />
    </div>
  );
}

export default App;
