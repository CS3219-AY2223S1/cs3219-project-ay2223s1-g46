import { TextField } from "@mui/material"
import React, { useEffect, useRef, useState } from "react"
import io from "socket.io-client"
import useUser from "../hooks/useUser"

export const Chat = () => {
    
    const socket = io("http://localhost:8001/", {
        transports: ["websocket"],
    })

    const { user, saveUser, removeUser } = useUser()
	const [ state, setState ] = useState({ message: "", name: user })
	const [ chat, setChat ] = useState([])
    

	useEffect(
		() => {
			socket.on("message", ({ name, message }) => {
				setChat([ ...chat, { name, message } ])
			})
			return () => socket.disconnect()
		},
		[ chat ]
	)

	const onTextChange = (e) => {
		setState({ ...state, [e.target.name]: e.target.value })
	}

	const onMessageSubmit = (e) => {
		const { name, message } = state
		socket.emit("message", { name, message })
		e.preventDefault()
		setState({ message: "", name })
	}

	const renderChat = () => {
		return chat.map(({ name, message }, index) => (
			<div key={index}>
				<h3>
					{name}: <span>{message}</span>
				</h3>
			</div>
		))
	}

	return (
		<div className="card">
			<form onSubmit={onMessageSubmit}>
                <div className="render-chat">
                    <h1>Chat Log</h1>
                    {renderChat()}
                </div>
				<div>
					<TextField
						name="message"
						onChange={(e) => onTextChange(e)}
						value={state.message}
						id="outlined-multiline-static"
						variant="outlined"
						label="Message"
					/>
				</div>
				<button>Send Message</button>
			</form>
		</div>
	)
}

