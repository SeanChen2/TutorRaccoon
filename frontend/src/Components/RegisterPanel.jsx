import "../css/LoginRegisterPanel.css"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function RegisterPanel() {

  const navigate = useNavigate();
  
  const [username, setUsername] = useState("N/A");
  const [email, setEmail] = useState("N/A");
  const [password, setPassword] = useState("N/A");

  const createAccount = () => {
    console.log(username)
    console.log(email)
    console.log(password)
    navigate("/", { state: { username: username, email: email, password: password } })
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Sign Up</div>
        <div className="underline" />
      </div>

      <div className="inputs">
        <div className="input">
          <img src="../images/username.png" width="30px" height="30px"/>
          <input type="username" placeholder="Username" onChange={e => setUsername(e.target.value)}/>
        </div>

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
        <div className="submit-btn" onClick={createAccount}>Create account</div>
      </div>

      <div className="nav-container">
        Already have an account? <a href="/login">Log in.</a>
      </div>
      
    </div>
  )
}