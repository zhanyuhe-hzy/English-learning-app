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
import Layout from "./components/Layout";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/practice" element={<Layout><PracticePage /></Layout>} />
        <Route path="/result" element={<Layout><ResultPage /></Layout>} />
        <Route path="/records" element={<Layout><RecordsPage /></Layout>} />
        <Route path="/learn" element={<Layout><LearnPage /></Layout>} />
        <Route path="/pronunciation" element={<Layout><PronunciationPage /></Layout>} />
        <Route path="/speaking" element={<Layout><SpeakingPage /></Layout>} />
        <Route path="/dialogue" element={<Layout><DialoguePage /></Layout>} />
        <Route path="/phrases" element={<Layout><PhrasesPage /></Layout>} />
      </Routes>
    </Router>
  );
}
