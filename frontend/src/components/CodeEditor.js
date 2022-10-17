import { TextField } from "@mui/material"
import React, { useEffect, useRef, useState } from "react"
import io from "socket.io-client"
import useUser from "../hooks/useUser"

export const CodeEditor = () => {
  const socket = io("http://localhost:8001/", {
    transports: ["websocket"],
})

const { user, saveUser, removeUser } = useUser()
const [ state, setState ] = useState({code: ""})
const [ code, setCode ] = useState("")


useEffect(
  () => {
    socket.on("code", (code1) => {
      console.log(code1.code)
      setCode(code1.code)
    })
    return () => socket.disconnect()
  },
  [ code ]
)

const onCodeChange = (e) => {
  //console.log(e.target.value)
  await setCode(e.target.value )
  console.log(code)
  socket.emit("code", code)
}

const onMessageSubmit = (e) => {
const { code } = state
socket.emit("code", code)
e.preventDefault()
setState(code)
}

const renderCode = () => {
  return code
}

  return (
    <TextField
      id="outlined-basic" 
      multiline
      rows = {15}
      label="Code Here" 
      variant="outlined"
      className="editor"
      value = {code}
      onChange={(e) => onCodeChange(e)}
    ></TextField>
  );
};