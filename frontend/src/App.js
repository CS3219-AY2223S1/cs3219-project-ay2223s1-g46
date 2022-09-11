import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import HomePage from "./pages/HomePage"
import SignupPage from "./pages/SignupPage"
import ProblemPage from "./pages/ProblemPage"
import LoginPage from "./pages/LoginPage"
import ContributePage from "./pages/ContributePage"
import MatchingPage from "./pages/MatchingPage"
import EditorPage from "./pages/EditorPage"
import NavBar from "./components/NavBar"
import ProfilePage from "./pages/ProfilePage"

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/problems" element={<ProblemPage />} />
          <Route path="/signup" element={<ContributePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/matching" element={<MatchingPage />} />
          <Route path="/editor" element={<EditorPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
