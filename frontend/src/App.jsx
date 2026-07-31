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
    const u=localStorage.getItem('user');
    if(u) try{ setUser(JSON.parse(u)); }catch{}
  },[]);
  const logout=()=>{ localStorage.removeItem('user'); setUser(null); window.location.href='/'; };
  return(
    <nav style={{ background:'#2d1b9c', padding:'10px', display:'flex', justifyContent:'space-between', alignItems:'center', overflowX:'auto', whiteSpace:'nowrap' }}>
      <div style={{ display:'flex', gap:'8px', alignItems:'center' }}>
        <Link to="/" style={{ color:'white', fontWeight:'bold', textDecoration:'none' }}>CraftSure 🇳🇬🇬🇭</Link>
        <Link to="/jobs" style={{ color:'white', textDecoration:'none', padding:'6px 10px', background:'#4f36d3', borderRadius:'8px', fontSize:'13px' }}>Jobs</Link>
        <Link to="/artisans" style={{ color:'white', textDecoration:'none', padding:'6px 10px', background:'#4f36d3', borderRadius:'8px', fontSize:'13px' }}>Artisans</Link>
        <Link to="/portfolio" style={{ color:'white', textDecoration:'none', padding:'6px 10px', background:'#6d28d9', borderRadius:'8px', fontSize:'13px' }}>Portfolio 📸</Link>
        <Link to="/escrow" style={{ color:'white', textDecoration:'none', padding:'6px 10px', background:'#22c55e', borderRadius:'8px', fontSize:'13px' }}>Escrow 💰</Link>
        <Link to="/admin" style={{ color:'white', textDecoration:'none', padding:'6px 10px', background:'#f59e0b', borderRadius:'8px', fontSize:'13px' }}>Admin 💼</Link>
        <Link to="/post" style={{ color:'#2d1b9c', textDecoration:'none', background:'white', padding:'6px 10px', borderRadius:'8px', fontWeight:'bold', fontSize:'13px' }}>+ Post</Link>
      </div>
      <div style={{ display:'flex', gap:'6px', alignItems:'center', marginLeft:'10px' }}>
        {user? (
          <>
            <span style={{ color:'white', fontSize:'12px' }}>{user.name?.split(' ')[0]}</span>
            <button onClick={logout} style={{ background:'white', color:'#2d1b9c', border:'none', padding:'6px 10px', borderRadius:'8px', fontSize:'12px', fontWeight:'bold' }}>Logout</button>
          </>
        ):(
          <>
            <Link to="/login" style={{ color:'white', textDecoration:'none', border:'1px solid white', padding:'6px 10px', borderRadius:'8px', fontSize:'12px' }}>Login</Link>
            <Link to="/register" style={{ color:'#2d1b9c', textDecoration:'none', background:'white', padding:'6px 10px', borderRadius:'8px', fontWeight:'bold', fontSize:'12px' }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default function App(){
  return(
    <Router>
      <Navbar/>
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
