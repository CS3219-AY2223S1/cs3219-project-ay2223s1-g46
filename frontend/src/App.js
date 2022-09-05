import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import HomePage from "./components/HomePage";
import SignupPage from './components/SignupPage';
import ProblemPage from "./components/ProblemPage";
import LoginPage from "./components/LoginPage";
import ContributePage from "./components/ContributePage";
import MatchingPage from "./components/MatchingPage";
import NavBar from "./components/NavBar";
import {Box} from "@mui/material";

function App() {
    return (
        <div className="App">
            <Router>
                <NavBar/>
                <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/signup" element={<SignupPage/>}/>
                        <Route path="/problems" element={<ProblemPage/>}/>
                        <Route path="/signup" element={<ContributePage/>}/>
                        <Route path="/signup" element={<LoginPage/>}/>
                        <Route path="problems/matching" element={<MatchingPage/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
