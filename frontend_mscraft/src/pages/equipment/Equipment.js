
import React, { 
    useState,
    useEffect
} from 'react'
import "./Equipment.css"

export default function Equipment(props){

    useEffect(() => {
        document.getElementsByTagName('body')[0].className = "equipmentBackground"
    })

    return (
    <div className="retro col-sm-8 offset-sm-2" >
        <section class="dashboardBody nes-container with-title pull-left">
            <h3 class="title">Recruit new Member</h3>
            <table class="nes-table is-bordered is-centered">
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