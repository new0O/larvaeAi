import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import History from "./pages/History";
import About from "./pages/About";
import Home from "./pages/Home";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="history" element={<History />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
