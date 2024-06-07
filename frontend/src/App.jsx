import { Route, Routes } from "react-router-dom";
import { HomePage, ContestPage, SubmissionPage } from "./pages";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./App.css";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contest" element={<ContestPage />} />
        <Route path="/submission" element={<SubmissionPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
