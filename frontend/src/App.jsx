import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import Artisans from './pages/Artisans';
import Portfolio from './pages/Portfolio';
import PostJob from './pages/PostJob';
import Escrow from './pages/Escrow';
import Admin from './pages/Admin';

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
        CraftSure 🇳🇬🇬🇭
      </Link>

      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
        <Link to="/jobs" style={{ color: 'white', textDecoration: 'none', padding: '6px 8px', borderRadius: '8px', fontSize:'14px' }}>Jobs</Link>
        <Link to="/artisans" style={{ color: 'white', textDecoration: 'none', padding: '6px 8px', borderRadius: '8px', fontSize:'14px' }}>Artisans</Link>
        <Link to="/portfolio" style={{ color: 'white', textDecoration: 'none', padding: '6px 10px', borderRadius: '8px', background: '#4f36d3', fontSize:'14px' }}>Portfolio 📸</Link>
        <Link to="/escrow" style={{ color: 'white', textDecoration: 'none', padding: '6px 10px', borderRadius: '8px', background: '#22c55e', fontSize:'14px', fontWeight:'bold' }}>Escrow 💰</Link>
        <Link to="/admin" style={{ color: 'white', textDecoration: 'none', padding: '6px 10px', borderRadius: '8px', background: '#f59e0b', fontSize:'14px', fontWeight:'bold' }}>Admin 💼</Link>
        <Link to="/post" style={{ color: '#2d1b9c', textDecoration: 'none', background: 'white', padding: '6px 12px', borderRadius: '8px', fontWeight: 'bold', fontSize:'14px' }}>+ Post</Link>
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
        <Route path="/post" element={<PostJob />} />
      </Routes>
    </Router>
  );
}
