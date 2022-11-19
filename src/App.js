import "./App.css";
import Builder from "./Routes/Builder";
import Bar from "./Components/Bar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Bar />
        <Routes>
          <Route path="/" element={<h1>Hello</h1>} />
          <Route path="/build" element={<Builder />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
