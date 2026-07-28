import { useState } from 'react';
const API_URL = 'https://craftsure-1.onrender.com/api';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', role: 'customer', location: 'Makurdi, Benue', skill: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.phone.length < 10) return alert('Enter valid phone e.g. 08012345678');
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        alert(`Welcome ${data.user.name}! ✅`);
        window.location.href = '/jobs';
      } else {
        alert(data.msg);
      }
    } catch { alert('Backend sleeping, try again in 30s'); }
  };

  return (
    <div style={{ maxWidth: '450px', margin: '30px auto', padding: '20px', background: 'white', borderRadius: '12px' }}>
      <h2>Join CraftSure Nigeria 🇳🇬</h2>
      <p style={{ fontSize: '13px', color: '#666' }}>Customers post jobs, Artisans get jobs</p>
      
      <input placeholder="Full Name e.g. Nicholas Tersoo Ushi" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} style={inputStyle} required />
      <input placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} style={inputStyle} required />
      <input placeholder="WhatsApp Phone e.g. 080..." value={form.phone} onChange={e=>setForm({...form, phone: e.target.value})} style={inputStyle} required />
      
      <select value={form.role} onChange={e=>setForm({...form, role: e.target.value})} style={inputStyle}>
        <option value="customer">I want to HIRE artisans (Customer)</option>
        <option value="artisan">I am an ARTISAN looking for work</option>
      </select>

      {form.role === 'artisan' && (
        <select value={form.skill} onChange={e=>setForm({...form, skill: e.target.value})} style={inputStyle}>
          <option value="">Select Your Skill</option>
          <option>Carpentry</option><option>Masonry</option><option>Electrical</option><option>Plumbing</option><option>Welding</option><option>Painting</option><option>Tailoring</option><option>Other</option>
        </select>
      )}

      <input placeholder="Location e.g. Makurdi, Benue" value={form.location} onChange={e=>setForm({...form, location: e.target.value})} style={inputStyle} />
      <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form, password: e.target.value})} style={inputStyle} required />

      <button onClick={handleSubmit} style={btnStyle}>Create Account</button>
      <p style={{ textAlign: 'center', marginTop: '15px' }}>Already have account? <a href="/login">Login</a></p>
    </div>
  );
}
const inputStyle = { width: '100%', padding: '14px', margin: '8px 0', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px' };
const btnStyle = { width: '100%', padding: '16px', background: '#5a31f5', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', fontSize: '16px', marginTop: '10px' };
