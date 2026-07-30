import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import Artisans from './pages/Artisans';
import Portfolio from './pages/Portfolio';
import PostJob from './pages/PostJob';
import Escrow from './pages/Escrow';

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const u = localStorage.getItem('user');
    if (u) setUser(JSON.parse(u));
  }, []);

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <nav style={{ 
      background: '#2d1b9c', 
      padding: '10px 15px', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      overflowX: 'auto',
      gap: '8px'
    }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '18px', display:'flex', alignItems:'center', gap:'5px', whiteSpace:'nowrap' }}>
        CraftSure <span style={{ fontSize:'14px' }}>🇳🇬🇬🇭</span>
      </Link>

      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
        <Link to="/jobs" style={{ color: 'white', textDecoration: 'none', padding: '6px 8px', borderRadius: '8px', fontSize:'14px', whiteSpace:'nowrap' }}>Jobs</Link>
        <Link to="/artisans" style={{ color: 'white', textDecoration: 'none', padding: '6px 8px', borderRadius: '8px', fontSize:'14px', whiteSpace:'nowrap' }}>Artisans</Link>
        <Link to="/portfolio" style={{ color: 'white', textDecoration: 'none', padding: '6px 10px', borderRadius: '8px', background: '#4f36d3', fontSize:'14px', whiteSpace:'nowrap' }}>Portfolio 📸</Link>
        <Link to="/escrow" style={{ color: 'white', textDecoration: 'none', padding: '6px 10px', borderRadius: '8px', background: '#22c55e', fontSize:'14px', fontWeight:'bold', whiteSpace:'nowrap' }}>Escrow 💰</Link>
        <Link to="/post" style={{ color: '#2d1b9c', textDecoration: 'none', background: 'white', padding: '6px 12px', borderRadius: '8px', fontWeight: 'bold', fontSize:'14px', whiteSpace:'nowrap' }}>+ Post</Link>
        
        {user ? (
          <>
            <span style={{ color: '#a5f3fc', fontSize:'12px', maxWidth:'80px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{user.name}</span>
            <button onClick={logout} style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', padding: '6px 10px', borderRadius: '8px', fontSize:'12px' }}>Logout</button>
          </>
        ) : (
          <Link to="/post" style={{ color: 'white', textDecoration: 'none', fontSize:'12px' }}>Login</Link>
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
        <Route path="/escrow" element={<Escrow />} />
        <Route path="/post" element={<PostJob />} />
        {/* 404 */}
        <Route path="*" element={
          <div style={{ padding:'40px', textAlign:'center' }}>
            <h2>Page not found</h2>
            <Link to="/" style={{ color:'#5a31f5' }}>Go Home</Link>
          </div>
        } />
      </Routes>
    </Router>
  );
}
