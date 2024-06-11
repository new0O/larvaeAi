import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import History from "./pages/History";
import About from "./pages/About";
import Home from "./pages/Home";
import MyLayout1 from "./components/MyLayout1";
import Records from "./pages/Records";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MyLayout1 />}>
          <Route index element={<Home />} />
          <Route path="history" element={<History />} />
          <Route path="about" element={<About />} />
          <Route path="records" element={<Records />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
