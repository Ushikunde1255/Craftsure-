import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Pages - all your existing pages
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import Artisans from './pages/Artisans';
import PostJob from './pages/PostJob';
import Portfolio from './pages/Portfolio';
import PostWork from './pages/PostWork';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('user') || 'null');
    setUser(u);
  }, []);

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload();
  };

  return (
    <nav style={{ background:'#5a31f5', padding:'12px 14px', display:'flex', justifyContent:'space-between', alignItems:'center', position:'sticky', top:0, zIndex:100 }}>
      <Link to="/" style={{ color:'white', fontWeight:'bold', fontSize:'20px', textDecoration:'none' }}>
        CraftSure 🇳🇬
      </Link>
      <div style={{ display:'flex', gap:'10px', alignItems:'center', fontSize:'14px' }}>
        <Link to="/jobs" style={{ color:'white', textDecoration:'none' }}>Jobs</Link>
        <Link to="/artisans" style={{ color:'white', textDecoration:'none' }}>Artisans</Link>
        <Link to="/portfolio" style={{ color:'white', textDecoration:'none', background:'rgba(255,255,255,0.25)', padding:'6px 10px', borderRadius:'8px' }}>Portfolio 📸</Link>
        <Link to="/post" style={{ background:'white', color:'#5a31f5', padding:'8px 12px', borderRadius:'8px', textDecoration:'none', fontWeight:'bold' }}>+ Post</Link>
        {user? (
          <>
            <span style={{ color:'white', fontSize:'12px' }}>{user.name?.split(' ')[0]}</span>
            <button onClick={logout} style={{ background:'transparent', border:'1px solid white', color:'white', padding:'5px 10px', borderRadius:'8px', fontSize:'12px' }}>Logout</button>
          </>
        ) : (
          <Link to="/login" style={{ color:'white', textDecoration:'none', border:'1px solid white', padding:'5px 10px', borderRadius:'8px' }}>Login</Link>
        )}
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
        <Route path="/post" element={<PostJob />} />
        <Route path="/post-work" element={<PostWork />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
