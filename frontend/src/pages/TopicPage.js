import { Box} from "@mui/material"
import { useParams } from "react-router-dom"
import TopicCard from "../components/TopicCard"


function TopicPage() {
  const {difficulty} = useParams()
  console.log(difficulty)
  return (
    <Box
      display={"flex"}
      flexDirection={{ sm: "column", lg: "row" }}
      gap={15}
      margin={20}
      justifyContent="center"
      alignItems={"center"}
    >
      <TopicCard
        topic="Graph"
        color="#ed6a5a"
        image="/graph.png"
        difficulty = {difficulty}
      />
      <TopicCard
        topic="Array"
        color="#f4f1bb"
        image="/array.png"
        difficulty = {difficulty}
      />
      <TopicCard
        topic="String"
        color="#9bc1bc"
        image="/string.png"
        difficulty = {difficulty}
      />
       <TopicCard
        topic="Dynamic Programming"
        color="#5ca4a9"
        image="/dynamic_programming.png"
        difficulty = {difficulty}
      />
      <TopicCard
        topic="Others"
        color="#e6ebe0"
        image="/others.png"
        difficulty = {difficulty}
      />
    </Box>
  )
}

export default TopicPage
