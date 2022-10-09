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
import useUser from "./hooks/useUser"
import ChangePasswordPage from "./pages/ChangePasswordPage"

function App() {
  const { user, saveUser, removeUser } = useUser()

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
          <Route path="/matching/:difficulty" element={<MatchingPage />} />
          <Route path="/editor" element={<EditorPage />} />
          <Route
            path="/profile"
            element={
              user ? (
                <ProfilePage user={user} removeUser={removeUser} />
              ) : (
                <Navigate to="/"></Navigate>
              )
            }
          />
          <Route
            path="/change-password"
            element={
              user ? (
                <ChangePasswordPage user={user}></ChangePasswordPage>
              ) : (
                <Navigate to="/"></Navigate>
              )
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
