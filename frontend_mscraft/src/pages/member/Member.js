
import React, { 
    useState,
    useCallback,
    useEffect
} from 'react'
import { Link } from 'react-router-dom'
import "./Member.css"
import Header from '../../components/Header'
import axios from 'axios'
import Cookie from "js-cookie";

export default function Dashboard(props){

    const [memberlist, setMemberlist] = useState([])

    const getMember = useCallback((e) => {
        axios.defaults.xsrfHeaderName = "X-CSRFToken"
        axios.defaults.xsrfCookieName = 'csrftoken'

        axios.get(`http://mscraft_backend:8000/api/v1/member?search=${Cookie.get("userid")}`, {
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
            if(error.response.status === 401){
                Object.keys(Cookie.get()).forEach(function(cookieName) { Cookie.remove(cookieName) });
                props.history.push({pathname: '/login'})
            }
            console.log(error);
        });
    }, [memberlist])


    const sellUnit = useCallback((memberid) => (e) =>  {

        const requestData = {
            playerid: Cookie.get('userid'),
            memberid: memberid
        }
        const requestHeader = {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + Cookie.get("at")
        }

        const options = {
            method: 'POST',
            url: 'http://mscraft_backend:8000/api/v1/sellmember',
            headers: requestHeader,
            data: requestData
        };

        const getProfile = {
            method: 'GET',
            url: 'http://mscraft_backend:8000/api/v1/profile',
            headers: requestHeader,
        };

        axios.request(options).then(function (response) {
            axios.request(getProfile).then(function (response) {
                Cookie.set("cash", response.data[0].cash)
                props.history.push({pathname: '/dashboard'})
            })
        })
        .catch(function (error) {
            if(error.response.status === 401){
                Object.keys(Cookie.get()).forEach(function(cookieName) { Cookie.remove(cookieName) });
                props.history.push({pathname: '/login'})
            }
        });
    })

    useEffect(() => {
        if (Cookie.get('at')){
            document.getElementsByTagName('body')[0].className = "memberBackground"
            getMember()
        }else{
            props.history.push({pathname: '/login'})
        }
    },[])

    return (
    <>  
        <Header/>
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
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {memberlist.map((member)=>{
                        return (
                        <tr>
                            <td> <img src={member.unit.sprite} alt={member.unit.name}/> </td>
                            <td>{member.name}</td>
                            <td>{member.unit.health}</td>
                            <td>{member.unit.atkmin}</td>
                            <td>{member.unit.atkmax}</td>
                            <td>{member.unit.price}</td>
                            <td>
                                <button type="button" className="nes-btn is-error showcode" onClick={sellUnit(member.id)}>Sell Unit</button>
                            </td>
                        </tr>
                        )
                    })}
                    </tbody>
                </table>
            </section>
        </div>
    </>
    )
}