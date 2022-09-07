import React from "react"
import Timer from "./Timer"
import "./css/MatchingPage.css"

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
