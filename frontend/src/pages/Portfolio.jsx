import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
export default function Portfolio() {
  const [works, setWorks] = useState([]);
  useEffect(()=>{
    fetch('https://craftsure-1.onrender.com/api/portfolio')
     .then(r=>r.json()).then(d=>setWorks(Array.isArray(d)?d:[]));
  },[]);
  return (
    <div style={{ padding:'15px', background:'#f5f7fb', minHeight:'100vh' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <h2 style={{ color:'#5a31f5' }}>Completed Works - {works.length} 📸</h2>
        <Link to="/post-work" style={{ background:'#5a31f5', color:'white', padding:'8px 14px', borderRadius:'8px', textDecoration:'none', fontWeight:'bold' }}>+ Post Work</Link>
      </div>
      <p>Real work done by artisans in Ghana & Nigeria</p>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', marginTop:'15px' }}>
        {works.map(w=>(
          <div key={w._id} style={{ background:'white', borderRadius:'14px', overflow:'hidden', boxShadow:'0 2px 8px rgba(0,0,0,0.06)' }}>
            <img src={w.photoUrl} style={{ width:'100%', height:'160px', objectFit:'cover' }} alt="" />
            <div style={{ padding:'8px' }}>
              <b style={{ fontSize:'13px' }}>{w.title}</b><br/>
              <span style={{ fontSize:'11px', color:'#5a31f5' }}>{w.category} - {w.location}</span><br/>
              <span style={{ fontSize:'10px', color:'#666' }}>{w.artisanName}</span>
            </div>
          </div>
        ))}
      </div>
      {works.length===0 && <p style={{ textAlign:'center', marginTop:'30px' }}>No completed works yet. Be first to post! 🔥</p>}
    </div>
  );
}
