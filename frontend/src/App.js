import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import SignupPage from "./pages/SignupPage"
import ProblemPage from "./pages/ProblemPage"
import LoginPage from "./pages/LoginPage"
import ContributePage from "./pages/ContributePage"
import MatchingPage from "./pages/MatchingPage"
import EditorPage from "./pages/EditorPage"
import NavBar from "./components/NavBar"
import ProfilePage from "./pages/ProfilePage"
import useUser from "./hooks/useUser"
import ChangePasswordPage from "./pages/ChangePasswordPage"

function App() {
  const { user, saveUser } = useUser()

  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/problems" element={<ProblemPage />} />
          <Route path="/signup" element={<ContributePage />} />
          <Route path="/login" element={<LoginPage saveUser={saveUser} />} />
          <Route path="/matching" element={<MatchingPage />} />
          <Route path="/editor" element={<EditorPage />} />
          <Route path="/profile" element={<ProfilePage user={user} />} />
          <Route
            path="/change-password"
            element={<ChangePasswordPage user={user}></ChangePasswordPage>}
          ></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
