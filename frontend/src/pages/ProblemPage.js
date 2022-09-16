import { Grid } from "@mui/material"
import ProblemCard from "../components/ProblemCard"
import "../components/css/ProblemPage.css"

function ProblemPage() {
  return (
    <Grid
      className="grid"
      container
      spacing={60}
      justify="center"
      paddingTop={20}
      paddingLeft={30}
      flexDirection="row"
    >
      <Grid className="easy" item xs={3} md={3} justify="center">
        <ProblemCard
          username="jacob"
          difficulty="Easy"
          color="#58b368"
          text="Perfect for beginners to start with"
          image="/easy.jpg"
        />
      </Grid>
      <Grid className="medium" item xs={3} md={3} justify="center">
        <ProblemCard
          username="jacob"
          difficulty="Medium"
          color="#fb7756"
          text="Intermediate questions that require some understanding of coding concepts"
          image="/medium.jpg"
        />
      </Grid>
      <Grid className="hard" item xs={3} md={3} justify="center">
        <ProblemCard
          username="jacob"
          difficulty="Hard"
          color="#1f306e"
          text="Complex questions that require in-depth knowledge of coding concepts"
          image="/hard.jpg"
        />
      </Grid>
    </Grid>
  )
}

export default ProblemPage
