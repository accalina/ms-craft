
import React, { 
    useState,
    useCallback,
    useEffect
} from 'react'
import "./Market.css"
import Header from '../../components/Header'
import axios from 'axios'
import Cookie from "js-cookie";

export default function Dashboard(props){

    const [marketlist, setMarketlist] = useState([])

    const getMarket = useCallback((e) => {
        axios.defaults.xsrfHeaderName = "X-CSRFToken"
        axios.defaults.xsrfCookieName = 'csrftoken'

        axios.get(`http://localhost:8000/api/v1/market`, {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + Cookie.get("at")
            }
        })
        .then(function (response) {
            console.log(response.data)
            setMarketlist(response.data)
        })
        .catch(function (error) {
            if(error.response.status == 401){
                Object.keys(Cookie.get()).forEach(function(cookieName) { Cookie.remove(cookieName) });
                props.history.push({pathname: '/login'})
            }
            console.log(error);
        });
    }, [marketlist])

    const buyUnit = useCallback((unitname, marketid) => (e) =>  {
        console.log("Buying unit id: " + marketid)

        const requestData = {
            unitname : unitname,
            playerid : Cookie.get('userid'),
            marketid : marketid
        }
        console.log(requestData)
        const requestHeader = {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + Cookie.get("at")
        }

        const options = {
            method: 'POST',
            url: 'http://localhost:8000/api/v1/buymember',
            headers: requestHeader,
            data: requestData
        };

        const getProfile = {
            method: 'GET',
            url: 'http://localhost:8000/api/v1/profile',
            headers: requestHeader,
        };

        axios.request(options).then(function (response) {
            axios.request(getProfile).then(function (response) {
                Cookie.set("cash", response.data[0].cash)
                props.history.push({pathname: '/dashboard'})
            })
        })
        .catch(function (error) {
            if(error.response.status == 401){
                Object.keys(Cookie.get()).forEach(function(cookieName) { Cookie.remove(cookieName) });
                props.history.push({pathname: '/login'})
            }
            console.log(error);
        });
    })

    useEffect(() => {
        if (Cookie.get('at')){
            document.getElementsByTagName('body')[0].className = "marketBackground"
            getMarket()
        }else{
            props.history.push({pathname: '/login'})
        }
    },[])

    return (
    <>
        <Header/>
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
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {marketlist.map((market, index)=>{
                            return (
                            <tr key={index}>
                                <td> <img src={market.sprite} alt={market.name}/> </td>
                                <td>{market.name}</td>
                                <td>{market.health}</td>
                                <td>{market.atkmin}</td>
                                <td>{market.atkmax}</td>
                                <td>{market.price}</td>
                                <td>
                                    <button onClick={buyUnit(market.name, market.id)} type="button" className="nes-btn is-success showcode">Buy</button>
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