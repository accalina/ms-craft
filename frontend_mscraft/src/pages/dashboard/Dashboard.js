
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import "./Dashboard.css"


export default function Dashboard(props){

    useEffect(() => {
        document.getElementsByTagName('body')[0].className = "dashboardBackground"
    })

    return (
        <div  className="retro col-sm-6 offset-sm-3" >
            <section className="dashboardBody nes-container with-title pull-left">
                <h3 className="title">Texts</h3>
                <Link to="/member" className="nes-btn is-primary showcode">Members</Link> <hr/>
                <Link to="/market" className="nes-btn is-success showcode">Market</Link> <hr/>
                <Link to="/equipment" className="nes-btn is-warning showcode">Equipment</Link> <hr/>
                <Link to="/operation" className="nes-btn is-error showcode">Operation</Link> <hr/>
            </section>
        </div>
    )
}