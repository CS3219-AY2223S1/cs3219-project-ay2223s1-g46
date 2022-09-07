import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { ThemeProvider } from "@mui/system"
import theme from "./theme"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
)

// ReactDOM.render(
//     <React.StrictMode>
//         <BrowserRouter>
//             <App/>
//         </BrowserRouter>
//     </React.StrictMode>,
//     document.getElementById("root")
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
