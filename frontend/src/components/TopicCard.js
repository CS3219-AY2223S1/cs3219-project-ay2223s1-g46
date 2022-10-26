import * as React from "react"
import CardMedia from "@mui/material/CardMedia"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import CodeIcon from "@mui/icons-material/Code"
import { useNavigate } from "react-router-dom"
import "./css/ProblemCard.css"

export default function TopicCard({ topic, color, image, text, difficulty }) {
  let navigate = useNavigate()

  const matchTopic = () => {
    navigate("../matching/" + difficulty.toLowerCase() + "/" + topic.toLowerCase())
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
