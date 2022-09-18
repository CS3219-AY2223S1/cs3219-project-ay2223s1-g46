import React from "react"
import { useNavigate } from "react-router-dom"
import { Button} from "@mui/material"
import { CodeEditor } from "../components/CodeEditor"
import io from "socket.io-client"
import "../components/css/EditorPage.css"

function EditorPage() {

  let navigate = useNavigate()

  const leaveRoom = () => {
    const socket = io('http://localhost:8001/', {
      transports: ['websocket'],
    })
    navigate("../");
  }

  return (
    <div className="Editor">
      <CodeEditor className="code" />
        <Button
          variant={"contained"}
          onClick={leaveRoom}
          disableElevation
        >
          Leave Room
        </Button>
    </div>
  )
}

export default EditorPage
