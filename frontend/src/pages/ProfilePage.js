import {
  Alert,
  AlertTitle,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material"
import { Box } from "@mui/system"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import { URL_DELETE_SVC } from "../configs"
import {
  STATUS_CODE_INTERAL_ERROR,
  STATUS_CODE_INVALID,
  STATUS_CODE_UNAUTHORIZED,
  STATUS_CODE_NO_CONTENT,
} from "../constants"

const ProfilePage = ({ user }) => {
  //   const [username, setUsername] = useState("TODO: fill in")

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
  const [snackbarTitle, setSnackbarTitle] = useState("")
  const [snackbarMsg, setSnackbarMsg] = useState("")

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogTitle, setDialogTitle] = useState("")
  const [dialogMsg, setDialogMsg] = useState("")
  // TODO: test to see if toDelete is needed
  const [toDelete, setToDelete] = useState(false)

  const navigate = useNavigate()

  const handleChangePassword = () => {
    //TODO: complete for week 6
    console.log("Change Password :>> not yet implemented")
  }

  const handleDeleteConfirmation = () => {
    console.log("Delete Account :>> pressed")
    setDialog("Confirmation", "Do you want to delete your account?")
  }

  const handleDelete = async () => {
    console.log("Delete Account Confirmation :>> pressed")
    console.log("user :>> ", user)

    const res = await axios.delete(URL_DELETE_SVC).catch((err) => {
      if (err.response.status === STATUS_CODE_UNAUTHORIZED) {
        setErrorSnackbar(err.response.data.title, err.response.data.message)
      } else if (err.response.status === STATUS_CODE_INVALID) {
        setErrorSnackbar(err.response.data.title, err.response.data.message)
      } else if (err.response.status === STATUS_CODE_INTERAL_ERROR) {
        setErrorSnackbar(err.response.data.title, err.response.data.message)
      } else {
        setErrorSnackbar("ERROR", "Please try again.")
        console.log("err.response :>> ", err.response)
      }
    })

    if (res && res.status === STATUS_CODE_NO_CONTENT) {
      setToDelete(true)
      setDialog("Account successfully deleted", "")
      localStorage.clear()
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
    if (toDelete) {
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
          Profile Details
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
            size="small"
            sx={{ marginBottom: "1rem" }}
            value={user}
            inputProps={{ readOnly: true }}
          />
          <Box display={"flex"} flexDirection={"column"} marginTop={2}>
            <Button
              variant={"contained"}
              onClick={handleChangePassword}
              disableElevation
            >
              Change Password
            </Button>
          </Box>
          <Box display={"flex"} flexDirection={"column"}>
            <Button
              variant={"outlined"}
              color={"error"}
              onClick={handleDeleteConfirmation}
              disableElevation
            >
              Delete Account
            </Button>
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
            {toDelete ? (
              <Button component={Link} to="/">
                Return to main page
              </Button>
            ) : (
              <Box>
                <Button color="error" onClick={handleDelete}>
                  Delete
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

export default ProfilePage
