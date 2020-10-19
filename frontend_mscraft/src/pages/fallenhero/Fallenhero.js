
import React, { 
    useState,
    useEffect
} from 'react'
import "./Fallenhero.css"

export default function Fallenhero(props){

    useEffect(() => {
        document.getElementsByTagName('body')[0].className = "fallenheroBackground"
    })

    return (
    <div className="retro col-sm-4 offset-sm-4" >
        <section class="dashboardBody nes-container with-title pull-left">
            <h3 class="title">Your fallen heroes</h3>
            <table class="nes-table is-bordered is-centered">
                <thead>
                <tr>
                    <th>Sprite</th>
                    <th>Unit Name</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Thou hast had a good morning</td>
                    <td>Thou hast had a good morning</td>
                </tr>
                </tbody>
            </table>
        </section>
    </div>
    )
}