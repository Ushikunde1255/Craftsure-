export default function Artisans(){
  const artisans=[
    {name:'James Ugee', skill:'Carpentry', location:'Makurdi, Nigeria'},
    {name:'Ushi Nicholas Tersoo', skill:'Roofing & Parapet', location:'Accra, Ghana'},
    {name:'Emeka Builder', skill:'Masonry', location:'Umuahia, Abia'},
    {name:'Ama Hair Stylist', skill:'Ghana Weave', location:'Umudike'},
    {name:'Kwame Electrician', skill:'Electrical', location:'Kumasi, Ghana'}
  ];
  return(
    <div style={{ padding:'15px', background:'#f5f7fb', minHeight:'100vh' }}>
      <input placeholder="Search skill, name, location e.g. Carpentry, Makurdi" style={{ width:'100%', padding:'12px', borderRadius:'10px', border:'1px solid #ddd' }} />
      <div style={{ background:'#fffbeb', padding:'10px', borderRadius:'10px', marginTop:'10px', fontSize:'12px' }}>🔒 Anti-bypass: No WhatsApp! Must fund 5% to chat! Admin can spy!</div>
      <div style={{ marginTop:'15px', display:'grid', gap:'12px' }}>
        {artisans.map((a,i)=>(
          <div key={i} style={{ background:'white', padding:'14px', borderRadius:'14px', display:'flex', justifyContent:'space-between' }}>
            <div><b>{a.name}</b><br/><span style={{ color:'#5a31f5' }}>{a.skill}</span><br/><span style={{ fontSize:'12px', color:'#666' }}>📍 {a.location} | 🔒 Phone hidden</span></div>
            <button style={{ background:'#f59e0b', color:'white', border:'none', padding:'10px 14px', borderRadius:'10px', fontWeight:'bold' }}>Hire 💰</button>
          </div>
        ))}
      </div>
    </div>
  );
}
