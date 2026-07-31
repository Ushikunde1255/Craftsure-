import { useEffect, useState } from 'react';

export default function Admin(){
  const [escrows,setEscrows]=useState([]);
  const [chats,setChats]=useState([]);
  const [showChats,setShowChats]=useState(false);

  useEffect(()=>{
    const local=JSON.parse(localStorage.getItem('escrows')||'[]');
    fetch('https://craftsure-1.onrender.com/api/escrow/all').then(r=>r.json()).then(d=>{
      const server=Array.isArray(d)?d:d.escrows||[];
      const all=[...server,...local];
      setEscrows(all);
    }).catch(()=>setEscrows(local));
  },[]);

  const total=escrows.reduce((s,e)=>s+(e.totalAmount*0.15||0),0);
  const clientFees=escrows.reduce((s,e)=>s+(e.totalAmount*0.05||0),0);
  const artisanFees=escrows.reduce((s,e)=>s+(e.totalAmount*0.10||0),0);

  const loadChats=()=>{
    const all=JSON.parse(localStorage.getItem('all_chats')||'[]');
    setChats(all);
    setShowChats(true);
    if(all.length===0) alert('No chats yet locally! Chat in Escrow → Chat button!');
  };

  const del=(id)=>{
    if(!confirm('Delete this escrow?')) return;
    const filtered=escrows.filter(e=>e._id!==id);
    localStorage.setItem('escrows',JSON.stringify(filtered.filter(e=>e._id.startsWith('escrow_'))));
    setEscrows(filtered);
  };

  return(
    <div style={{ padding:'15px', background:'#f5f7fb', minHeight:'100vh' }}>
      <h2 style={{ color:'#2d1b9c' }}>CraftSure Admin 💰 Profit Dashboard</h2>
      <p style={{ fontSize:'12px' }}>Founder: Ushi Nicholas | 5% + 10% = 15%</p>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginTop:'10px' }}>
        <div style={{ background:'white', padding:'12px', borderRadius:'12px', borderLeft:'5px solid #22c55e' }}>
          <span style={{ fontSize:'12px' }}>Total Jobs</span><br/><b style={{ fontSize:'24px' }}>{escrows.length}</b>
        </div>
        <div style={{ background:'white', padding:'12px', borderRadius:'12px', borderLeft:'5px solid #4f46e5' }}>
          <span style={{ fontSize:'12px' }}>Total Profit (YOUR MONEY)</span><br/><b style={{ fontSize:'24px', color:'#4f46e5' }}>₦{total.toFixed(0)}</b>
        </div>
        <div style={{ background:'white', padding:'12px', borderRadius:'12px' }}>
          <span style={{ fontSize:'12px' }}>Client Fees 5%</span><br/><b>₦{clientFees.toFixed(0)}</b>
        </div>
        <div style={{ background:'white', padding:'12px', borderRadius:'12px' }}>
          <span style={{ fontSize:'12px' }}>Artisan Fees 10%</span><br/><b>₦{artisanFees.toFixed(0)}</b>
        </div>
      </div>

      <div style={{ background:'white', padding:'12px', borderRadius:'12px', marginTop:'12px' }}>
        <b>Recent Escrow Jobs - Tap Delete to remove old test</b>
        {escrows.map(e=>(
          <div key={e._id} style={{ borderBottom:'1px solid #eee', padding:'8px 0', display:'flex', justifyContent:'space-between' }}>
            <div style={{ fontSize:'13px' }}><b>{e.jobTitle}</b> - ₦{e.totalAmount} - {e.clientName}→{e.artisanName} <span style={{ color:'#4f46e5' }}>Profit ₦{(e.totalAmount*0.15).toFixed(0)}</span></div>
            <button onClick={()=>del(e._id)} style={{ background:'#ef4444', color:'white', border:'none', padding:'4px 8px', borderRadius:'6px', fontSize:'11px' }}>Delete</button>
          </div>
        ))}
      </div>

      <div style={{ background:'white', padding:'12px', borderRadius:'12px', marginTop:'12px' }}>
        <b>👮 Admin Spy - All Chats (Can read client-artisan chat!)</b><br/>
        <span style={{ fontSize:'12px' }}>YES! Admin can read all chats! If they try to share phone, you see ⚠️ PHONE ATTEMPT!</span><br/>
        <button onClick={loadChats} style={{ background:'black', color:'white', border:'none', padding:'10px 14px', borderRadius:'10px', marginTop:'8px' }}>Load All Chats</button>

        {showChats && (
          <div style={{ marginTop:'10px', maxHeight:'300px', overflowY:'auto', background:'#f9fafb', padding:'10px', borderRadius:'8px' }}>
            {chats.length===0? <div>No chats yet</div> : chats.map((c,i)=>(
              <div key={i} style={{ fontSize:'12px', padding:'6px', borderBottom:'1px solid #eee', background: c.isPhoneAttempt?'#fee2e2':'transparent' }}>
                <b>{c.escrowId.slice(0,6)}</b> {c.sender}: {c.text} {c.isPhoneAttempt && '⚠️ PHONE!'} <span style={{ color:'#666' }}>{c.time}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ background:'#fffbeb', border:'1px solid #fde68a', padding:'12px', borderRadius:'12px', marginTop:'12px' }}>
        <b>💡 Anti-bypass how it works:</b><br/>
        <span style={{ fontSize:'12px' }}>1. Jobs page has NO WhatsApp before escrow (you hide)<br/>2. Must fund 35% to chat<br/>3. All chats monitored - phone attempt flagged<br/>4. You keep 15%!</span>
      </div>
    </div>
  );
}
