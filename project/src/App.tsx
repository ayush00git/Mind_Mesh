import { Music } from "lucide-react";
import Homepage from "./components/Homepage";
import Home from "./home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Health from "./pages/health_test";
import Breathing from "./pages/breath";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/home/music" element={<Music />} />
        <Route path="/home/test" element={<Health />} />
        <Route path="/home/breath" element={<Breathing />} />

      </Routes>
    </Router>
  );
}

export default App;