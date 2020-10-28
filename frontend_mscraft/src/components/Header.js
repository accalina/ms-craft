
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
                <img className="navbar-brand" src="https://vignette.wikia.nocookie.net/metalslug/images/6/6e/Slugflyer.gif/revision/latest?cb=20090109140542"></img>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link className="nav-link nes-btn is-primary buttonspace" to="/Dashboard">Dashboard</Link>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link nes-btn is-success buttonspace" to="/profile">Profile</Link>
                        </li>
                        <li className="nav-item active">
                            <button type="button" className="nav-link nes-btn is-error buttonspace" onClick={()=>logout()}>Logout</button>
                        </li>
                    </ul>
                    
                <img style={{marginLeft:"35px"}} className="navbar-brand" src="https://vignette.wikia.nocookie.net/metalslug/images/f/ff/Slug_Car.gif/revision/latest?cb=20090415091436"></img>
                </div>
            </nav>
        </div>
)}