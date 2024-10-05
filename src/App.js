import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "./pages/loading";
import Home from "./pages/Home";
import Token from "./pages/token";
import AboutUs from "./pages/aboutus";
import Intelligence from "./pages/Intelligence";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/intelligence" element={<Intelligence />} />
          <Route path="/token" element={<Token />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/loading" element={<Loading />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
