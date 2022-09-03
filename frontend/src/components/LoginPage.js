import {
  Alert,
  AlertTitle,
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  makeStyles,
  OutlinedInput,
  Snackbar,
  styled,
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
import { Link, useNavigate } from 'react-router-dom'
import { Visibility, VisibilityOff } from '@mui/icons-material'

function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [usernameMissing, setUsernameMissing] = useState(true)
  const [passwordMissing, setPasswordMissing] = useState(true)

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
  const [snackbarTitle, setSnackbarTitle] = useState('')
  const [snackbarMsg, setSnackbarMsg] = useState('')

  const navigate = useNavigate()

  const handleLogin = async () => {
    if (username === '') {
      setUsernameMissing(true)
    }

    if (password === '') {
      setPasswordMissing(true)
    }

    if (!username || !password) {
      setIsSnackbarOpen(true)
      setSnackbarTitle('Missing Field(s)')
      setSnackbarMsg('Please fill in your username and password.')
      return
    }

    const res = await axios
      .post(URL_USER_SVC, { username, password })
      .catch((err) => {
        if (err.response.status === STATUS_CODE_INVALID_USERNAME) {
          setSnackbarTitle('Invalid Username')
          setSnackbarMsg('This username does not exist!')
        } else if (err.response.status === STATUS_CODE_INVALID_PASSWORD) {
          setSnackbarTitle('Invalid Password')
          setSnackbarMsg('Password is incorrect!')
        } else {
          setSnackbarTitle('Unknown Error')
          setSnackbarMsg('Please try again.')
        }
      })
    if (res && res.status === STATUS_CODE_CREATED) {
      navigate('/') //TODO: change this
    }
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setIsSnackbarOpen(false)
  }

  const handleUsernameChange = (e) => {
    e.preventDefault()
    setUsername(e.target.value)
    if (e.target.value === '') {
      setUsernameMissing(true)
      return
    }
    setUsernameMissing(false)
  }

  const handlePasswordChange = (e) => {
    e.preventDefault()
    setPassword(e.target.value)
    if (e.target.value === '') {
      setPasswordMissing(true)
      return
    }
    setPasswordMissing(false)
  }

  return (
    <Box display={'flex'} flexDirection={'column'} width={'30%'}>
      <Typography variant={'h3'} marginBottom={'2rem'}>
        Login
      </Typography>
      <TextField
        label="Username"
        variant="outlined"
        color={usernameMissing ? 'error' : 'primary'}
        value={username}
        onChange={handleUsernameChange}
        sx={{ marginBottom: '1rem' }}
        autoFocus
        required
      />
      <FormControl sx={{ marginBottom: '2rem' }}>
        <InputLabel
          htmlFor="outlined-password-input"
          color={passwordMissing ? 'error' : 'primary'}
          required
        >
          Password
        </InputLabel>
        <OutlinedInput
          label="Password"
          color={passwordMissing ? 'error' : 'primary'}
          id="outlined-password-input"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={handlePasswordChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
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
      <Box display={'flex'} flexDirection={'row'} justifyContent={'flex-end'}>
        <Button variant={'contained'} onClick={handleLogin} disableElevation>
          Login
        </Button>
      </Box>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
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
  )
}

export default LoginPage
