import {React, useState, useEffect, useContext} from "react"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import { SocketContext } from "../socket"

export default function QuestionCard() {
  const [ topic, setTopic ] = useState("")
  const [ difficulty, setDifficulty ] = useState("")
  const [ text, setText ] = useState("")
  const [ name, setName ] = useState("")  
  const socket = useContext(SocketContext)
  
  useEffect(() => {
    socket.on('question', (question) => {
      setTopic(question.topic)
      setName(question.name)
      setDifficulty(question.difficulty)
      setText(question.text)
    })
    console.log(topic)
    console.log(text)
    return () => {
      socket.off('question')
    }
  }, [])

  return (
    <Card
      variant="outlined"
    //   style={{ backgroundColor: '#1d1e2c' }}
    style={{ backgroundColor: '#f7ebec' }}
    >
      <CardContent className="title">
        <Typography align="center" sx={{ fontSize: 24 }} color="black">
          Topic: {topic}  &nbsp;  Difficulty: {difficulty}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography align="center" sx={{ fontSize: 24 }} color="black">
          {name}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography align="center" sx={{ fontSize: 18 }} color="black">
          {text}
        </Typography>
      </CardContent>
    </Card>
  )
}
