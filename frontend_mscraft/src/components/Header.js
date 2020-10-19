
import React from 'react'
import {
    Link
} from 'react-router-dom'


export default function Header(){
    return(
        <div className="col-sm-4 offset-sm-4" >
            <nav className="navbar navbar-expand-lg navbar-light" style={{borderRadius:"10px", backgroundColor: "rgb(255, 255, 255, 0.70)" }}>
                <b className="navbar-brand" href="#">Navbar</b>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/Dashboard">Dashboard</Link>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link" to="/App">Profile</Link>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link" to="/app">Logout</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
)}