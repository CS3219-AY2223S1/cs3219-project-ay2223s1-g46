import { KeyboardArrowDown } from "@mui/icons-material"
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
            {open ? <KeyboardArrowDown /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.category}</TableCell>
        <TableCell align="right">{row.difficulty}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>{row.question}</Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  )
}

export default CollapsibleTableRow
