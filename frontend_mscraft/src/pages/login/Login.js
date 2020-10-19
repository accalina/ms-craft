
import React, { 
  useState,
  useEffect
} from 'react'
import "./Login.css"

const Login = (props) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  useEffect(()=>{
    document.getElementsByTagName('body')[0].className = "loginBackground"
  })


  const sendData = (e) => {
    e.preventDefault()
    // alert(`Username: ${username}, Password: ${password}`)
    props.history.push({pathname: '/dashboard'})
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