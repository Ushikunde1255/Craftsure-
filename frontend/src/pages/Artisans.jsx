import { useState } from 'react';

export default function Artisans(){
  const [filter,setFilter]=useState('');
  const artisans=[
    {_id:'1', name:'James Ugee', skill:'Carpentry', location:'Makurdi, Nigeria'},
    {_id:'2', name:'Ushi Nicholas Tersoo', skill:'Roofing & Parapet', location:'Accra, Ghana'},
    {_id:'3', name:'Emeka Builder', skill:'Masonry', location:'Umuahia, Abia'},
    {_id:'4', name:'Ama Hair Stylist', skill:'Ghana Weave', location:'Umudike'},
    {_id:'5', name:'Kwame Electrician', skill:'Electrical', location:'Kumasi, Ghana'}
  ];

  const hire=async(a)=>{
    const u=localStorage.getItem('user');
    if(!u){ alert('Login first!'); window.location.href='/login'; return; }
    const user=JSON.parse(u);
    const title=window.prompt(`Hire ${a.name} for what job?`,'Parapet and roofing');
    if(!title) return;
    const amountStr=window.prompt(`Price for ${a.name} NGN`, '70000');
    if(!amountStr) return;
    const amount=parseInt(amountStr);
    const fee=Math.round(amount*0.05);
    if(!window.confirm(`Price: ${amount}\nFee 5%: ${fee}\nTotal: ${amount+fee}\n\nPhone hidden until funded! OK?`)) return;

    alert('Creating escrow... if backend sleeping, we save locally! Wait 5s...');
    const newEscrow={
      _id:'escrow_'+Date.now(),
      jobTitle:title,
      clientName:user.name,
      artisanName:a.name,
      totalAmount:amount,
      status:'awaiting 35%',
      m35Paid:false,m75Paid:false,m100Paid:false
    };
    // SAVE LOCALLY FIRST - ALWAYS WORKS!
    const local=JSON.parse(localStorage.getItem('escrows')||'[]');
    local.push(newEscrow);
    localStorage.setItem('escrows',JSON.stringify(local));

    try{
      await fetch('https://craftsure-1.onrender.com/api/escrow/create',{
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ jobId:newEscrow._id, jobTitle:title, clientId:user._id||'c1', clientName:user.name, artisanId:a._id, artisanName:a.name, totalAmount:amount })
      });
    }catch{}

    alert('✅ Escrow Created! Go to Escrow page now!');
    window.location.href='/escrow';
  };

  const filtered=artisans.filter(a=>!filter || a.skill.toLowerCase().includes(filter.toLowerCase()) || a.name.toLowerCase().includes(filter.toLowerCase()));

  return(
    <div style={{ padding:'15px', background:'#f5f7fb', minHeight:'100vh' }}>
      <input value={filter} onChange={e=>setFilter(e.target.value)} placeholder="Search skill, name, location e.g. Carpentry, Makurdi" style={{ width:'100%', padding:'12px', borderRadius:'10px', border:'1px solid #ddd' }} />
      <div style={{ background:'#fffbeb', padding:'10px', borderRadius:'10px', marginTop:'10px', fontSize:'12px' }}>🔒 Phone hidden! Must fund 5% to chat! If Hire not clicking, allow popups!</div>
      {artisans.filter(a=>!filter || a.skill.toLowerCase().includes(filter.toLowerCase()) || a.name.toLowerCase().includes(filter.toLowerCase())).map(a=>(
        <div key={a._id} style={{ background:'white', padding:'14px', borderRadius:'14px', display:'flex', justifyContent:'space-between', marginTop:'10px' }}>
          <div><b>{a.name}</b><br/><span style={{ color:'#5a31f5' }}>{a.skill}</span><br/><span style={{ fontSize:'12px' }}>📍 {a.location} | 🔒 Hidden</span></div>
          <button onClick={()=>hire(a)} style={{ background:'#f59e0b', color:'white', border:'none', padding:'12px 16px', borderRadius:'10px', fontWeight:'bold' }}>Hire 💰</button>
        </div>
      ))}
    </div>
  );
}
