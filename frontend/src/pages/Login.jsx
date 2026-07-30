import { useState } from 'react';
export default function Login(){
  const [email,setEmail]=useState(''); const [pass,setPass]=useState('');
  const login = async ()=>{
    const res = await fetch('https://craftsure-1.onrender.com/api/auth/login',{
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({email,password:pass})
    }).then(r=>r.json());
    if(res.token || res._id){
      localStorage.setItem('user', JSON.stringify(res.user||res));
      alert('Welcome '+ (res.user?.name||res.name));
      window.location.href='/';
    } else alert('Login failed: '+(res.message||'Check email/pass'));
  };
  return (
    <div style={{ padding:'20px', maxWidth:'400px', margin:'40px auto', background:'white', borderRadius:'14px' }}>
      <h2>Login to CraftSure</h2>
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" style={{ width:'100%', padding:'12px', marginTop:'10px', borderRadius:'8px', border:'1px solid #ddd' }} />
      <input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Password" style={{ width:'100%', padding:'12px', marginTop:'10px', borderRadius:'8px', border:'1px solid #ddd' }} />
      <button onClick={login} style={{ width:'100%', background:'#5a31f5', color:'white', padding:'12px', borderRadius:'10px', border:'none', marginTop:'15px', fontWeight:'bold' }}>Login</button>
      <div style={{ marginTop:'12px', fontSize:'14px' }}>No account? <a href="/signup" style={{ color:'#5a31f5' }}>Sign Up</a></div>
    </div>
  );
}
