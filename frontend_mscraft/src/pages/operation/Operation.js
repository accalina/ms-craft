
import React, { 
    useState,
    useCallback,
    useEffect
} from 'react'
import "./Operation.css"
import Header from '../../components/Header'
import axios from 'axios'
import Cookie from "js-cookie";

export default function Operation(props){

    const [memberlist, setMemberlist] = useState([])
    const [enemylist, setEnemylist] = useState([])
    const [memberdeploy, setMemberdeploy] = useState({name: "", id: "", sprite: ""})
    const [enemydeploy, setEnemydeploy] = useState({name: "", id: "", sprite: ""})
    const [readyfight, setReadyfight] = useState(false)
    const [battlelog, setBattlelog] = useState({"winner": "", "report": []})

    const getMember = useCallback((e) => {
        axios.defaults.xsrfHeaderName = "X-CSRFToken"
        axios.defaults.xsrfCookieName = 'csrftoken'
        axios.get(`http://localhost:8000/api/v1/member?search=${Cookie.get("userid")}`, {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + Cookie.get("at")
            }
        })
        .then(function (response) {
            console.log(response.data)
            setMemberlist(response.data)
        })
        .catch(function (error) {
            if(error.response.status == 401){
                Object.keys(Cookie.get()).forEach(function(cookieName) { Cookie.remove(cookieName) });
                props.history.push({pathname: '/login'})
            }
            console.log(error);
        });
    }, [memberlist])

    const getEnemy = useCallback((e) => {
        axios.defaults.xsrfHeaderName = "X-CSRFToken"
        axios.defaults.xsrfCookieName = 'csrftoken'
        axios.get(`http://localhost:8000/api/v1/enemy`, {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + Cookie.get("at")
            }
        })
        .then(function (response) {
            console.log(response.data)
            setEnemylist(response.data)
        })
        .catch(function (error) {
            if(error.response.status == 401){
                Object.keys(Cookie.get()).forEach(function(cookieName) { Cookie.remove(cookieName) });
                props.history.push({pathname: '/login'})
            }
            console.log(error);
        });
    }, [memberlist])

    const startFight = useCallback((e) => {
        setReadyfight(true)

        const requestData = {
            playerid: Cookie.get('userid'),
            memberid: memberdeploy.id,
            enemyid: enemydeploy.id
        }
        const requestHeader = {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + Cookie.get("at")
        }

        const options = {
            method: 'POST',
            url: 'http://localhost:8000/api/v1/generateBattle',
            headers: requestHeader,
            data: requestData
        };

        const getProfile = {
            method: 'GET',
            url: 'http://localhost:8000/api/v1/profile',
            headers: requestHeader,
        };

        axios.request(options).then(function (response) {
            console.log(response.data)
            setBattlelog(response.data)
            axios.request(getProfile).then(function (response) {
                Cookie.set("cash", response.data[0].cash)
            })
        })
        .catch(function (error) {
            if(error.response.status == 401){
                Object.keys(Cookie.get()).forEach(function(cookieName) { Cookie.remove(cookieName) });
                props.history.push({pathname: '/login'})
            }
        });    
    })

    useEffect(() => {
        document.getElementsByTagName('body')[0].className = "operationBackground"
        console.clear()
        getMember()
        getEnemy()
    },[])

    return (
    <>
        <Header/>

        {readyfight == true ? (
        <div className="row">
            <div className="retro col-sm-8 offset-sm-2" >
                <section class="dashboardBody nes-container with-title pull-left">
                    <h3 class="title"></h3>
                    <center>
                        <table>
                            <tbody>
                                <tr>
                                    <td><img src={memberdeploy.sprite} alt=""/> </td>
                                    <td><img src={enemydeploy.sprite} alt=""/></td>
                                </tr>
                            </tbody>
                        </table>
                        <hr/>
                        <table class="nes-table is-bordered is-centered">
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Battle log</th>
                                </tr>
                            </thead>
                            <tbody>
                            {battlelog.report.map((log, index)=>{
                            return (
                                <tr key={index}>
                                    <td>{index + 1}.</td>
                                    <td>{log}</td>
                                </tr>
                                )
                            })}
                                <tr>
                                    <td colSpan="2">
                                        <center>
                                            Winner: { battlelog.winner }
                                        </center>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2">
                                        <center>
                                            <button className="nes-btn is-primary">Back to dashboard</button>
                                        </center>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </center>
                </section>
            </div>
        </div>
        ):(
        <div className="row">
            <div className="retro col-sm-4" style={{marginLeft: '50px'}} >
                <section class="dashboardBody nes-container with-title pull-left">
                    <h3 class="title">Enemy Select</h3>
                    <table class="nes-table is-bordered is-centered is-dark">
                        <thead>
                            <tr>
                                <th>Sprite</th>
                                <th>Unit Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {enemylist.map((enemy, index)=>{
                            return (
                                <tr key={index}>
                                    <td><img src={enemy.sprite} alt=""/> </td>
                                    <td>{enemy.name}</td>
                                    <td>
                                        <button onClick={()=> setEnemydeploy({id: enemy.id, name: enemy.name, sprite: enemy.sprite})} className="nes-btn is-success">Pick</button>
                                    </td>
                                </tr>
                                )
                            })}
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
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {memberlist.map((member, index)=>{
                        return (
                            <tr key={index}>
                                <td><img src={member.unit.sprite} alt=""/> </td>
                                <td>{member.name}</td>
                                <td>
                                    <button onClick={()=> setMemberdeploy({id: member.id, name: member.name, sprite: member.unit.sprite})} className="nes-btn is-success">Pick</button>
                                </td>
                            </tr>
                            )
                        })}
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
                                <th>Info</th>
                                <th>Unit</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Enemy: </td>
                                <td>{memberdeploy.name}</td>
                            </tr>
                            <tr>
                                <td>Member: </td>
                                <td>{enemydeploy.name}</td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    {memberdeploy.id != "" && enemydeploy.id != "" ? (
                                    <button onClick={(e)=>startFight()} className="nes-btn is-warning">Fight</button>
                                    ):(
                                    <button className="nes-btn is-disabled">Fight</button>
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
        )}
    </>
    )
}