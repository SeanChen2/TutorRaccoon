import { Routes, Route } from "react-router-dom"
import Home from "./Home.jsx"
import Profile from "./Profile.jsx"
import Login from "./Login.jsx"
import Register from "./Register.jsx"

export default function App() {
  return (
    <Routes>
      <Route index element={<Login />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/home" element={<Home />}/>
      <Route path="/profile" element={<Profile />}/>
    </Routes>
  )
}