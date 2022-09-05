import {
   Grid
} from "@mui/material";
import ProblemCard from "./ProblemCard";

function ProblemPage() {
    return (
        <Grid 
            direction = 'row'
            alignItems = 'center'
            justifyContent = "flex"
            container spacing = {5}
        >
            <Grid item xs = {3} md = {3}>
                <ProblemCard difficulty = "Easy" color = "green"/>
            </Grid>
            <Grid item xs = {3} md = {3}> 
                <ProblemCard difficulty = "Medium" color= "yellow"/>
            </Grid>
            <Grid item xs = {3} md = {3}>
                <ProblemCard difficulty = "Hard" color = "red"/>
            </Grid>
        </Grid>
    )
}

export default ProblemPage;
