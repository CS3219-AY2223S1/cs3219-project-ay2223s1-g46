import {
  ExpandMoreOutlined,
  PeopleAlt,
  TopicRounded,
  TuneRounded,
} from "@mui/icons-material"
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Collapse,
  IconButton,
  styled,
  TextField,
} from "@mui/material"
import { Box } from "@mui/system"
import { useState } from "react"

const ExpandMore = styled((props) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  margin: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}))

const HistoryCard = ({
  chatHistory,
  codeHistory,
  date,
  partnerUsername,
  questionName,
  questionText,
  questionDifficulty,
  questionTopic,
}) => {
  const [expanded, setExpanded] = useState(false)

  // https://dockyard.com/blog/2020/02/14/you-probably-don-t-need-moment-js-anymore
  const formattedDate = new Date(date)
  const day = Intl.DateTimeFormat(navigator.language, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(formattedDate)
  //   const time = Intl.DateTimeFormat(navigator.language, {
  //     hour: "numeric",
  //     minute: "numeric",
  //     hour12: true,
  //   }).format(formattedDate)

  const formatCodeHistory = () => {
    let code = codeHistory.replaceAll("\\n", "\n")
    code = code.replaceAll("\\t", "\t")
    code = code.replaceAll("\\", "")
    code = code.replaceAll("    ", "\t")
    return code.slice(1, -1)
  }

  const formattedCodeHistory = formatCodeHistory()

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Card sx={{ width: { sm: 600, md: 1000 } }}>
      <CardHeader
        title={day}
        subheader={`Question: ${questionName}`}
      ></CardHeader>
      <CardContent>
        <Box display="flex" justifyContent={"space-around"}>
          <Chip
            icon={<PeopleAlt></PeopleAlt>}
            label={partnerUsername}
            variant="outlined"
          ></Chip>
          <Chip
            icon={<TopicRounded></TopicRounded>}
            label={questionTopic}
            variant="outlined"
          ></Chip>
          <Chip
            icon={<TuneRounded></TuneRounded>}
            label={questionDifficulty}
            variant="outlined"
          ></Chip>
        </Box>
      </CardContent>
      <CardActions>
        <ExpandMore expand={expanded} onClick={handleExpandClick}>
          <ExpandMoreOutlined></ExpandMoreOutlined>
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Box padding={2} bgcolor="#DAF3F1" borderRadius={2}>
            {questionText}
          </Box>
          <Box paddingY={2}>
            {/* TODO: check data type */}
            <code>
              <TextField
                fullWidth
                value={formattedCodeHistory}
                multiline
                readOnly
              ></TextField>
            </code>
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default HistoryCard
