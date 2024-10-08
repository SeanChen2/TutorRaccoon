import { Routes, Route } from "react-router-dom"
import Home from "./Home.jsx"
import Profile from "./Profile.jsx"
import Login from "./Login.jsx"
import Register from "./Register.jsx"
import Onboarding from "./Onboarding.jsx"

export default function App() {
  return (
    <Routes>
      <Route index element={<Register />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/onboarding" element={<Onboarding />}/>
      <Route path="/home" element={<Home />}/>
      <Route path="/profile" element={<Profile />}/>
    </Routes>
  )
}