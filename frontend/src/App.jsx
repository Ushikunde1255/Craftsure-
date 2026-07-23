import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Jobs from './pages/Jobs.jsx'
export default function App(){
  return (
    <BrowserRouter>
      <nav style={{padding:'15px',background:'white',display:'flex',gap:'15px'}}>
        <Link to="/" style={{fontWeight:'bold',color:'#7c3aed',textDecoration:'none'}}>CraftSure Nigeria</Link>
        <Link to="/jobs">Jobs</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/login">Login</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/jobs" element={<Jobs/>}/>
      </Routes>
    </BrowserRouter>
  )
}
