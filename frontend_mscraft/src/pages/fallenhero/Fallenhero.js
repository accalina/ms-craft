
import React, { 
    useState,
    useCallback,
    useEffect
} from 'react'
import "./Fallenhero.css"
import Header from '../../components/Header'
import axios from 'axios'
import Cookie from "js-cookie";

export default function Fallenhero(props){
    const [herolist, setHerolist] = useState([])

    const getHero = useCallback((e) => {
        axios.defaults.xsrfHeaderName = "X-CSRFToken"
        axios.defaults.xsrfCookieName = 'csrftoken'

        axios.get(`http://localhost:8000/api/v1/heroes/${Cookie.get("userid")}`, {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + Cookie.get("at")
            }
        })
        .then(function (response) {
            console.log(response.data.Heroes)
            setHerolist(response.data.Heroes)
        })
        .catch(function (error) {
            console.log(error);
        });
    }, [setHerolist])


    useEffect(() => {
        if (Cookie.get('at')){
            document.getElementsByTagName('body')[0].className = "fallenheroBackground"
            getHero()
        }else{
            props.history.push({pathname: '/login'})
        }
    },[])

    return (
    <>
        <Header/>
        <div className="retro col-sm-4 offset-sm-4" >
            <section class="dashboardBody nes-container with-title pull-left">
                <h3 class="title">Your fallen heroes</h3>
                <table class="nes-table is-bordered is-centered">
                    <thead>
                    <tr>
                        <th>Unit Name</th>
                        <th>Unit Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {herolist.map((hero, index)=>{
                        return (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{hero}</td>
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