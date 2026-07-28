import { useState } from 'react';
const API_URL = 'https://craftsure-1.onrender.com/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        alert(`Welcome back ${data.user.name}!`);
        window.location.href = '/jobs';
      } else {
        alert(data.msg);
      }
    } catch { alert('Backend sleeping, wait 30s'); }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', padding: '20px', background: 'white', borderRadius: '12px' }}>
      <h2>Login to CraftSure</h2>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={{ width: '100%', padding: '14px', margin: '8px 0', borderRadius: '8px', border: '1px solid #ccc' }} />
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} style={{ width: '100%', padding: '14px', margin: '8px 0', borderRadius: '8px', border: '1px solid #ccc' }} />
      <button onClick={handleLogin} style={{ width: '100%', padding: '16px', background: '#5a31f5', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', marginTop: '10px' }}>Login</button>
      <p style={{ textAlign: 'center', marginTop: '15px' }}>No account? <a href="/register">Register</a></p>
    </div>
  );
}
