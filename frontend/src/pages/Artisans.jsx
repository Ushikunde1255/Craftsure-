import { useState } from 'react';

export default function Artisans(){
  const [filter,setFilter]=useState('');
  const artisans=[
    {_id:'1', name:'James Ugee', skill:'Carpentry', location:'Makurdi, Nigeria', phone:'07066401403'},
    {_id:'2', name:'Ushi Nicholas Tersoo', skill:'Roofing & Parapet', location:'Accra, Ghana'},
    {_id:'3', name:'Emeka Builder', skill:'Masonry', location:'Umuahia, Abia'},
    {_id:'4', name:'Ama Hair Stylist', skill:'Ghana Weave', location:'Umudike'},
    {_id:'5', name:'Kwame Electrician', skill:'Electrical', location:'Kumasi, Ghana'}
  ];

  const hire=async(a)=>{
    const u=localStorage.getItem('user');
    if(!u){ 
      alert('Please Login first to hire!'); 
      window.location.href='/login'; 
      return; 
    }
    const user=JSON.parse(u);
    const title=prompt(`Hire ${a.name} for what job?`,'Parapet and roofing');
    if(!title) return;
    const amountStr=prompt(`Price for ${a.name} (NGN)`, '70000');
    if(!amountStr) return;
    const amount=parseInt(amountStr);
    const fee=Math.round(amount*0.05);
    const total=amount+fee;
    if(!confirm(`Hire ${a.name}?\nPrice: ${amount}\n5% Client Fee: ${fee}\nTotal Pay: ${total}\n\n🔒 Phone hidden until you fund!\nAdmin can see chats!`)) return;

    // Show loading
    alert('Creating escrow... wait 10 seconds, backend waking up...');

    try{
      const res=await fetch('https://craftsure-1.onrender.com/api/escrow/create',{
        method:'POST', 
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ 
          jobId:'art-'+Date.now(), 
          jobTitle:title, 
          clientId:user._id||user.id||'client1', 
          clientName:user.name, 
          artisanId:a._id, 
          artisanName:a.name, 
          artisanPhone:a.phone||'', 
          totalAmount:amount 
        })
      });
      const data=await res.json();
      alert('✅ Escrow Created! ID: '+(data._id||'ok')+' Go to Escrow page to fund 35%!');
      window.location.href='/escrow';
    }catch(e){
      // BACKUP if backend fails - still works locally!
      const escrows=JSON.parse(localStorage.getItem('escrows')||'[]');
      escrows.push({
        _id:'escrow_'+Date.now(),
        jobTitle:title,
        clientName:user.name,
        artisanName:a.name,
        totalAmount:amount,
        status:'awaiting 35%',
        m35Paid:false,
        m75Paid:false,
        m100Paid:false
      });
      localStorage.setItem('escrows',JSON.stringify(escrows));
      alert('✅ Escrow Created (offline)! Backend was sleeping, but saved locally! Go to Escrow page!');
      window.location.href='/escrow';
    }
  };

  const filtered=artisans.filter(a=>!filter || a.skill.toLowerCase().includes(filter.toLowerCase()) || a.name.toLowerCase().includes(filter.toLowerCase()) || a.location.toLowerCase().includes(filter.toLowerCase()));

  return(
    <div style={{ padding:'15px', background:'#f5f7fb', minHeight:'100vh' }}>
      <input value={filter} onChange={e=>setFilter(e.target.value)} placeholder="Search skill, name, location e.g. Carpentry, Makurdi" style={{ width:'100%', padding:'12px', borderRadius:'10px', border:'1px solid #ddd' }} />
      <div style={{ background:'#fffbeb', padding:'10px', borderRadius:'10px', marginTop:'10px', fontSize:'12px' }}>🔒 Anti-bypass: No WhatsApp! Must fund 5% to chat! You keep 15%! If button not click, wait 10s backend waking!</div>
      <div style={{ marginTop:'15px', display:'grid', gap:'12px' }}>
        {filtered.map(a=>(
          <div key={a._id} style={{ background:'white', padding:'14px', borderRadius:'14px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div><b>{a.name}</b><br/><span style={{ color:'#5a31f5' }}>{a.skill}</span><br/><span style={{ fontSize:'12px', color:'#666' }}>📍 {a.location} | 🔒 Phone hidden</span></div>
            <button onClick={()=>hire(a)} style={{ background:'#f59e0b', color:'white', border:'none', padding:'12px 16px', borderRadius:'10px', fontWeight:'bold', cursor:'pointer' }}>Hire 💰</button>
          </div>
        ))}
      </div>
    </div>
  );
}
