import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "./pages/loading";
import Home from "./pages/Home";
import Dashboard from "./pages/dashboard";
import AboutUs from "./pages/aboutus";
import Intelligence from "./pages/Intelligence";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/intelligence" element={<Intelligence />} />
          <Route path="/token" element={<Dashboard />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="*" element={<Loading />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
