import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Pages
import Jobs from './pages/Jobs';
import Artisans from './pages/Artisans';
import PostJob from './pages/PostJob';
import Portfolio from './pages/Portfolio';
import PostWork from './pages/PostWork';
import Login from './pages/Login';
import Register from './pages/Register';

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = () => {
      const u = JSON.parse(localStorage.getItem('user') || 'null');
      setUser(u);
    };
    checkUser();
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, []);

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
    window.location.reload();
  };

  return (
    <nav style={{ background:'#6C3BFF', padding:'12px 15px', display:'flex', justifyContent:'space-between', alignItems:'center', position:'sticky', top:0, zIndex:100, flexWrap:'wrap', gap:'8px' }}>
      <Link to="/" style={{ color:'white', fontWeight:'bold', fontSize:'22px', textDecoration:'none', display:'flex', alignItems:'center', gap:'6px' }}>
        CraftSure <span style={{ fontSize:'18px' }}>🇳🇬</span>
      </Link>

      <div style={{ display:'flex', gap:'12px', alignItems:'center', fontSize:'15px' }}>
        <Link to="/jobs" style={{ color:'white', textDecoration:'none' }}>Jobs</Link>
        <Link to="/artisans" style={{ color:'white', textDecoration:'none' }}>Artisans</Link>
        <Link to="/portfolio" style={{ color:'white', textDecoration:'none', background:'rgba(255,255,255,0.2)', padding:'4px 10px', borderRadius:'8px' }}>Portfolio 📸</Link>
        <Link to="/post" style={{ background:'white', color:'#6C3BFF', padding:'8px 14px', borderRadius:'10px', textDecoration:'none', fontWeight:'bold' }}>+ Post</Link>
        {user? (
          <>
            <span style={{ color:'white', fontSize:'13px' }}>{user.name?.split(' ')[0] || 'Ushi'}</span>
            <button onClick={logout} style={{ background:'transparent', border:'1px solid white', color:'white', padding:'6px 12px', borderRadius:'8px' }}>Logout</button>
          </>
        ) : (
          <Link to="/login" style={{ color:'white', textDecoration:'none', border:'1px solid white', padding:'6px 12px', borderRadius:'8px' }}>Login</Link>
        )}
      </div>
    </nav>
  );
}

function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  return (
    <div style={{ background:'#f5f7fb', minHeight:'100vh' }}>
      <div style={{ background:'#6C3BFF', color:'white', padding:'50px 20px', textAlign:'center', borderRadius:'0 0 30px 30px' }}>
        <h1 style={{ fontSize:'36px', fontWeight:'bold', lineHeight:'1.2' }}>Find Trusted Artisans in<br/>2 Minutes 🇳🇬</h1>
        <p style={{ marginTop:'15px', fontSize:'16px', opacity:0.9 }}>No more fake artisans. Real people, real photos, real WhatsApp</p>
        <div style={{ display:'flex', gap:'12px', justifyContent:'center', marginTop:'25px', flexWrap:'wrap' }}>
          <button onClick={()=>navigate('/artisans')} style={{ background:'white', color:'#6C3BFF', border:'none', padding:'14px 26px', borderRadius:'14px', fontWeight:'bold', fontSize:'16px' }}>Find Artisan</button>
          <button onClick={()=>navigate('/post')} style={{ background:'#22c55e', color:'white', border:'none', padding:'14px 26px', borderRadius:'14px', fontWeight:'bold', fontSize:'16px' }}>Post Job Free</button>
        </div>
        {user && <p style={{ marginTop:'20px', fontSize:'14px' }}>Welcome back, {user.name}! You have posted jobs with real name.</p>}
      </div>

      <div style={{ display:'flex', gap:'12px', justifyContent:'center', padding:'20px', flexWrap:'wrap' }}>
        <div style={{ background:'white', padding:'20px', borderRadius:'16px', textAlign:'center', minWidth:'90px', boxShadow:'0 2px 10px rgba(0,0,0,0.05)' }}><h2>9+</h2><p style={{ fontSize:'12px' }}>Jobs Posted</p></div>
        <div style={{ background:'white', padding:'20px', borderRadius:'16px', textAlign:'center', minWidth:'90px', boxShadow:'0 2px 10px rgba(0,0,0,0.05)' }}><h2>50+</h2><p style={{ fontSize:'12px' }}>Artisans</p></div>
        <div style={{ background:'white', padding:'20px', borderRadius:'16px', textAlign:'center', minWidth:'90px', boxShadow:'0 2px 10px rgba(0,0,0,0.05)' }}><h2>100%</h2><p style={{ fontSize:'12px' }}>Verified via WhatsApp</p></div>
      </div>

      <div style={{ padding:'20px' }}>
        <h3>How It Works</h3>
        <div style={{ display:'grid', gap:'12px', marginTop:'12px' }}>
          <div style={{ background:'white', padding:'14px', borderRadius:'12px' }}>1️⃣ Post Job with photo + location + budget</div>
          <div style={{ background:'white', padding:'14px', borderRadius:'12px' }}>2️⃣ Artisans in Ghana & Nigeria see it + WhatsApp you</div>
          <div style={{ background:'white', padding:'14px', borderRadius:'12px' }}>3️⃣ Check Portfolio 📸 - See real completed works!</div>
        </div>
      </div>
    </div>
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
      </Routes>
    </Router>
  );
        }
