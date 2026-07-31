import { useState, useEffect } from 'react';

export default function Artisans(){
  const [artisans,setArtisans]=useState([]);
  const [filter,setFilter]=useState('');

  useEffect(()=>{
    const load=async()=>{
      let list=[];
      try{
        const res=await fetch('https://craftsure-1.onrender.com/api/users').then(r=>r.json()).catch(()=>[]);
        const arr=Array.isArray(res)? res : res.users||res.artisans||[];
        if(arr.length>0) list=arr;
      }catch{}
      // FALLBACK MOCK - So page never blank!
      if(list.length===0){
        list=[
          {_id:'1', name:'James Ugee', skill:'Carpentry', location:'Makurdi, Nigeria', phone:'07066401403'},
          {_id:'2', name:'Ushi Nicholas Tersoo', skill:'Roofing & Parapet', location:'Accra, Ghana'},
          {_id:'3', name:'Emeka Builder', skill:'Masonry', location:'Umuahia, Abia'},
          {_id:'4', name:'Ama Hair Stylist', skill:'Ghana Weave', location:'Umudike, Umuahia'}
        ];
      }
      setArtisans(list);
    };
    load();
  },[]);

  const hire=async(a)=>{
    const user=JSON.parse(localStorage.getItem('user')||'null');
    if(!user){ alert('Login first!'); window.location.href='/login'; return; }
    const title=prompt(`Hire ${a.name} for what job?`,'Parapet and roofing');
    if(!title) return;
    const amount=parseInt(prompt(`Price for ${a.name}`, '70000'));
    if(!amount) return;
    if(!confirm(`Price ₦${amount} + 5% fee ₦${Math.round(amount*0.05)} = Total ₦${amount+Math.round(amount*0.05)}\n🔒 Phone hidden until funded! Admin sees chats!`)) return;
    const escrow=await fetch('https://craftsure-1.onrender.com/api/escrow/create',{
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ jobId:'art-'+Date.now(), jobTitle:title, clientId:user._id||user.id, clientName:user.name, artisanId:a._id||a.id, artisanName:a.name, artisanPhone:a.phone||'', totalAmount:amount })
    }).then(r=>r.json());
    alert('Escrow Created! Go to Escrow page!');
    window.location.href='/escrow';
  };

  const filtered=artisans.filter(a=>{
    const f=filter.toLowerCase();
    return!f || (a.skill||'').toLowerCase().includes(f) || (a.name||'').toLowerCase().includes(f) || (a.location||'').toLowerCase().includes(f);
  });

  return(
    <div style={{ padding:'15px', background:'#f5f7fb', minHeight:'100vh' }}>
      <input value={filter} onChange={e=>setFilter(e.target.value)} placeholder="Search skill, name, location e.g. Carpentry, Makurdi" style={{ width:'100%', padding:'12px', borderRadius:'10px', border:'1px solid #ddd' }} />
      <div style={{ background:'#fffbeb', padding:'10px', borderRadius:'10px', marginTop:'10px', fontSize:'12px' }}>
        🔒 Anti-bypass: No WhatsApp! Client must fund 5% to chat! You keep 15%! Admin → Load All Chats to spy!
      </div>
      <div style={{ marginTop:'15px', display:'grid', gap:'12px' }}>
        {filtered.map(a=>(
          <div key={a._id} style={{ background:'white', padding:'14px', borderRadius:'14px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div><b>{a.name}</b><br/><span style={{ color:'#5a31f5', fontSize:'13px' }}>{a.skill}</span><br/><span style={{ fontSize:'12px', color:'#666' }}>📍 {a.location} | 🔒 Phone hidden | ⭐ New</span></div>
            <button onClick={()=>hire(a)} style={{ background:'#f59e0b', color:'white', border:'none', padding:'10px 14px', borderRadius:'10px', fontWeight:'bold' }}>Hire 💰</button>
          </div>
        ))}
      </div>
    </div>
  );
}
