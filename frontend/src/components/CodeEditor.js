import { TextField } from "@mui/material"

export const CodeEditor = () => {
  return (
    <TextField
      id="outlined-basic" 
      multiline
      rows = {15}
      label="Code Here" 
      variant="outlined"
      className="editor"
    ></TextField>
  );
};