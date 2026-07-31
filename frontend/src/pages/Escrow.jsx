import { useEffect, useState } from 'react';

export default function Escrow(){
  const [escrows,setEscrows]=useState([]);
  useEffect(()=>{
    fetch('https://craftsure-1.onrender.com/api/escrow/all')
    .then(r=>r.json()).then(d=>setEscrows(Array.isArray(d)?d:d.escrows||[]))
    .catch(()=>setEscrows([]));
  },[]);

  const fund = async (id, stage) => {
    const res = await fetch(`https://craftsure-1.onrender.com/api/escrow/${id}/fund`,{
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ stage })
    }).then(r=>r.json());
    alert('Funded '+stage+'! ');
    window.location.reload();
  };

  return(
    <div style={{ padding:'15px', background:'#f5f7fb', minHeight:'100vh' }}>
      <h2>Escrow Dashboard - 15% Profit</h2>
      <div style={{ background:'#fffbeb', padding:'10px', borderRadius:'10px', margin:'10px 0', fontSize:'12px' }}>
        Client pays 5% fee + Artisan pays 10% fee = You keep 15%! Phone hidden until funded! Admin can read chats!
      </div>
      {escrows.length===0 && <div style={{ background:'white', padding:'20px', borderRadius:'10px' }}>No escrows yet. Hire an artisan to create one!</div>}
      {escrows.map(m=>(
        <div key={m._id} style={{ background:'white', padding:'14px', borderRadius:'12px', marginBottom:'12px' }}>
          <b>{m.jobTitle}</b> - {m.clientName} to {m.artisanName}<br/>
          <span style={{ fontSize:'13px' }}>
            Price: {m.totalAmount} - Fee 5% + 10% = Profit {(m.totalAmount*0.15).toFixed(0)}<br/>
            Artisan will get: {(m.artisanAmount||m.totalAmount*0.9).toFixed(0)}<br/>
            Status: {m.status} | 35% {m.m35Paid?'PAID':'unpaid'} | 75% {m.m75Paid?'PAID':'unpaid'}
          </span>
          <div style={{ display:'flex', gap:'6px', marginTop:'10px', flexWrap:'wrap' }}>
            <button onClick={()=>fund(m._id,'m35')} style={{ background: m.m35Paid?'green':'#2d1b9c', color:'white', border:'none', padding:'8px 10px', borderRadius:'8px', fontSize:'12px' }}>{m.m35Paid?'35% Paid':'Pay 35%'}</button>
            <button onClick={()=>fund(m._id,'m75')} style={{ background: m.m75Paid?'green':'#2d1b9c', color:'white', border:'none', padding:'8px 10px', borderRadius:'8px', fontSize:'12px' }}>{m.m75Paid?'75% Paid':'Pay 75%'}</button>
            <button onClick={()=>fund(m._id,'m100')} style={{ background: m.m100Paid?'green':'#2d1b9c', color:'white', border:'none', padding:'8px 10px', borderRadius:'8px', fontSize:'12px' }}>{m.m100Paid?'100% Paid':'Pay 100%'}</button>
            <a href={`/chat/${m._id}`} style={{ background:'#f59e0b', color:'white', padding:'8px 10px', borderRadius:'8px', textDecoration:'none', fontSize:'12px' }}>Chat</a>
          </div>
        </div>
      ))}
    </div>
  );
}
