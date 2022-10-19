import { Box, Grid } from "@mui/material"
import ProblemCard from "../components/ProblemCard"
import "../components/css/ProblemPage.css"

function ProblemPage() {
  return (
    <Box
      display={"flex"}
      flexDirection={{ sm: "column", lg: "row" }}
      gap={15}
      margin={20}
      justifyContent="center"
      alignItems={"center"}
    >
      <ProblemCard
        difficulty="Easy"
        color="#58b368"
        text="Perfect for beginners to start with"
        image="/easy.jpg"
      />
      <ProblemCard
        difficulty="Medium"
        color="#fb7756"
        text="Intermediate questions that require some understanding of coding concepts"
        image="/medium.jpg"
      />
      <ProblemCard
        difficulty="Hard"
        color="#1f306e"
        text="Complex questions that require in-depth knowledge of coding concepts"
        image="/hard.jpg"
      />
    </Box>
  )
}

export default ProblemPage
