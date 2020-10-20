
import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'
import "./Profile.css"
import axios from "axios";
import Cookie from "js-cookie";

export default function Profile(props){
    const [username, setUsername] = useState("")
    const [profiledata, setProfiledata] = useState({"user": {"email": "", "last_login": "", "date_join": ""}})

    useEffect(() => {
        // setUsername(window.sessionStorage.getItem("username"))
        if (Cookie.get('at')){
            document.getElementsByTagName('body')[0].className = "profileBackground"
            axios.get('http://mscraft_backend:8000/api/v1/profile', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Cookie.get("at"),
                }
            })
            .then(function (response) {
                console.log(response.data[0])
                setProfiledata(response.data[0])
                console.clear()
            })
            .catch(function (error) {
                if(error.response.status === 401){
                    Object.keys(Cookie.get()).forEach(function(cookieName) { Cookie.remove(cookieName) });
                    props.history.push({pathname: '/login'})
                }
                console.log(error);
            });
        }else{
            props.history.push({pathname: '/login'})
        }
    },[])

    return (
        <>
            <Header/>
            <div className="retro col-sm-6 offset-sm-3" >
                <section className="profileBody nes-container with-title pull-left">
                    <h3 className="title">Texts</h3>
                    <h3>Username: {profiledata.user.username} </h3>
                    <hr/>
                    <h3>Cash: ${profiledata.cash}</h3>
                    <hr/>
                    <h3>Email: {profiledata.user.email}</h3>
                    <hr/>
                    <h3>Last Login: {profiledata.user.last_login}</h3>
                    <hr/>
                    <h3>Date Join: {profiledata.joindate}</h3>
                </section>
            </div>
        </>
    )
}