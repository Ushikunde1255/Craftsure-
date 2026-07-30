import { useEffect, useState } from 'react';

export default function Admin() {
  const [stats, setStats] = useState(null);
  const [chats, setChats] = useState([]);

  const loadStats = () => {
    fetch('https://craftsure-1.onrender.com/api/escrow/admin/stats')
    .then(r => r.json()).then(setStats);
  };

  useEffect(() => { loadStats(); }, []);

  const deleteEscrow = async (id) => {
    if (!confirm('Delete this old test escrow? Your profit will be recalculated!')) return;
    await fetch(`https://craftsure-1.onrender.com/api/escrow/${id}`, { method: 'DELETE' });
    alert('Deleted! Refreshing...');
    loadStats();
  };

  const loadChats = async () => {
    const r = await fetch('https://craftsure-1.onrender.com/api/escrow/admin/chats').then(r=>r.json());
    setChats(r);
  };

  if (!stats) return <div style={{ padding:'20px' }}>Loading profit dashboard... 💰</div>;

  return (
    <div style={{ padding:'15px', background:'#f5f7fb', minHeight:'100vh' }}>
      <h2 style={{ color:'#2d1b9c' }}>CraftSure Admin 💰 Profit Dashboard</h2>
      <p style={{ fontSize:'13px', color:'#666' }}>Founder: Ushi Nicholas | 5% + 10% = 15%</p>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', marginTop:'15px' }}>
        <div style={{ background:'white', padding:'15px', borderRadius:'12px', borderLeft:'5px solid #22c55e' }}>
          <div style={{ fontSize:'12px' }}>Total Jobs</div>
          <div style={{ fontSize:'24px', fontWeight:'bold' }}>{stats.totalJobs}</div>
        </div>
        <div style={{ background:'white', padding:'15px', borderRadius:'12px', borderLeft:'5px solid #5a31f5' }}>
          <div style={{ fontSize:'12px' }}>Total Profit (YOUR MONEY)</div>
          <div style={{ fontSize:'24px', fontWeight:'bold', color:'#5a31f5' }}>₦{stats.totalProfit}</div>
        </div>
        <div style={{ background:'white', padding:'15px', borderRadius:'12px' }}>
          <div style={{ fontSize:'12px' }}>Client Fees 5%</div>
          <div style={{ fontSize:'18px', fontWeight:'bold' }}>₦{stats.totalClientFee}</div>
        </div>
        <div style={{ background:'white', padding:'15px', borderRadius:'12px' }}>
          <div style={{ fontSize:'12px' }}>Artisan Fees 10%</div>
          <div style={{ fontSize:'18px', fontWeight:'bold' }}>₦{stats.totalArtisanFee}</div>
        </div>
      </div>

      <div style={{ background:'white', padding:'15px', borderRadius:'12px', marginTop:'15px' }}>
        <b>Recent Escrow Jobs - Tap Delete to remove old test</b>
        <div style={{ marginTop:'10px' }}>
          {stats.allJobs.map(j => (
            <div key={j._id} style={{ display:'flex', justifyContent:'space-between', padding:'10px 0', borderBottom:'1px solid #eee', fontSize:'13px', alignItems:'center' }}>
              <span style={{ flex:1 }}><b>{j.jobTitle}</b> - ₦{j.artisanPrice} - {j.clientName}→{j.artisanName} <span style={{ color:'#5a31f5' }}>Profit ₦{j.craftsureProfit || 0}</span> {(!j.craftsureProfit) && <span style={{ color:'red' }}>(OLD - DELETE ME)</span>}</span>
              <button onClick={()=>deleteEscrow(j._id)} style={{ background:'#ef4444', color:'white', border:'none', padding:'6px 10px', borderRadius:'6px', fontSize:'12px', marginLeft:'8px' }}>Delete</button>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background:'white', padding:'15px', borderRadius:'12px', marginTop:'15px' }}>
        <b>👮 Admin Spy - All Chats (Can read client-artisan chat!)</b><br/>
        <span style={{ fontSize:'11px', color:'#666' }}>YES! Admin can read all chats! If they try to share phone, you see ⚠️ PHONE ATTEMPT!</span>
        <div style={{ marginTop:'10px' }}>
          <button onClick={loadChats} style={{ background:'#111', color:'white', padding:'8px 12px', borderRadius:'8px' }}>Load All Chats</button>
          <div style={{ marginTop:'10px' }}>
            {chats.map((c,i)=>(
              <div key={i} style={{ borderBottom:'1px solid #eee', padding:'8px 0', fontSize:'12px' }}>
                <b>{c.jobTitle}</b> - {c.clientName}→{c.artisanName} - {c.messages.length} msgs {c.messages.some(m=>m.isPhoneAttempt) && <span style={{ color:'red', fontWeight:'bold' }}>⚠️ PHONE ATTEMPT!</span>}<br/>
                <span style={{ color:'#666' }}>Last: {c.messages.slice(-1)[0]?.text || 'No msgs'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background:'#fffbeb', padding:'12px', borderRadius:'10px', marginTop:'15px', border:'1px solid #f59e0b' }}>
        <b>💡 Anti-bypass how it works:</b><br/>
        <span style={{ fontSize:'12px' }}>1. Jobs page has NO WhatsApp before escrow (you removed!)<br/>2. Client must pay 5% fee → escrow → chat opens<br/>3. All chat inside app, you can spy! If phone shared → RED FLAG!<br/>4. You are safe! Like Uber!</span>
      </div>
    </div>
  );
}
