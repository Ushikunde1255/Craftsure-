import { useEffect, useState } from 'react';

export default function Artisans() {
  const [artisans, setArtisans] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetch('https://craftsure-1.onrender.com/api/artisans')
   .then(r=>r.json())
   .then(data=>{
      const list = Array.isArray(data)? data : data.artisans || data.users || [];
      console.log('artisans', list.length);
      setArtisans(list);
    })
   .catch(()=> setArtisans([]));
  }, []);

  const hire = async (a) => {
    const user = JSON.parse(localStorage.getItem('user')||'null');
    if(!user){ alert('Login first!'); return; }
    const title = prompt(`Hire ${a.name} for what job?`, 'Parapet and roofing');
    if(!title) return;
    const amount = parseInt(prompt(`Price for ${a.name}`, '70000'));
    if(!amount) return;
    const fee = Math.round(amount*0.05);
    if(!confirm(`💰 ESCROW:\nPrice ₦${amount}\nFee 5% ₦${fee}\nTotal ₦${amount+fee}\n🔒 Phone hidden until funded!\nChat inside app! Admin sees all chats!`)) return;
    await fetch('https://craftsure-1.onrender.com/api/escrow/create',{
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        jobId:'art-'+Date.now(), jobTitle:title,
        clientId:user._id||user.id, clientName:user.name,
        artisanId:a._id||a.id, artisanName:a.name, artisanPhone:a.phone||'',
        totalAmount:amount
      })
    }).then(r=>r.json()).then(e=>{
      alert(`✅ Escrow Created! Go to Escrow page!`);
      window.location.href='/escrow';
    });
  };

  const filtered = artisans.filter(a=>{
    const s = (a.skill||a.trade||'').toLowerCase();
    const n = (a.name||'').toLowerCase();
    const l = (a.location||'').toLowerCase();
    const f = filter.toLowerCase();
    return!f || s.includes(f) || n.includes(f) || l.includes(f);
  });

  return (
    <div style={{ padding:'15px', background:'#f5f7fb', minHeight:'100vh' }}>
      <input value={filter} onChange={e=>setFilter(e.target.value)} placeholder="Search skill, name, location e.g. Carpentry, Makurdi" style={{ width:'100%', padding:'12px', borderRadius:'10px', border:'1px solid #ddd' }} />
      <div style={{ background:'#fffbeb', padding:'10px', borderRadius:'10px', marginTop:'10px', fontSize:'12px' }}>
        🔒 Anti-bypass: No WhatsApp shown! Client must fund escrow 5% to chat! You keep 15%! Admin can read all chats in Admin → Load All Chats!
      </div>
      <div style={{ marginTop:'15px', display:'grid', gap:'12px' }}>
        {filtered.length===0 && <div style={{ background:'white', padding:'20px', borderRadius:'12px', textAlign:'center' }}>No artisans found. Check backend /api/artisans has data. You have {artisans.length} loaded.</div>}
        {filtered.map(a=>(
          <div key={a._id||a.id} style={{ background:'white', padding:'14px', borderRadius:'14px', display:'flex', justifyContent:'space-between' }}>
            <div>
              <b>{a.name}</b><br/>
              <span style={{ color:'#5a31f5', fontSize:'13px' }}>{a.skill||a.trade||'General Artisan'}</span><br/>
              <span style={{ fontSize:'12px', color:'#666' }}>📍 {a.location||'Nigeria'} | ⭐ New | 🔒 Phone hidden</span>
            </div>
            <button onClick={()=>hire(a)} style={{ background:'#f59e0b', color:'white', border:'none', padding:'10px 14px', borderRadius:'10px', fontWeight:'bold', height:'40px' }}>Hire 💰</button>
          </div>
        ))}
      </div>
    </div>
  );
}
