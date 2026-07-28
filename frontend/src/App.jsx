import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const logout = () => { localStorage.clear(); window.location.href = '/login'; };

  return (
    <BrowserRouter>
      <nav style={{ padding: '12px', background: '#5a31f5', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none', fontSize: '18px' }}>CraftSure 🇳🇬</Link>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Link to="/jobs" style={{ color: 'white', textDecoration: 'none' }}>Jobs</Link>
          {user ? <><span style={{ fontSize: '12px' }}>{user.name}</span><button onClick={logout} style={{ background: 'white', color: '#5a31f5', border: 'none', padding: '6px 12px', borderRadius: '6px' }}>Logout</button></> : <><Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link><Link to="/register" style={{ background: 'white', color: '#5a31f5', padding: '6px 12px', borderRadius: '6px', textDecoration: 'none' }}>Register</Link></>}
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
