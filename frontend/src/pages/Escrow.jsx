import { useEffect, useState } from 'react';

export default function Escrow(){
  const [escrows,setEscrows]=useState([]);
  useEffect(()=>{
    const local=JSON.parse(localStorage.getItem('escrows')||'[]');
    fetch('https://craftsure-1.onrender.com/api/escrow/all').then(r=>r.json()).then(d=>{
      const server=Array.isArray(d)?d:d.escrows||[];
      setEscrows([...server,...local]);
    }).catch(()=>setEscrows(local));
  },[]);

  const clear=()=>{ if(confirm('Clear all local escrows?')){ localStorage.removeItem('escrows'); window.location.reload(); } };

  return(
    <div style={{ padding:'15px', background:'#f5f7fb', minHeight:'100vh' }}>
      <div style={{ display:'flex', justifyContent:'space-between' }}>
        <h2>Escrow - 15% Profit</h2>
        <button onClick={clear} style={{ fontSize:'11px', height:'30px' }}>Clear Local</button>
      </div>
      <div style={{ background:'#fffbeb', padding:'10px', borderRadius:'10px', fontSize:'12px' }}>Client 5% + Artisan 10% = You keep 15%! Phone hidden until funded!</div>
      {escrows.length===0 && <div style={{ background:'white', padding:'20px', marginTop:'10px', borderRadius:'10px' }}>No escrows yet. Go to Artisans → Click Hire!</div>}
      {escrows.map(m=>(
        <div key={m._id} style={{ background:'white', padding:'14px', borderRadius:'12px', marginTop:'10px' }}>
          <b>{m.jobTitle}</b> - {m.clientName} to {m.artisanName}<br/>
          <span style={{ fontSize:'13px' }}>Price: {m.totalAmount} - Profit {(m.totalAmount*0.15).toFixed(0)} | {m.status}</span><br/>
          <a href={`/chat/${m._id}`} style={{ background:'#f59e0b', color:'white', padding:'8px 10px', borderRadius:'8px', textDecoration:'none', fontSize:'12px', display:'inline-block', marginTop:'8px' }}>Chat 💬</a>
        </div>
      ))}
    </div>
  );
}
