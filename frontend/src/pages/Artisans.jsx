import { useEffect, useState } from 'react';

export default function Artisans() {
  const [artisans, setArtisans] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://craftsure-1.onrender.com/api/auth/users')
      .then(r=>r.json())
      .then(d=>{
        const list = Array.isArray(d)?d:d.users||[];
        setArtisans(list);
        setLoading(false);
      })
      .catch(()=>{
        fetch('https://craftsure-1.onrender.com/api/users')
         .then(r=>r.json())
         .then(d=>{
           setArtisans(Array.isArray(d)?d:[]);
           setLoading(false);
         })
         .catch(()=>setLoading(false));
      });
  }, []);

  const filtered = artisans.filter(a => 
    !search || 
    a.name?.toLowerCase().includes(search.toLowerCase()) ||
    a.skill?.toLowerCase().includes(search.toLowerCase()) ||
    a.location?.toLowerCase().includes(search.toLowerCase())
  );

  const chat = (a) => {
    const phone = (a.phone || '').replace(/\D/g,'');
    const msg = `Hello ${a.name}, I saw you on CraftSure as ${a.skill || 'artisan'}. I have work for you!`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`,'_blank');
  };

  const displayList = filtered.length > 0 ? filtered : artisans.length === 0 && !loading ? [
    { _id:'1', name:'Rebecca Nicholas', skill:'Hair Styling - Ghana Weaving', location:'Umudike, Umuahia', phone:'+233257118092' },
    { _id:'2', name:'Ushikunde Nicholas Tersoo', skill:'Carpentry & Furniture', location:'Makurdi, Benue', phone:'+233257118092' },
    { _id:'3', name:'Sample Mason', skill:'Masonry / Bricklaying', location:'Lagos', phone:'2348012345678' }
  ] : filtered;

  return (
    <div style={{ padding:'15px', background:'#f5f7fb', minHeight:'100vh' }}>
      <h2 style={{ color:'#5a31f5' }}>Registered Artisans - {artisans.length}</h2>
      <p>These artisans are looking for work. Chat them directly.</p>
      <input placeholder="Search skill, name, location e.g. Carpentry, Makurdi" value={search} onChange={e=>setSearch(e.target.value)} style={{ width:'100%', padding:'12px', borderRadius:'10px', border:'1px solid #ccc', margin:'10px 0 15px' }} />
      
      {loading && <p>Loading artisans...</p>}

      {!loading && artisans.length===0 && (
        <div style={{ background:'white', padding:'15px', borderRadius:'12px', textAlign:'center', marginBottom:'15px' }}>
          No artisans in database yet. Showing sample for demo. Invite real artisans to register and they will appear here automatically!
        </div>
      )}

      <div style={{ display:'grid', gap:'12px' }}>
        {displayList.map(a=>(
          <div key={a._id} style={{ background:'white', padding:'14px', borderRadius:'12px', display:'flex', justifyContent:'space-between', alignItems:'center', boxShadow:'0 2px 8px rgba(0,0,0,0.06)' }}>
            <div>
              <b>{a.name}</b><br/>
              <span style={{ fontSize:'13px', color:'#5a31f5' }}>{a.skill || a.category || 'General Artisan'}</span><br/>
              <span style={{ fontSize:'12px', color:'#666' }}>📍{a.location || 'Nigeria'} | {a.phone}</span>
            </div>
            <button onClick={()=>chat(a)} style={{ background:'#25D366', color:'white', border:'none', padding:'10px 16px', borderRadius:'8px', fontWeight:'bold' }}>WhatsApp</button>
          </div>
        ))}
      </div>
    </div>
  );
  }
