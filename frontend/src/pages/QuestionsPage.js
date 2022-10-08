import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material"
import { Box } from "@mui/system"
import AddIcon from "@mui/icons-material/Add"
import { useEffect, useState } from "react"
import axios from "axios"
import { URL_QUESTION_SVC } from "../configs"
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions"
import CollapsibleTableRow from "../components/CollapsibleTableRow"

const QuestionsPage = () => {
  const [questions, setQuestions] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - questions.length) : 0

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  //   useEffect(() => {
  //     console.log("questions page effect")
  //     axios.get(URL_QUESTION_SVC).then((response) => {
  //       setQuestions(response.data.questions)
  //     })
  //   }, [])

  const handleAddQuestion = (e) => {
    e.preventDefault()
  }
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      minHeight="100vh"
      alignItems={"center"}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyItems={"center"}
        paddingY={4}
        paddingX={8}
        width={{ md: "1000px" }}
      >
        <Box marginY={8}>
          <Typography variant="h3">Questions</Typography>
        </Box>
        <Box marginBottom={4}>
          <Button
            variant="contained"
            startIcon={<AddIcon></AddIcon>}
            disableElevation
          >
            Add Question
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell>Question</TableCell>
                <TableCell style={{ maxWidth: 10 }}>Category</TableCell>
                <TableCell style={{ maxWidth: 10 }}>Difficulty</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? questions.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : questions
              ).map((row) => (
                <CollapsibleTableRow
                  key={row.name}
                  row={row}
                ></CollapsibleTableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 50, { label: "All", value: -1 }]}
                  colSpan={3}
                  count={questions.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}

export default QuestionsPage
