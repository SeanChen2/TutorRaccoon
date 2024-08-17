import "../css/LoginRegisterPanel.css"
import { useState } from "react"

export default function LoginPanel() {

  const [email, setEmail] = useState("N/A")
  const [password, setPassword] = useState("N/A")

  const login = () => {
    console.log(email)
    console.log(password)
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Login</div>
        <div className="underline" />
      </div>

      <div className="inputs">
        <div className="input">
          <img src="../images/email.png" width="30px" height="30px"/>
          <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
        </div>

        <div className="input">
          <img src="../images/password.png" width="30px" height="30px"/>
          <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
        </div>
      </div>

      <div className="submit-container">
        <div className="submit-btn" onClick={login}>Login</div>
      </div>

      <div className="nav-container">
        Don't have an account? <a href="/register">Register.</a>
      </div>
      
    </div>
  )
}