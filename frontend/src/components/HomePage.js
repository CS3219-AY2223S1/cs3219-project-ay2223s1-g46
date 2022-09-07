import React from 'react'
import './css/Homepage.css'

const HomePage = () => {
  return (
    <div className="Home">
      <img className="peerImage" src="/peer.jpg" />
      <div className="container">
        <h1 className="mainText">
          A platform for people to collaborately code and prepare for technical
          assessments
        </h1>
      </div>
    </div>
  )
}

export default HomePage
