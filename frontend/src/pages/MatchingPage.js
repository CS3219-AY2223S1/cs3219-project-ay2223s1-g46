import React, { useState, useEffect, useContext } from "react"
import Timer from "../components/Timer"
import "../components/css/MatchingPage.css"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Box } from "@mui/material"
import useUser from "../hooks/useUser"
import { SocketContext } from "../socket"

const MatchingPage = () => {
  let navigate = useNavigate()
  const socket = useContext(SocketContext)
  const [isTimeout, setTimeout] = useState(false)
  const { user, saveUser, removeUser } = useUser()
  const { difficulty, topic } = useParams()

  // const socket = io("http://localhost:8002/", {
  //   transports: ["websocket"],
  // })

  // change to user after logging in
  useEffect(() => {
    console.log(difficulty)
    console.log(topic)
    console.log(user.username)
    console.log(socket)
    let parsedTopic = topic
    if (topic === "Dynamic Programming") {
      parsedTopic = "DP"
    }
    socket.emit("match", user.username, difficulty, parsedTopic)

    socket.on("match_user", () => {
      navigate("../editor")
    })

    socket.on("matchFail", () => {
      setTimeout(true)
    })
    return () => {
      socket.off("match_user")
      socket.off("matchFail")
    }
  }, [])

  const rematch = () => {
    navigate("../problems")
  }

  return (
    <div className="Matching">
      {isTimeout ? (
        <h2 className="waitingText">
          There are no available matches currently
        </h2>
      ) : (
        <h2 className="waitingText">
          Please wait while we attempt to find a match for you
        </h2>
      )}
      {isTimeout ? (
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent="center"
          alignItems="center"
          marginTop={2}
        >
          <Button
            sx={{ width: 200 }}
            className="button-matching"
            variant={"contained"}
            onClick={rematch}
          >
            Rematch
          </Button>
        </Box>
      ) : (
        <Timer classsName="timer" />
      )}
    </div>
  )
}

export default MatchingPage
