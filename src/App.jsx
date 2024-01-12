import Example from "./Example";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Gantt from "./Gantt";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" Component={Example} />
        <Route path="/gantt" Component={Gantt} />
      </Routes>
    </Router>
  );
};

export default App;
