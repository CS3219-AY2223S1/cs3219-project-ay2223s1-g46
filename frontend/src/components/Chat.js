import { TextField,Button,Grid,Paper,ListItem,ListItemText, List } from "@mui/material"
import React, { useEffect, useState, useContext} from "react"
import SendIcon from '@mui/icons-material/Send';
import io from "socket.io-client"
import useUser from "../hooks/useUser"
import { SocketContext } from "../socket";

export const Chat = () => {
    let socket = useContext(SocketContext)
    const { user} = useUser()
	const [ state, setState ] = useState({ message: "", name: user.username })
	const [ chat, setChat ] = useState([])
    

	useEffect(
		() => {
			socket.on("message", ({ name, message }) => {
				setChat([ ...chat, { name, message } ])
			})
		},
		[chat]
	)

	const onTextChange = (e) => {
		setState({ ...state, [e.target.name]: e.target.value })
	}

	const onMessageSubmit = (e) => {
		const { name, message } = state
		console.log("socket.connected")
		if (message !== "") {
			console.log(socket.connected)
			socket.emit("message", { name, message })
			e.preventDefault()
			setState({ message: "", name })
		}
	}

	const renderChat = () => {
		return chat.map(({ name, message }, index) => (
			<ListItem key={index}>
				<ListItemText>
					{name}: <span>{message}</span>
				</ListItemText>
			</ListItem>
		))
	}

	return (
		<div className="chat">
			<h1>Chat Log</h1>
			<Paper style={{height: 300, overflow: 'auto', display: 'flex', flexDirection:'column-reverse'}} >
				<List className="render-chat" alignItems='column'>
					{renderChat()}
				</List>
			</Paper>
			<Grid container>
				<Grid item>
					<TextField
						name="message"
						onChange={(e) => onTextChange(e)}
						value={state.message}
						id="outlined-multiline-static"
						variant="outlined"
						label="Message"
						onKeyPress={(e) => {
							if (e.key === 'Enter') {
								const { name, message } = state
								if (message !== "") {
									socket.emit("message", { name, message })
									e.preventDefault()
									setState({ message: "", name })
								}						
							}
						  }}
					/>	
				</Grid>	
				<Grid item alignItems="stretch" style={{ display: "flex" }}>			
					<Button
						variant="contained"
						aria-label='send'
						onClick={onMessageSubmit}
						>
						<SendIcon fontSize="inherit" />
					</Button>
				</Grid>
			</Grid>	
		</div>
	)
}

