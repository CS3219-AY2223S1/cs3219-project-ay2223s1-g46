import React from "react"
import Timer from "./Timer"
import "./css/MatchingPage.css"
import io from 'socket.io-client'
import {useNavigate} from "react-router-dom";

let navigate = useNavigate();


const socket = io('http://localhost:8001/', {
    transports: ['websocket'],
})

socket.emit("match",  "jacob" , "Easy")

socket.on("match_user", () => {
    navigate("../editor");
});
     

const MatchingPage = () => {
  return (
    <div className="Matching">
      <h2 className="waitingText">
        Please wait while we attempt to find a match for you
      </h2>
      <Timer classsName="timer" />
    </div>
  )
}

export default MatchingPage
