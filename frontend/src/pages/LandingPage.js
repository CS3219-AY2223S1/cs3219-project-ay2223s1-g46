import React from "react"
import "../components/css/LandingPage.css"

const LandingPage = () => {
  return (
    <div className="Home">
      <img
        className="peerImage"
        alt="Peers helping each other"
        src="/peer.jpg"
      />
      <div className="container">
        <h1 className="mainText">
          A platform for people to collaborately code and prepare for technical
          assessments
        </h1>
      </div>
    </div>
  )
}

export default LandingPage
