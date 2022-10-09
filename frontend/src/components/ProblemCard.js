import * as React from 'react';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CodeIcon from  '@mui/icons-material/Code';
import {useNavigate} from "react-router-dom";
import './css/ProblemCard.css';
import io from 'socket.io-client'

export default function ProblemCard({difficulty,color,image,text}) {
  let navigate = useNavigate();
  
  const matchDifficulty = () => {
    navigate("../matching/" + difficulty.toLowerCase());
  }

  return (
    <Card
      variant="outlined"
      sx={{ height: 450, width: 400 }}
      style={{ backgroundColor: `${color}` }}
    >
      <CardContent className="title">
        <Typography align="center" sx={{ fontSize: 20 }} color="black">
          {difficulty}
        </Typography>
      </CardContent>
      <CardMedia className="image" component="img" image={image} />
      <CardContent sx={{ height: 60, width: 380 }}>
        <Typography align="center" sx={{ fontSize: 20 }} color="black">
          {text}
        </Typography>
      </CardContent>
      <CardActions style={{ justifyContent: "center" }}>
        <Button
          className="button"
          variant="contained"
          endIcon={<CodeIcon />}
          size="medium"
          onClick={matchDifficulty}
        >
          Match
        </Button>
      </CardActions>
    </Card>
  )
}
