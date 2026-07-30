import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import Artisans from './pages/Artisans';
import Portfolio from './pages/Portfolio';
import PostJob from './pages/PostJob';
import Escrow from './pages/Escrow';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Chat from './pages/Chat';

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const u = localStorage.getItem('user');
    if (u) try{ setUser(JSON.parse(u)); }catch{}
  }, []);
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };
  return (
    <nav style={{ background:'#2d1b9c', padding:'10px 15px', display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, zIndex:100 }}>
      <Link to="/" style={{ color:'white', textDecoration:'none', fontWeight:'bold', fontSize:'18px' }}>CraftSure 🇳🇬🇬🇭</Link>
      <div style={{ display:'flex', gap:'6px', alignItems:'center', flexWrap:'wrap' }}>
        <Link to="/jobs" style={{ color:'white', textDecoration:'none', padding:'6px 8px', fontSize:'14px' }}>Jobs</Link>
        <Link to="/artisans" style={{ color:'white', textDecoration:'none', padding:'6px 8px', fontSize:'14px' }}>Artisans</Link>
        <Link to="/portfolio" style={{ color:'white', textDecoration:'none', padding:'6px 10px', borderRadius:'8px', background:'#4f36d3', fontSize:'13px' }}>Portfolio 📸</Link>
        <Link to="/escrow" style={{ color:'white', textDecoration:'none', padding:'6px 10px', borderRadius:'8px', background:'#22c55e', fontSize:'13px', fontWeight:'bold' }}>Escrow 💰</Link>
        <Link to="/admin" style={{ color:'white', textDecoration:'none', padding:'6px 10px', borderRadius:'8px', background:'#f59e0b', fontSize:'13px', fontWeight:'bold' }}>Admin 💼</Link>
        {user? (
          <>
            <span style={{ color:'white', fontSize:'12px' }}>{user.name?.split(' ')[0]}</span>
            <button onClick={logout} style={{ background:'white', color:'#2d1b9c', border:'none', padding:'6px 10px', borderRadius:'8px', fontWeight:'bold', fontSize:'12px' }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color:'white', textDecoration:'none', padding:'6px 10px', borderRadius:'8px', border:'1px solid white', fontSize:'13px' }}>Login</Link>
            <Link to="/signup" style={{ color:'#2d1b9c', textDecoration:'none', background:'white', padding:'6px 12px', borderRadius:'8px', fontWeight:'bold', fontSize:'13px' }}>Sign Up</Link>
          </>
        )}
        <Link to="/post" style={{ color:'#2d1b9c', textDecoration:'none', background:'#a5f3fc', padding:'6px 12px', borderRadius:'8px', fontWeight:'bold', fontSize:'13px' }}>+ Post</Link>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/artisans" element={<Artisans />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/escrow" element={<Escrow />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chat/:escrowId" element={<Chat />} />
        <Route path="/post" element={<PostJob />} />
      </Routes>
    </Router>
  );
}
