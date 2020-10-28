
import React, { 
    useState,
    useCallback,
    useEffect
} from 'react'
import "./Equipment.css"
import axios from "axios";
import Cookie from "js-cookie";
import Header from '../../components/Header';

export default function Equipment(props){

    const [equlist, setEqulist] = useState([])

    const getEquipment = useCallback((e) => {
        axios.defaults.xsrfHeaderName = "X-CSRFToken"
        axios.defaults.xsrfCookieName = 'csrftoken'

        axios.get(`http://localhost:8000/api/v1/equipment`, {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + Cookie.get("at")
            }
        })
        .then(function (response) {
            console.log(response.data)
            setEqulist(response.data)
        })
        .catch(function (error) {
            if(error.response.status === 401){
                Object.keys(Cookie.get()).forEach(function(cookieName) { Cookie.remove(cookieName) });
                props.history.push({pathname: '/login'})
            }
            console.log(error);
        });
    })

    useEffect(() => {
        document.getElementsByTagName('body')[0].className = "equipmentBackground"
        getEquipment()
    },[])

    return (
    <>
        <Header/>
        <div className="retro col-sm-8 offset-sm-2" >
            <section class="dashboardBody nes-container with-title pull-left">
                <h3 class="title">Your Armory</h3>
                <table class="nes-table is-bordered is-centered">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Atk</th>
                        <th>price</th>
                        <th>sprite</th>
                    </tr>
                    </thead>
                    <tbody>
                    {equlist.map((equ, index)=>{
                        return (
                        <tr key={index}>
                            <td>{equ.name}</td>
                            <td>{equ.desc}</td>
                            <td>{equ.attack}</td>
                            <td>{equ.price}</td>
                            <td><img src={equ.sprite}/></td>
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