import { createTheme } from "@mui/material/styles"

const theme = createTheme({
  palette: {
    primary: {
      light: "#8afcf2",
      main: "#54c9bf",
      dark: "#05988f",
      contrastText: "#000000",
    },
    secondary: {
      light: "#ff848b",
      main: "#c9545e",
      dark: "#ff848b",
      contrastText: "#000000",
    },
  },
})

export default theme
