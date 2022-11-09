import {
  Alert,
  AlertTitle,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material"
import { Box } from "@mui/system"
import AddIcon from "@mui/icons-material/Add"
import { useEffect, useState } from "react"
import axios from "axios"
import { URL_QUESTION_SVC } from "../configs"
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions"
import CollapsibleTableRow from "../components/CollapsibleTableRow"
import {
  STATUS_CODE_CONFLICT,
  STATUS_CODE_CREATED,
  STATUS_CODE_INTERAL_ERROR,
  STATUS_CODE_INVALID,
  STATUS_CODE_UNAUTHORIZED,
} from "../constants"

const QuestionsPage = () => {
  // if dynamic programming, should send 'DP to backend
  const TOPICS = ["Graph", "Array", "String", "Dynamic Programming", "Others"]
  const DIFFICULTY = ["Easy", "Medium", "Hard"]

  const [questions, setQuestions] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [questionName, setQuestionName] = useState("")
  const [questionDetails, setQuestionDetails] = useState("")
  const [topic, setTopic] = useState("")
  const [difficulty, setDifficulty] = useState("")

  const [openDialog, setOpenDialog] = useState(false)

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
  const [snackbarTitle, setSnackbarTitle] = useState("")
  const [snackbarMsg, setSnackbarMsg] = useState("")
  const [isSuccessSnackbarOpen, setIsSuccessSnackbarOpen] = useState(false)
  const [successSnackbarTitle, setSuccessSnackbarTitle] = useState("")
  const [successSnackbarMsg, setSuccessSnackbarMsg] = useState("")

  useEffect(() => {
    console.log("questions page effect")
    axios
      .get(URL_QUESTION_SVC)
      .then((response) => {
        setQuestions(response.data.questions)
      })
      .catch((error) => {
        console.log("error :>> ", error)
      })
  }, [])

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - questions.length) : 0

  const handleChangePage = (e, newPage) => {
    e.preventDefault()
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleChange = (e, setField) => {
    e.preventDefault()
    setField(e.target.value)
  }

  const handleAddQuestion = () => {
    setOpenDialog(true)
  }

  const handleClose = () => {
    setOpenDialog(false)
    setDifficulty("")
    setQuestionDetails("")
    setQuestionName("")
    setTopic("")
  }

  const setErrorSnackbar = (title, msg) => {
    setIsSnackbarOpen(true)
    setSnackbarTitle(title)
    setSnackbarMsg(msg)
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return
    }
    setIsSnackbarOpen(false)
  }

  const setSuccessSnackbar = (title, msg) => {
    setIsSuccessSnackbarOpen(true)
    setSuccessSnackbarTitle(title)
    setSuccessSnackbarMsg(msg)
  }

  const handleCloseSuccessSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return
    }
    setIsSuccessSnackbarOpen(false)
  }

  const handleCreate = async (e) => {
    e.preventDefault()

    if (!questionName || !questionDetails || !topic || !difficulty) {
      setErrorSnackbar(
        "Missing Field(s)",
        "Please fill in all of the fields above."
      )
      return
    }

    let parsedTopic = topic
    if (topic === "Dynamic Programming") {
      parsedTopic = "DP"
    }

    const newQuestion = {
      name: questionName,
      text: questionDetails,
      topic: parsedTopic,
      difficulty,
    }

    const res = await axios.post(URL_QUESTION_SVC, newQuestion).catch((err) => {
      setIsSnackbarOpen(true)
      if (err.response.status === STATUS_CODE_INTERAL_ERROR) {
        setErrorSnackbar("ERROR", err.response.data.message)
      } else if (err.response.status === STATUS_CODE_UNAUTHORIZED) {
        setErrorSnackbar(err.response.data.title, err.response.data.message)
      } else if (err.response.status === STATUS_CODE_CONFLICT) {
        setErrorSnackbar("ERROR", err.response.data.message)
      } else if (err.response.status === STATUS_CODE_INVALID) {
        setErrorSnackbar("ERROR", err.response.data.message)
      } else {
        setErrorSnackbar("Unknown Error", "Please try again.") //TODO: custom title?
        console.log("err.response :>> ", err.response)
      }
    })
    if (res && res.status === STATUS_CODE_CREATED) {
      const updatedQuestions = [...questions, newQuestion]
      setQuestions(updatedQuestions)
      setOpenDialog(false)
      setDifficulty("")
      setQuestionDetails("")
      setQuestionName("")
      setTopic("")
      setSuccessSnackbar(
        "SUCCESS",
        "Your question has been successfully created."
      )
    }
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
            onClick={handleAddQuestion}
            disableElevation
          >
            Add Question
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell style={{ width: 20 }}></TableCell>
                <TableCell>Question</TableCell>
                <TableCell style={{ width: 150 }} align="center">
                  Category
                </TableCell>
                <TableCell style={{ width: 80 }} align="center">
                  Difficulty
                </TableCell>
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
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
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

        <Dialog open={openDialog} onClose={handleClose}>
          <DialogTitle>Add New Question</DialogTitle>
          <DialogContent>
            <DialogContentText marginBottom={2}>
              Please fill in all fields.
            </DialogContentText>
            <Box marginBottom={2}>
              <TextField
                autoFocus
                id="question-name"
                label="Question Name"
                type="text"
                helperText="*Question names have to be unique."
                value={questionName}
                onChange={(e) => {
                  handleChange(e, setQuestionName)
                }}
                fullWidth
                required
              />
            </Box>
            <Box marginBottom={2}>
              <FormControl sx={{ marginRight: 1, width: 220 }}>
                <InputLabel id="topic-label" required>
                  Topic
                </InputLabel>
                <Select
                  labelId="topic-label"
                  value={topic}
                  onChange={(e) => {
                    handleChange(e, setTopic)
                  }}
                  input={<OutlinedInput label="Topic"></OutlinedInput>}
                >
                  {TOPICS.map((topic) => (
                    <MenuItem key={topic} value={topic}>
                      {topic}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ width: 220 }}>
                <InputLabel id="difficulty-label" required>
                  Difficulty
                </InputLabel>
                <Select
                  labelId="difficulty-label"
                  value={difficulty}
                  onChange={(e) => {
                    handleChange(e, setDifficulty)
                  }}
                  input={<OutlinedInput label="Difficulty"></OutlinedInput>}
                >
                  {DIFFICULTY.map((difficulty) => (
                    <MenuItem key={difficulty} value={difficulty}>
                      {difficulty}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box>
              <TextField
                label="Question Details"
                multiline
                rows={5}
                value={questionDetails}
                onChange={(e) => {
                  handleChange(e, setQuestionDetails)
                }}
                fullWidth
                required
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Box>
              <Button color="error" onClick={handleClose}>
                Cancel
              </Button>
            </Box>
            <Box marginRight={2}>
              <Button onClick={handleCreate} disableElevation>
                Create
              </Button>
            </Box>
          </DialogActions>
        </Dialog>

        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={isSnackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert severity="error" onClose={handleCloseSnackbar}>
            <AlertTitle>{snackbarTitle}</AlertTitle>
            {snackbarMsg}
          </Alert>
        </Snackbar>

        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={isSuccessSnackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSuccessSnackbar}
        >
          <Alert severity="success" onClose={handleCloseSuccessSnackbar}>
            <AlertTitle>{successSnackbarTitle}</AlertTitle>
            {successSnackbarMsg}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  )
}

export default QuestionsPage
