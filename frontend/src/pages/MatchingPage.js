import React, {useState, useEffect} from "react"
import Timer from "../components/Timer"
import "../components/css/MatchingPage.css"
import io from "socket.io-client"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Box } from "@mui/material"
import useUser from "../hooks/useUser"

const MatchingPage = () => {
  
let navigate = useNavigate()
const [isTimeout, setTimeout] = useState(false)
const { user, saveUser, removeUser } = useUser()
const {difficulty} = useParams()

const socket = io("http://localhost:8001/", {
  transports: ["websocket"],
})

// change to user after logging in
useEffect(() => {
  console.log(difficulty);
  socket.emit("match", user, difficulty) 
}, []);

socket.on("match_user", () => {
  navigate("../editor")
})

socket.on("matchFail", () => {
  setTimeout(true)
})

const rematch = () => {
  navigate("../matching");
}

  return (
    <div className="Matching">
      {isTimeout ? 
      <h2 className="waitingText">
        There are no available matches currently
      </h2> 
      : <h2 className="waitingText">
        Please wait while we attempt to find a match for you
      </h2>
      }
      {isTimeout ?
        <Box display={"flex"} flexDirection={"column"}  justifyContent="center" alignItems="center"marginTop={2}>
          <Button
            sx={{ width: 200}}
            className="button"
            variant={"contained"}
            onClick={rematch}
          >
            Rematch
          </Button>
        </Box>
      : <Timer classsName="timer" />
      }
    </div>
  )
}

export default MatchingPage
