import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import { URL_USER_SVC } from "../configs"
import { STATUS_CODE_CONFLICT, STATUS_CODE_CREATED } from "../constants"
import { Link, NavLink } from "react-router-dom"
import { Visibility, VisibilityOff } from "@mui/icons-material"

function SignupPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [usernameMissing, setUsernameMissing] = useState(true)
  const [passwordMissing, setPasswordMissing] = useState(true)

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
  const [snackbarTitle, setSnackbarTitle] = useState("")
  const [snackbarMsg, setSnackbarMsg] = useState("")

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogTitle, setDialogTitle] = useState("")
  const [dialogMsg, setDialogMsg] = useState("")
  const [isSignupSuccess, setIsSignupSuccess] = useState(false)

  const handleSignup = async () => {
    setIsSignupSuccess(false)

    if (username === "") {
      setUsernameMissing(true)
    }

    if (password === "") {
      setPasswordMissing(true)
    }

    if (!username || !password) {
      setIsSnackbarOpen(true)
      setSnackbarTitle("Missing Field(s)")
      setSnackbarMsg("Please fill in your username and password.")
      return
    }

    const res = await axios
      .post(URL_USER_SVC, { username, password })
      .catch((err) => {
        if (err.response.status === STATUS_CODE_CONFLICT) {
          setErrorDialog("This username already exists")
        } else {
          setErrorDialog("Please try again later")
        }
      })
    if (res && res.status === STATUS_CODE_CREATED) {
      setSuccessDialog("Account successfully created")
      setIsSignupSuccess(true)
    }
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

  const closeDialog = () => setIsDialogOpen(false)

  const setSuccessDialog = (msg) => {
    setIsDialogOpen(true)
    setDialogTitle("Success")
    setDialogMsg(msg)
  }

  const setErrorDialog = (msg) => {
    setIsDialogOpen(true)
    setDialogTitle("Error")
    setDialogMsg(msg)
  }

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems="center"
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
          Sign Up
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
              onClick={handleSignup}
              disableElevation
            >
              Sign Up
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
              Already have an account?
            </Typography>
            <NavLink to={"/login"} className="redirectLink">
              LOGIN
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
        <Dialog open={isDialogOpen} onClose={closeDialog}>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText>{dialogMsg}</DialogContentText>
          </DialogContent>
          <DialogActions>
            {isSignupSuccess ? (
              <Button component={Link} to="/login">
                Log in
              </Button>
            ) : (
              <Button onClick={closeDialog}>Done</Button>
            )}
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  )
}

export default SignupPage
