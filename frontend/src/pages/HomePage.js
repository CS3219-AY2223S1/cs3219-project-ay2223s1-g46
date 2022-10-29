import { Button, Divider, Typography } from "@mui/material"
import { Box } from "@mui/system"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import HistoryCard from "../components/HistoryCard"
import { URL_HISTORY_SVC } from "../configs"

const HomePage = () => {
  const [matches, setMatches] = useState([])

  useEffect(() => {
    console.log("home page effect")
    axios
      .get(URL_HISTORY_SVC)
      .then((response) => {
        setMatches(response.data.userHistory)
        console.log(response.data.userHistory)
      })
      .catch((error) => {
        console.log("error :>> ", error)
      })
  }, [])

  return (
    <Box>
      <Box
        display={"flex"}
        flexDirection="column"
        justifyContent={"center"}
        alignItems="center"
        marginX={4}
        marginY={8}
        gap={6}
      >
        <Typography variant="h4">Welcome to your dashboard!</Typography>
        <NavLink
          to={"/problems"}
          style={{ textDecoration: "none", color: "black" }}
        >
          <Button variant="contained">START PRACTICING</Button>
        </NavLink>
      </Box>
      <Box marginX={{ sm: 6, md: 30 }}>
        <Divider variant="middle"></Divider>
      </Box>
      <Box
        display={"flex"}
        flexDirection="column"
        justifyContent={"center"}
        alignItems="center"
        marginX={4}
        marginY={6}
        gap={4}
      >
        <Typography variant="h5">YOUR HISTORY</Typography>
        <Box
          display={"flex"}
          flexDirection="column"
          justifyContent={"center"}
          alignItems="center"
          gap={4}
        >
          {matches.map((match) => (
            <HistoryCard
              key={match.id}
              chatHistory={match.chatHistory}
              codeHistory={match.codeHistory}
              date={match.finishDate}
              partnerUsername={match.partnerUsername}
              questionName={match.question.name}
              questionText={match.question.text}
              questionDifficulty={match.question.difficulty}
              questionTopic={match.question.topic}
            ></HistoryCard>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default HomePage
