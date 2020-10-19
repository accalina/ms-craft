
import React, { 
    useState,
    useEffect
} from 'react'
import "./Operation.css"

export default function Operation(props){

    useEffect(() => {
        document.getElementsByTagName('body')[0].className = "operationBackground"
    })

    return (
    <div className="row">
        <div className="retro col-sm-3 offset-sm-1" >
            <section class="dashboardBody nes-container with-title pull-left">
                <h3 class="title">Enemy Select</h3>
                <table class="nes-table is-bordered is-centered is-dark">
                    <thead>
                        <tr>
                            <th>Sprite</th>
                            <th>Unit Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Enemy Name </td>
                            <td>
                                <button className="nes-btn is-error">Pick</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
        <div className="retro col-sm-4" >
            <section class="dashboardBody nes-container with-title pull-left">
                <h3 class="title">Member Select</h3>
                <table class="nes-table is-bordered is-centered">
                    <thead>
                        <tr>
                            <th>Sprite</th>
                            <th>Unit Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Enemy Name </td>
                            <td>
                                <button className="nes-btn is-error">Pick</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
        <div className="retro col-sm-3" >
            <section class="dashboardBody nes-container with-title pull-left">
                <h3 class="title">Enter Battle</h3>
                <table class="nes-table is-bordered is-centered">
                    <thead>
                        <tr>
                            <th>Sprite</th>
                            <th>Unit Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Enemy Name </td>
                            <td>
                                <button className="nes-btn is-error">Pick</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
    </div>
    )
}