import { useEffect, useState } from 'react';

export default function Artisans() {
  const [artisans, setArtisans] = useState([]);
  const [filter, setFilter] = useState('');
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    fetch('https://craftsure-1.onrender.com/api/artisans')
   .then(r=>r.json()).then(data=>{
      const list = Array.isArray(data)? data : data.artisans || [];
      setArtisans(list);
      list.forEach(async a=>{
        const id = a._id || a.id;
        const r = await fetch(`https://craftsure-1.onrender.com/api/escrow/ratings/${id}`).then(r=>r.json()).catch(()=>({avg:0,count:0}));
        setRatings(prev=>({...prev,[id]: r}));
      });
    });
  }, []);

  const hire = async (artisan) => {
    const user = JSON.parse(localStorage.getItem('user')||'null');
    if(!user){ alert('Login first!'); return; }
    const title = prompt(`Hire ${artisan.name} for what job?`, 'Parapet and roofing');
    if(!title) return;
    const amount = parseInt(prompt(`Enter price for ${artisan.name} - ${title}`, '70000'));
    if(!amount) return;
    const fee = Math.round(amount*0.05);
    if(!confirm(`💰 ESCROW:\nPrice: ₦${amount}\nSafety Fee 5%: ₦${fee}\nTotal: ₦${amount+fee}\n\n🔒 Chat inside app! Phone hidden until funded!\nContinue?`)) return;

    const res = await fetch('https://craftsure-1.onrender.com/api/escrow/create',{
      method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        jobId:'artisan-'+Date.now(), jobTitle:title,
        clientId:user._id||user.id, clientName:user.name,
        artisanId:artisan._id||artisan.id, artisanName:artisan.name, artisanPhone:artisan.phone||'',
        totalAmount:amount
      })
    });
    const escrow = await res.json();
    alert(`✅ Escrow Created! ${escrow._id}\nGo to Escrow page to chat!`);
    window.location.href='/escrow';
  };

  const filtered = artisans.filter(a=>
   !filter || a.skill?.toLowerCase().includes(filter.toLowerCase()) ||
    a.name?.toLowerCase().includes(filter.toLowerCase()) ||
    a.location?.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div style={{ padding:'15px', background:'#f5f7fb', minHeight:'100vh' }}>
      <input value={filter} onChange={e=>setFilter(e.target.value)} placeholder="Search skill, name, location e.g. Carpentry, Makurdi" style={{ width:'100%', padding:'12px', borderRadius:'10px', border:'1px solid #ddd' }} />
      <div style={{ display:'flex', gap:'8px', marginTop:'10px' }}>
        <select onChange={e=>setFilter(e.target.value)} style={{ padding:'8px', borderRadius:'8px' }}>
          <option value="">All Locations 🌍</option><option>Abia</option><option>Accra</option><option>Makurdi</option>
        </select>
        <select onChange={e=>setFilter(e.target.value)} style={{ padding:'8px', borderRadius:'8px' }}>
          <option value="">All Skills 🔧</option><option>Carpentry</option><option>General Artisan</option>
        </select>
      </div>

      <div style={{ marginTop:'15px', display:'grid', gap:'12px' }}>
        {filtered.map(a=>{
          const id = a._id || a.id;
          const r = ratings[id] || {avg:0,count:0};
          return (
            <div key={id} style={{ background:'white', padding:'14px', borderRadius:'14px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div>
                <b>{a.name}</b> <span style={{ fontSize:'12px', color:'#5a31f5', marginLeft:'8px' }}>👁 View Works</span> {r.count>0 && <span style={{ fontSize:'12px', background:'#fef3c7', padding:'2px 6px', borderRadius:'6px' }}>⭐{r.avg} ({r.count})</span>}<br/>
                <span style={{ color:'#5a31f5', fontSize:'13px' }}>{a.skill || 'General Artisan'}</span><br/>
                <span style={{ fontSize:'12px', color:'#666' }}>📍 {a.location || 'Nigeria'} | ⭐ Rating: {r.avg||'New'} | 🔒 Phone hidden until escrow</span>
              </div>
              <button onClick={()=>hire(a)} style={{ background:'#f59e0b', color:'white', border:'none', padding:'10px 16px', borderRadius:'10px', fontWeight:'bold', fontSize:'13px' }}>Hire via Escrow 💰</button>
            </div>
          )
        })}
      </div>

      <div style={{ fontSize:'11px', color:'#666', marginTop:'15px', background:'#fffbeb', padding:'10px', borderRadius:'8px' }}>
        🔒 Anti-bypass: No WhatsApp shown! Client must fund escrow 5% to chat! You keep 15%! Admin can read all chats in Admin → Load All Chats!
      </div>
    </div>
  );
}
