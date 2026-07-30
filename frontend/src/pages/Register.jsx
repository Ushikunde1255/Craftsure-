import { useState } from 'react';
export default function Signup(){
  const [name,setName]=useState(''); const [email,setEmail]=useState(''); const [pass,setPass]=useState(''); const [role,setRole]=useState('client'); const [location,setLocation]=useState(''); const [skill,setSkill]=useState('');
  const signup = async ()=>{
    const body = { name, email, password:pass, role, location, skill };
    const res = await fetch('https://craftsure-1.onrender.com/api/auth/register',{
      method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body)
    }).then(r=>r.json());
    if(res._id || res.token){
      localStorage.setItem('user', JSON.stringify(res.user||res));
      alert('Account created! Welcome '+name);
      window.location.href='/';
    } else alert('Signup failed: '+(res.message||JSON.stringify(res)));
  };
  return (
    <div style={{ padding:'20px', maxWidth:'400px', margin:'20px auto', background:'white', borderRadius:'14px' }}>
      <h2>Join CraftSure 🇳🇬🇬🇭</h2>
      <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full Name" style={{ width:'100%', padding:'12px', marginTop:'10px', borderRadius:'8px', border:'1px solid #ddd' }} />
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" style={{ width:'100%', padding:'12px', marginTop:'10px', borderRadius:'8px', border:'1px solid #ddd' }} />
      <input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Password" style={{ width:'100%', padding:'12px', marginTop:'10px', borderRadius:'8px', border:'1px solid #ddd' }} />
      <select value={role} onChange={e=>setRole(e.target.value)} style={{ width:'100%', padding:'12px', marginTop:'10px', borderRadius:'8px' }}>
        <option value="client">I am Client - I want to hire</option><option value="artisan">I am Artisan - I want jobs</option>
      </select>
      <input value={location} onChange={e=>setLocation(e.target.value)} placeholder="Location e.g. Makurdi, Accra" style={{ width:'100%', padding:'12px', marginTop:'10px', borderRadius:'8px', border:'1px solid #ddd' }} />
      {role==='artisan' && <input value={skill} onChange={e=>setSkill(e.target.value)} placeholder="Skill e.g. Carpentry, Roofing" style={{ width:'100%', padding:'12px', marginTop:'10px', borderRadius:'8px', border:'1px solid #ddd' }} />}
      <button onClick={signup} style={{ width:'100%', background:'#5a31f5', color:'white', padding:'12px', borderRadius:'10px', border:'none', marginTop:'15px', fontWeight:'bold' }}>Create Account</button>
      <div style={{ marginTop:'12px', fontSize:'14px' }}>Have account? <a href="/login" style={{ color:'#5a31f5' }}>Login</a></div>
    </div>
  );
}
