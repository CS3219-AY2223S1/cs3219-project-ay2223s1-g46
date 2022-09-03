import {
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
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import axios from 'axios'
import { URL_USER_SVC } from '../configs'
import {
  STATUS_CODE_CREATED,
  STATUS_CODE_INVALID_PASSWORD,
  STATUS_CODE_INVALID_USERNAME,
} from '../constants'
import { Link } from 'react-router-dom'
import { Visibility, VisibilityOff } from '@mui/icons-material'

function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [usernameMissing, setUsernameMissing] = useState(false)
  const [passwordMissing, setPasswordMissing] = useState(false)

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogTitle, setDialogTitle] = useState('')
  const [dialogMsg, setDialogMsg] = useState('')
  const [isSignupSuccess, setIsSignupSuccess] = useState(false)

  const handleLogin = async () => {
    setIsSignupSuccess(false)
    const res = await axios
      .post(URL_USER_SVC, { username, password })
      .catch((err) => {
        if (err.response.status === STATUS_CODE_INVALID_USERNAME) {
          setErrorDialog('This username does not exist!')
        } else if (err.response.status === STATUS_CODE_INVALID_PASSWORD) {
          setErrorDialog('Password is incorrect!')
        } else {
          setErrorDialog('Unknown error: Please try again later.')
        }
      })
    if (res && res.status === STATUS_CODE_CREATED) {
      setSuccessDialog('Account successfully created')
      setIsSignupSuccess(true)
    }
  }

  const closeDialog = () => setIsDialogOpen(false)

  const setSuccessDialog = (msg) => {
    setIsDialogOpen(true)
    setDialogTitle('Success')
    setDialogMsg(msg)
  }

  const setErrorDialog = (msg) => {
    setIsDialogOpen(true)
    setDialogTitle('Error')
    setDialogMsg(msg)
  }

  return (
    <Box display={'flex'} flexDirection={'column'} width={'30%'}>
      <Typography variant={'h3'} marginBottom={'2rem'}>
        Login
      </Typography>
      <TextField
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{ marginBottom: '1rem' }}
        autoFocus
        required
      />
      <FormControl sx={{ marginBottom: '2rem' }}>
        <InputLabel htmlFor="outlined-password-input" required>
          Password
        </InputLabel>
        <OutlinedInput
          label="Password"
          id="outlined-password-input"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={(e) => setShowPassword(!showPassword)}
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
      <Box display={'flex'} flexDirection={'row'} justifyContent={'flex-end'}>
        <Button variant={'contained'} onClick={handleLogin} disableElevation>
          Login
        </Button>
      </Box>
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
  )
}

export default LoginPage
