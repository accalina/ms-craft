
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/Header'
import "./Dashboard.css"
import axios from "axios";
import Cookie from "js-cookie";

export default function Dashboard(props){
    const [username, setUsername] = useState("")

    useEffect(() => {
        // setUsername(window.sessionStorage.getItem("username"))
        if (Cookie.get('at')){
            document.getElementsByTagName('body')[0].className = "dashboardBackground"
            axios.get('http://mscraft_backend:8000/api/v1/profile', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Cookie.get("at"),
                }
            })
            .then(function (response) {
                Cookie.set("userid", response.data[0].id)
                Cookie.set("username", response.data[0].user.username)
                Cookie.set("cash", response.data[0].cash)
                console.clear()
            })
            .catch(function (error) {
                console.log(error);
            });
            setUsername(Cookie.get('username')   )
        }else{
            props.history.push({pathname: '/login'})
        }
    },[])

    return (
        <>
            <Header/>
            <div className="retro col-sm-6 offset-sm-3" >
                <section className="dashboardBody nes-container with-title pull-left">
                    <h3 className="title">Texts</h3>
                    <h3>{username} (${Cookie.get('cash')})</h3>
                    <hr/>
                    <Link to="/member" className="nes-btn is-primary showcode">Members</Link> <hr/>
                    <Link to="/market" className="nes-btn is-success showcode">Market</Link> <hr/>
                    <Link to="/equipment" className="nes-btn is-warning showcode">Equipment</Link> <hr/>
                    <Link to="/operation" className="nes-btn is-error showcode">Operation</Link> <hr/>
                </section>
            </div>
        </>
    )
}