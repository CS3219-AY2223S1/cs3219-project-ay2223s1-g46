import {React} from "react"
import { useNavigate } from "react-router-dom"
import { Button, Box} from "@mui/material"
import { CodeEditor } from "../components/CodeEditor"
import { Chat } from "../components/Chat"
import "../components/css/EditorPage.css"
import QuestionCard from "../components/QuestionCard"

function EditorPage() {
  let navigate = useNavigate()

  const leaveRoom = () => {
    navigate("../");
  }
  
  return (
    <div className="Editor">
      <Box
      display="flex" 
      flexDirection= 'row'
      justifyContent='space-around'
      alignitems='center'
      >
        <Box
          display="flex" 
          flexDirection= 'column'
          width = '60%' 
        > 
          <QuestionCard/>
          <CodeEditor/>
          <Button
            variant={"contained"}
            onClick={leaveRoom}
            width = '80%'
            disableElevation
          >
            Leave Room
          </Button>
        </Box>
        <Box
        display="flex"
        alignItems="flex-end"
        justifyContent="flex-end">
          <Chat/>
        </Box>
      </Box>
    </div>
  )
}

export default EditorPage
