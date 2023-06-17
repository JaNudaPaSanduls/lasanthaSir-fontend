import React from 'react';
import NavBar from '../navbar/NavBar';

const Settings = () => {
  const Logout = () => {
    localStorage.removeItem("Authorization");
    localStorage.removeItem("id");
    localStorage.removeItem("User");
    localStorage.removeItem("Admin");
    window.location = '/';
  }
  return (
    <div className="container">
        <div className="navbar">
            <NavBar />
        </div>
        <div className="bg" />
        <p className="button" style={{ backdropFilter: "none", background: "none", border: "0px", marginTop: "-100px", fontFamily: "poppins", fontSize: "35px" }}>Settings</p>
        <div className="copy">
            Developed By <br/>
            J a N u d a
        </div>
        <button className={`${(localStorage.getItem("Admin")) ? "" : "hide"} button`} style={{ backgroundColor: "#800000", marginTop: "-20px"}}>Upgrade Students</button>
        <button className='button' style={{ backgroundColor: "rgba(0, 10, 0, 0.5)", marginTop: "50px", padding: "10px" }}
        onClick={() => Logout}>Logout</button>
    </div>
  )
}

export default Settings;