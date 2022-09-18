import { Visibility, VisibilityOff } from "@mui/icons-material"
import {
  Alert,
  AlertTitle,
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
  Typography,
} from "@mui/material"
import { Box } from "@mui/system"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import { URL_CHANGE_PW_SVC } from "../configs"
import {
  STATUS_CODE_INTERAL_ERROR,
  STATUS_CODE_INVALID,
  STATUS_CODE_UNAUTHORIZED,
  STATUS_CODE_NO_CONTENT,
  STATUS_CODE_SUCCESS,
} from "../constants"

const ChangePasswordPage = ({ user }) => {
  const [oldPassword, setOldPassword] = useState("")
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [oldPasswordMissing, setOldPasswordMissing] = useState(true)
  const [newPassword, setNewPassword] = useState("")
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [newPasswordMissing, setNewPasswordMissing] = useState(true)
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [confirmPasswordMissing, setConfirmPasswordMissing] = useState(true)

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
  const [snackbarTitle, setSnackbarTitle] = useState("")
  const [snackbarMsg, setSnackbarMsg] = useState("")

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogTitle, setDialogTitle] = useState("")
  const [dialogMsg, setDialogMsg] = useState("")
  // TODO: test to see if toChange is needed
  const [toChange, setToChange] = useState(false)

  const navigate = useNavigate()

  const handleChangePasswordConfirmation = () => {
    console.log("Change Password :>> pressed")
    if (!oldPassword || !newPassword || !confirmPassword) {
      closeDialog()
      setErrorSnackbar(
        "Missing Fields",
        "Please ensure that all fields are filled."
      )
      return
    }

    if (newPassword !== confirmPassword) {
      closeDialog()
      setErrorSnackbar(
        "Inconsistent New Password",
        "Please ensure that your new passwords match."
      )
      return
    }

    setDialog("Confirmation", "Do you want to change your password?")
  }

  const handleChange = async () => {
    console.log("Change Password Confirmation :>> pressed")
    console.log("user :>> ", user)

    const res = await axios
      .put(URL_CHANGE_PW_SVC, { username: user, oldPassword, newPassword })
      .catch((err) => {
        closeDialog()
        console.log("err.response :>> ", err.response)

        if (err.response.status === STATUS_CODE_UNAUTHORIZED) {
          setErrorSnackbar(err.response.data.title, err.response.data.message)
        } else if (err.response.status === STATUS_CODE_INVALID) {
          //TODO: backend needs title
          setErrorSnackbar("Error", err.response.data.message)
        } else if (err.response.status === STATUS_CODE_INTERAL_ERROR) {
          setErrorSnackbar(err.response.data.title, err.response.data.message)
        } else {
          setErrorSnackbar("ERROR", "Please try again.")
          console.log("err.response :>> ", err.response)
        }
      })

    if (res && res.status === STATUS_CODE_SUCCESS) {
      setToChange(true)
      setDialog("Password successfully changed", "")
      navigate("/")
    }
  }

  const setDialog = (title, msg) => {
    setIsDialogOpen(true)
    setDialogTitle(title)
    setDialogMsg(msg)
  }

  const closeDialog = () => {
    setIsDialogOpen(false)
    if (toChange) {
      navigate("/")
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

  const handlePasswordChange = (e, setPassword, setPasswordMissing) => {
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
      alignItems="center"
      justifyContent={"center"}
      my={10}
    >
      <Box
        sx={{ boxShadow: 2, borderRadius: "12px" }}
        padding={6}
        display="flex"
        flexDirection={"column"}
        gap={1}
      >
        <Typography textAlign={"center"} variant={"h4"} marginBottom={"2rem"}>
          Change Password
        </Typography>

        <Typography>Old Password</Typography>
        <FormControl sx={{ marginBottom: "1rem" }}>
          <InputLabel
            htmlFor="outlined-password-input"
            color={oldPasswordMissing ? "error" : "primary"}
            size="small"
            required
          >
            Password
          </InputLabel>
          <OutlinedInput
            label="OldPassword"
            color={oldPasswordMissing ? "error" : "primary"}
            id="outlined-old-password-input"
            type={showOldPassword ? "text" : "password"}
            value={oldPassword}
            size="small"
            onChange={(e) =>
              handlePasswordChange(e, setOldPassword, setOldPasswordMissing)
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle old password visibility"
                  size="small"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                >
                  {showOldPassword ? (
                    <Visibility></Visibility>
                  ) : (
                    <VisibilityOff></VisibilityOff>
                  )}
                </IconButton>
              </InputAdornment>
            }
          ></OutlinedInput>
        </FormControl>
        <Typography>New Password</Typography>
        <FormControl sx={{ marginBottom: "1rem" }}>
          <InputLabel
            htmlFor="outlined-password-input"
            color={newPasswordMissing ? "error" : "primary"}
            size="small"
            required
          >
            Password
          </InputLabel>
          <OutlinedInput
            label="Password"
            color={newPasswordMissing ? "error" : "primary"}
            id="outlined-new-password-input"
            type={showNewPassword ? "text" : "password"}
            value={newPassword}
            size="small"
            onChange={(e) =>
              handlePasswordChange(e, setNewPassword, setNewPasswordMissing)
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle old password visibility"
                  size="small"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <Visibility></Visibility>
                  ) : (
                    <VisibilityOff></VisibilityOff>
                  )}
                </IconButton>
              </InputAdornment>
            }
          ></OutlinedInput>
        </FormControl>
        <Typography>Confirm New Password</Typography>
        <FormControl sx={{ marginBottom: "1rem" }}>
          <InputLabel
            htmlFor="outlined-password-input"
            color={confirmPasswordMissing ? "error" : "primary"}
            size="small"
            required
          >
            Password
          </InputLabel>
          <OutlinedInput
            label="Password"
            color={confirmPasswordMissing ? "error" : "primary"}
            id="outlined-confirm-password-input"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            size="small"
            onChange={(e) =>
              handlePasswordChange(
                e,
                setConfirmPassword,
                setConfirmPasswordMissing
              )
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle old password visibility"
                  size="small"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
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
            onClick={handleChangePasswordConfirmation}
            disableElevation
          >
            Change Password
          </Button>
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
            {toChange ? (
              <Button component={Link} to="/">
                Return to main page
              </Button>
            ) : (
              <Box>
                <Button color="error" onClick={handleChange}>
                  Change
                </Button>
                <Button onClick={closeDialog}>Return</Button>
              </Box>
            )}
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  )
}

export default ChangePasswordPage
