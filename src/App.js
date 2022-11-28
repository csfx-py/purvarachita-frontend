import "./App.css";
import Builder from "./Routes/Builder";
import {  Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<h1>Hello</h1>} />
          <Route path="/build" element={<Builder />} />
        </Routes>
    </div>
  );
}

export default App;
