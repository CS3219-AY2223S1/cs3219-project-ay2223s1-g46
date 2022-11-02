import {React,useContext,useEffect} from "react"
import CardMedia from "@mui/material/CardMedia"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import CodeIcon from "@mui/icons-material/Code"
import { useNavigate } from "react-router-dom"
import "./css/ProblemCard.css"
import { SocketContext } from "../socket"

export default function TopicCard({ topic, color, image, difficulty }) {
  let navigate = useNavigate()
  let socket = useContext(SocketContext)
  const matchTopic = () => {
    socket.on("connect", () => {
      console.log("Room Id: ", socket?.id);
    });

    navigate("../matching/" + difficulty + "/" + topic)
    
    return() => {
      socket.off("connect")
    }
  }

  return (
    <Card
      variant="outlined"
      sx={{ height: 400, width: 400 }}
      style={{ backgroundColor: `${color}` }}
    >
      <CardContent className="title">
        <Typography align="center" sx={{ fontSize: 18 }} color="black">
          {topic}
        </Typography>
      </CardContent>
      <CardMedia className="image" component="img" image={image} />
      <CardActions style={{ justifyContent: "center" }}>
        <Button
          variant="contained"
          endIcon={<CodeIcon />}
          size="medium"
          onClick={matchTopic}
        >
          Match
        </Button>
      </CardActions>
    </Card>
  )
}
