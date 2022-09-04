import {
   Grid
} from "@mui/material";
import ProblemCard from "./ProblemCard";

function ProblemPage() {
    return (
        <Grid 
            direction = 'column'
            alignItems = 'center'
            justifyContent = "flex"
            container spacing = {10}
        >
            <Grid item xs = {5} md = {5}>
                <ProblemCard difficulty = "Easy" color = "green"/>
            </Grid>
            <Grid item xs = {5} md = {5}> 
                <ProblemCard difficulty = "Medium" color= "yellow"/>
            </Grid>
            <Grid item xs = {5} md = {5}>
                <ProblemCard difficulty = "Hard" color = "red"/>
            </Grid>
        </Grid>
    )
}

export default ProblemPage;
