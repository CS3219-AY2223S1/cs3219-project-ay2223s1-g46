import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import SignupPage from './components/SignupPage'
import { Box } from '@mui/material'
import LoginPage from './components/LoginPage'

function App() {
  return (
    <div className="App">
      <Box display={'flex'} flexDirection={'column'} padding={'4rem'}>
        <Router>
          <Routes>
            <Route
              exact
              path="/"
              element={<Navigate replace to="/signup" />}
            ></Route>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />}></Route>
          </Routes>
        </Router>
      </Box>
    </div>
  )
}

export default App
