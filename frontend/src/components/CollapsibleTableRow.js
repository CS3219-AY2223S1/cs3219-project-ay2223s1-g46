import { KeyboardArrowDown, KeyboardArrowRight } from "@mui/icons-material"
import { Box, Collapse, IconButton, TableCell, TableRow } from "@mui/material"
import { Fragment, useState } from "react"

const CollapsibleTableRow = ({ row }) => {
  const [open, setOpen] = useState(false)

  return (
    <Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="center">{row.topic}</TableCell>
        <TableCell align="center">{row.difficulty}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>{row.text}</Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  )
}

export default CollapsibleTableRow
