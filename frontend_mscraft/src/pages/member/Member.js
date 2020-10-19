
import React, { 
    useState,
    useEffect
} from 'react'
import { Link } from 'react-router-dom'
import "./Member.css"

export default function Dashboard(props){

    useEffect(() => {
        document.getElementsByTagName('body')[0].className = "memberBackground"
    })

    return (
    <div className="col-sm-8 offset-sm-2" >
        <br/>
        <section class="dashboardBody nes-container with-title pull-left">
            <h3 class="retro title">Your current member Member</h3>
            <Link to="/equipment" className="retro nes-btn is-warning showcode">Equipment</Link>&nbsp;&nbsp;
            <Link to="/fallenhero" className="retro nes-btn is-error showcode">Fallen Heroes</Link>&nbsp;&nbsp;
            <hr/>
            <table class="retro nes-table is-bordered is-centered">
                <thead>
                <tr>
                    <th>Sprite</th>
                    <th>Unit Name</th>
                    <th>HP</th>
                    <th>Atk Min</th>
                    <th>Atk Max</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Thou hast had a good morning</td>
                    <td>Thou hast had a good morning</td>
                    <td>Thou hast had a good afternoon</td>
                    <td>Thou hast had a good evening</td>
                    <td>Thou hast had a good night</td>
                    <td>Thou hast had a good night</td>
                </tr>
                </tbody>
            </table>
        </section>
    </div>
    )
}