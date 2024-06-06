import { Route, Routes } from "react-router-dom";
import { HomePage, ContestPage, SubmissionPage } from "./pages";
import "./App.css";
import Header from "./components/Header/Header";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contest" element={<ContestPage />} />
        <Route path="/submission" element={<SubmissionPage />} />
      </Routes>
    </div>
  );
}

export default App;
