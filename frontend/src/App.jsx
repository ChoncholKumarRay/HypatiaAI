import { Route, Routes } from "react-router-dom";
import { HomePage, AboutPage, CamPage } from "./pages";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./App.css";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/cam" element={<CamPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
