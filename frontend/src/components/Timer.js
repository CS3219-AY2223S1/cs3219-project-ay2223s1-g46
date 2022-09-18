import React, {useState, useRef, useEffect} from "react";
import { Navigate, useNavigate } from "react-router";
import io from "socket.io-client"
import './css/Timer.css';

function Timer() {
  const intervalRef = useRef(null)
  let navigate = useNavigate()
  const [timer, setTimer] = useState("00:00:00")

  function getTimeRemaining(endTime) {
    const total = Date.parse(endTime) - Date.parse(new Date())
    const seconds = Math.floor((total / 1000) % 60)
    return {
      total,
      seconds,
    }
  }

  function startTimer(deadline) {
    let { total, seconds } = getTimeRemaining(deadline)
    if (total > 0) {
      setTimer(seconds > 9 ? seconds : "0" + seconds)
    } else {
      clearInterval(intervalRef.current)
    }
  }

  function clearTimer(endTime) {
    setTimer("30")
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    const id = setInterval(() => {
      startTimer(endTime)
      if (endTime.getTime() <= Date.now()) {
        //Todo if time runs out
      }
    }, 1000)
    intervalRef.current = id
  }

  function getDeadlineTime() {
    let deadline = new Date()
    deadline.setSeconds(deadline.getSeconds() + 30)
    return deadline
  }

  useEffect(() => {
    clearTimer(getDeadlineTime())
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return <div className="timer">{timer}</div>
}

export default Timer
