import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CodeIcon from  '@mui/icons-material/Code';
import {useNavigate} from "react-router-dom";

export default function ProblemCard({difficulty,color}) {
  let navigate = useNavigate();
  
  const matchDifficulty = () => {
    let path = `matching`;
    navigate(path);
  }

  return (
        <Card variant='outlined' sx={{ minWidth: 200 }} style={{backgroundColor: `${color}`}}>
        <CardContent>
            <Typography align="center" sx={{ fontSize: 20 }} color="black">
            {difficulty}
            </Typography>
        </CardContent>
        <CardActions sx={{margin:4}}>
            <Button variant="contained" endIcon ={<CodeIcon/>}size="medium" onClick={matchDifficulty}>Match</Button>
        </CardActions>
        </Card>
  );
}
