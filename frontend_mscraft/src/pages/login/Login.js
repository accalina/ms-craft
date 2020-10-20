
import React, { 
  useState,
  useEffect
} from 'react'
import "./Login.css"
import axios from 'axios'
import Cookie from "js-cookie";

const Login = (props) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  useEffect(()=>{
    document.getElementsByTagName('body')[0].className = "loginBackground"
    if (Cookie.get('at') != null){
      props.history.push({pathname: '/dashboard'})
    }
  })


  const sendData = (e) => {
    e.preventDefault()
    // alert(`Username: ${username}, Password: ${password}`)
    // window.sessionStorage.setItem("username", "Claudia")

    axios.post('http://mscraft_backend:8000/api/v1/token', {
      username: username,
      password: password
    })
    .then(function (response) {
      Cookie.set("at", response.data.access)
      Cookie.set("rt", response.data.refresh)

      axios.defaults.xsrfHeaderName = "X-CSRFToken"
      axios.defaults.xsrfCookieName = 'csrftoken'

      axios.get('http://mscraft_backend:8000/api/v1/profile', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + Cookie.get("at")
        }
      })
      .then(function (response) {
        Cookie.set("userid", response.data[0].id)
        Cookie.set("username", response.data[0].user.username)
        Cookie.set("cash", response.data[0].cash)
        props.history.push({pathname: '/dashboard'})
      })
      .catch(function (error) {
        console.log(error);
      });
    })
    .catch(function (error) {
      // console.log(error);
      alert("Login Invalid, Please try again")
      setUsername("")
      setPassword("")
    });

    // Cookie.set("username", "Claudia")
    
  }

  return (
    <div className="col-sm-4 offset-sm-4" >

      <form onSubmit={(e) => {sendData(e)}}>
        <center>
          <h1>Login Page</h1>
        </center>
        <hr/>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input class="form-control" type="text" placeholder="username" value={username} onChange={(e)=>{setUsername(e.target.value)}}/> <br/>
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input class="form-control" type="password" placeholder="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/> <br/>
        </div>
        <hr/>
        <center>
          <button type="submit" class="nes-btn is-primary">Submit</button>
        </center>
      </form>


    </div>
  )
}

export default Login