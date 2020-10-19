
import React from 'react'
import {
    Link
} from 'react-router-dom'

import Cookie from "js-cookie";

export default function Header(props){

    function logout() {
        Object.keys(Cookie.get()).forEach(function(cookieName) {
            var neededAttributes = {
              // Here you pass the same attributes that were used when the cookie was created
              // and are required when removing the cookie
            };
            Cookie.remove(cookieName, neededAttributes);
        });
        document.location.href = '/login'
    }

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
                            <button type="button" className="nav-link nes-btn is-error" onClick={()=>logout()}>Logout</button>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
)}