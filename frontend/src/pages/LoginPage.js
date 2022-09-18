import {
  Alert,
  AlertTitle,
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material"
import { useState } from "react"
import axios from "axios"
import { URL_LOGIN_SVC } from "../configs"
import {
  STATUS_CODE_INVALID,
  STATUS_CODE_SUCCESS,
  STATUS_CODE_UNAUTHORIZED,
} from "../constants"
import { NavLink, useNavigate } from "react-router-dom"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import "../components/css/LoginSignUpRedirectLink.css"

// TODO: make responsive if needed (inputs get squashed for now)

const LoginPage = ({ saveUser }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [usernameMissing, setUsernameMissing] = useState(true)
  const [passwordMissing, setPasswordMissing] = useState(true)

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
  const [snackbarTitle, setSnackbarTitle] = useState("")
  const [snackbarMsg, setSnackbarMsg] = useState("")

  const navigate = useNavigate()

  const handleLogin = async () => {
    if (username === "") {
      setUsernameMissing(true)
    }

    if (password === "") {
      setPasswordMissing(true)
    }

    // * implemented in backend
    // if (!username || !password) {
    //   setErrorSnackbar(
    //     "Missing Field(s)",
    //     "Please fill in your username and password."
    //   )
    //   return
    // }

    const res = await axios
      .post(URL_LOGIN_SVC, { username, password })
      .catch((err) => {
        setIsSnackbarOpen(true)
        if (err.response.status === STATUS_CODE_UNAUTHORIZED) {
          setErrorSnackbar(err.response.data.title, err.response.data.message)
        } else if (err.response.status === STATUS_CODE_INVALID) {
          setErrorSnackbar("ERROR", err.response.data.message)
        } else {
          setErrorSnackbar("Unknown Error", "Please try again.") //TODO: custom title?
          console.log("err.response :>> ", err.response)
        }
      })
    if (res && res.status === STATUS_CODE_SUCCESS) {
      saveUser(res.data.username)
      navigate("/")
      console.log("logged in :>> ", res.data.username)
    }
  }

  const setErrorSnackbar = (title, msg) => {
    setIsSnackbarOpen(true)
    setSnackbarTitle(title)
    setSnackbarMsg(msg)
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return
    }
    setIsSnackbarOpen(false)
  }

  const handleUsernameChange = (e) => {
    e.preventDefault()
    setUsername(e.target.value)
    if (e.target.value === "") {
      setUsernameMissing(true)
      return
    }
    setUsernameMissing(false)
  }

  const handlePasswordChange = (e) => {
    e.preventDefault()
    setPassword(e.target.value)
    if (e.target.value === "") {
      setPasswordMissing(true)
      return
    }
    setPasswordMissing(false)
  }

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={1}
        py={10}
        px={6}
        maxWidth={"40%"}
      >
        <Typography textAlign={"center"} variant={"h3"} marginBottom={"2rem"}>
          Login
        </Typography>
        <Box
          sx={{ boxShadow: 2, borderRadius: "12px" }}
          padding={6}
          display="flex"
          flexDirection={"column"}
          gap={1}
        >
          <TextField
            label="Username"
            variant="outlined"
            color={usernameMissing ? "error" : "primary"}
            size="small"
            value={username}
            onChange={handleUsernameChange}
            sx={{ marginBottom: "1rem" }}
            autoFocus
            required
          />
          <FormControl sx={{ marginBottom: "2rem" }}>
            <InputLabel
              htmlFor="outlined-password-input"
              color={passwordMissing ? "error" : "primary"}
              size="small"
              required
            >
              Password
            </InputLabel>
            <OutlinedInput
              label="Password"
              color={passwordMissing ? "error" : "primary"}
              id="outlined-password-input"
              type={showPassword ? "text" : "password"}
              value={password}
              size="small"
              onChange={handlePasswordChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    size="small"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <Visibility></Visibility>
                    ) : (
                      <VisibilityOff></VisibilityOff>
                    )}
                  </IconButton>
                </InputAdornment>
              }
            ></OutlinedInput>
          </FormControl>
          <Box display={"flex"} flexDirection={"column"} marginTop={2}>
            <Button
              variant={"contained"}
              onClick={handleLogin}
              disableElevation
            >
              Login
            </Button>
          </Box>
          <Box
            display={"flex"}
            flexDirection={"column"}
            marginTop={2}
            alignItems="center"
          >
            <Typography
              textAlign={"center"}
              variant="subtitle2"
              fontStyle={"italic"}
              className="redirectText"
            >
              Don't have an account?
            </Typography>
            <NavLink to={"/signup"} className="redirectLink">
              SIGN UP
            </NavLink>
          </Box>
        </Box>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={isSnackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert severity="error" onClose={handleCloseSnackbar}>
            <AlertTitle>{snackbarTitle}</AlertTitle>
            {snackbarMsg}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  )
}

export default LoginPage
