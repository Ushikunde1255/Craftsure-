import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import Artisans from './pages/Artisans';
import Portfolio from './pages/Portfolio';
import PostJob from './pages/PostJob';
import Escrow from './pages/Escrow';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/Chat';

function Navbar(){
  const [user,setUser]=useState(null);
  useEffect(()=>{
    try{
      const u=localStorage.getItem('user');
      if(u) setUser(JSON.parse(u));
    }catch{}
  },[]);
  const logout=()=>{
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    window.location.href='/';
  };
  return(
    <nav style={{ background:'#2d1b9c', padding:'10px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
      <Link to="/" style={{ color:'white', fontWeight:'bold', textDecoration:'none', fontSize:'16px' }}>CraftSure 🇳🇬🇬🇭</Link>
      <div style={{ display:'flex', gap:'6px', flexWrap:'wrap', alignItems:'center' }}>
        <Link to="/jobs" style={{ color:'white', textDecoration:'none', background:'#4f36d3', padding:'6px 8px', borderRadius:'8px', fontSize:'12px' }}>Jobs</Link>
        <Link to="/artisans" style={{ color:'white', textDecoration:'none', background:'#4f36d3', padding:'6px 8px', borderRadius:'8px', fontSize:'12px' }}>Artisans</Link>
        <Link to="/portfolio" style={{ color:'white', textDecoration:'none', background:'#6d28d9', padding:'6px 8px', borderRadius:'8px', fontSize:'12px' }}>Portfolio</Link>
        <Link to="/escrow" style={{ color:'white', textDecoration:'none', background:'#22c55e', padding:'6px 8px', borderRadius:'8px', fontSize:'12px' }}>Escrow</Link>
        <Link to="/admin" style={{ color:'white', textDecoration:'none', background:'#f59e0b', padding:'6px 8px', borderRadius:'8px', fontSize:'12px' }}>Admin</Link>
        <Link to="/post" style={{ color:'#2d1b9c', background:'white', padding:'6px 8px', borderRadius:'8px', fontWeight:'bold', textDecoration:'none', fontSize:'12px' }}>+ Post</Link>
        {user? (
          <>
            <span style={{ color:'#a5f3fc', fontSize:'11px' }}>{user.name?.split(' ')[0]}</span>
            <button onClick={logout} style={{ background:'white', color:'#2d1b9c', border:'none', padding:'6px 8px', borderRadius:'8px', fontSize:'11px', fontWeight:'bold' }}>Logout</button>
          </>
        ):(
          <>
            <Link to="/login" style={{ color:'white', border:'1px solid white', padding:'6px 8px', borderRadius:'8px', textDecoration:'none', fontSize:'11px' }}>Login</Link>
            <Link to="/register" style={{ background:'white', color:'#2d1b9c', padding:'6px 8px', borderRadius:'8px', textDecoration:'none', fontSize:'11px', fontWeight:'bold' }}>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default function App(){
  return(
    <Router><Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/jobs" element={<Jobs/>}/>
        <Route path="/artisans" element={<Artisans/>}/>
        <Route path="/portfolio" element={<Portfolio/>}/>
        <Route path="/escrow" element={<Escrow/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/signup" element={<Register/>}/>
        <Route path="/chat/:escrowId" element={<Chat/>}/>
        <Route path="/post" element={<PostJob/>}/>
      </Routes>
    </Router>
  );
}
