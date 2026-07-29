import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import Artisans from './pages/Artisans';
import PostJob from './pages/PostJob';
import Login from './pages/Login';
import Register from './pages/Register';

function Nav(){
  const user = JSON.parse(localStorage.getItem('user')||'null');
  const nav = useNavigate();
  const logout = ()=>{ localStorage.clear(); nav('/'); window.location.reload(); };
  return(
    <div style={{ background:'#5a31f5', color:'white', padding:'12px 15px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
      <Link to="/" style={{ color:'white', fontWeight:'bold', fontSize:'20px', textDecoration:'none' }}>CraftSure 🇳🇬</Link>
      <div style={{ display:'flex', gap:'10px', alignItems:'center' }}>
        <Link to="/jobs" style={{ color:'white', textDecoration:'none', fontSize:'14px' }}>Jobs</Link>
<Link to="/artisans" style={{ color:'white', textDecoration:'none', fontSize:'14px' }}>Artisans</Link>
<Link to="/post" style={{ background:'white', color:'#5a31f5', padding:'6px 12px', borderRadius:'6px', textDecoration:'none', fontWeight:'bold', fontSize:'14px' }}>+ Post</Link>
        <Link to="/post" style={{ background:'white', color:'#5a31f5', padding:'6px 12px', borderRadius:'6px', textDecoration:'none', fontWeight:'bold' }}>+ Post</Link>
        {user? <><span style={{ fontSize:'11px' }}>{user.name.split(' ')[0]}</span><button onClick={logout} style={{ background:'white', color:'#5a31f5', border:'none', padding:'6px 10px', borderRadius:'6px' }}>Logout</button></> : <><Link to="/login" style={{ color:'white', textDecoration:'none' }}>Login</Link><Link to="/register" style={{ background:'#22c55e', color:'white', padding:'6px 12px', borderRadius:'6px', textDecoration:'none' }}>Join</Link></>}
      </div>
    </div>
  );
}

export default function App(){
  return(
    <BrowserRouter>
      <Nav/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/jobs" element={<Jobs/>}/>
        <Route path="/artisans" element={<Artisans/>}/>
        <Route path="/post" element={<PostJob/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  );
}
