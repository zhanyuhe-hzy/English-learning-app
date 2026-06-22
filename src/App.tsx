import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PracticePage from "./pages/PracticePage";
import ResultPage from "./pages/ResultPage";
import RecordsPage from "./pages/RecordsPage";
import LearnPage from "./pages/LearnPage";
import PronunciationPage from "./pages/PronunciationPage";
import SpeakingPage from "./pages/SpeakingPage";
import DialoguePage from "./pages/DialoguePage";
import PhrasesPage from "./pages/PhrasesPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/practice" element={<PracticePage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/records" element={<RecordsPage />} />
        <Route path="/learn" element={<LearnPage />} />
        <Route path="/pronunciation" element={<PronunciationPage />} />
        <Route path="/speaking" element={<SpeakingPage />} />
        <Route path="/dialogue" element={<DialoguePage />} />
        <Route path="/phrases" element={<PhrasesPage />} />
      </Routes>
    </Router>
  );
}
