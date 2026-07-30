import { useEffect, useState } from 'react';

export default function Artisans() {
  const [artisans, setArtisans] = useState([]);
  const [search, setSearch] = useState('');
  const [filterLocation, setFilterLocation] = useState('All');
  const [filterSkill, setFilterSkill] = useState('All');
  const [selectedArtisan, setSelectedArtisan] = useState(null);
  const [artisanWorks, setArtisanWorks] = useState([]);

  useEffect(() => {
    fetch('https://craftsure-1.onrender.com/api/auth/users')
      .then(r => r.json())
      .then(d => {
        const list = Array.isArray(d) ? d : d.users || [];
        if (list.length > 0) setArtisans(list);
      })
      .catch(() => {})
      .finally(() => {
        setTimeout(() => {
          setArtisans(prev => prev.length > 0 ? prev : [
            { _id: '1', name: 'James Ugee', skill: 'Carpentry', location: 'Abia', phone: '07066401403' },
            { _id: '2', name: 'Ushikunde Nicholas Tersoo', skill: 'General Artisan', location: 'Accra', phone: '+233257118092' },
            { _id: '3', name: 'Rebecca Nicholas', skill: 'Hair Styling', location: 'Abia state umuahia', phone: '09035913363' },
            { _id: '4', name: 'Tersoo kunde', skill: 'General Artisan', location: 'Makurdi, Benue', phone: '09012345678' },
          ]);
        }, 800);
      });
  }, []);

  const filtered = artisans.filter(a => {
    const matchSearch = !search || a.name?.toLowerCase().includes(search.toLowerCase()) || a.skill?.toLowerCase().includes(search.toLowerCase()) || a.location?.toLowerCase().includes(search.toLowerCase());
    const matchLoc = filterLocation === 'All' || a.location?.toLowerCase().includes(filterLocation.toLowerCase());
    const matchSkill = filterSkill === 'All' || a.skill?.toLowerCase().includes(filterSkill.toLowerCase());
    return matchSearch && matchLoc && matchSkill;
  });

  const chat = (a) => {
    const phone = (a.phone || '').replace(/\D/g, '');
    const msg = `Hello ${a.name}, I saw you on CraftSure as ${a.skill} in ${a.location}. I have work for you!`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const viewPortfolio = async (artisan) => {
    setSelectedArtisan(artisan);
    setArtisanWorks([]);
    try {
      // Try to get works by artisan ID or name
      const res = await fetch(`https://craftsure-1.onrender.com/api/portfolio`);
      const allWorks = await res.json();
      const works = Array.isArray(allWorks) ? allWorks.filter(w => 
        w.artisanName?.toLowerCase().includes(artisan.name?.toLowerCase().split(' ')[0]) || 
        w.artisan?.toString() === artisan._id
      ) : [];
      setArtisanWorks(works);
    } catch {}
  };

  return (
    <div style={{ padding: '15px', background: '#f5f7fb', minHeight: '100vh' }}>
      <h2 style={{ color: '#5a31f5' }}>Registered Artisans - {filtered.length}</h2>
      <p style={{ fontSize:'14px', color:'#666' }}>Tap artisan to see their completed works 📸</p>
      
      <input placeholder="Search skill, name, location e.g. Carpentry, Makurdi" value={search} onChange={e=>setSearch(e.target.value)} style={{ width:'100%', padding:'12px', borderRadius:'10px', border:'1px solid #ccc', margin:'10px 0 10px', background:'white' }} />

      <div style={{ display:'flex', gap:'8px', marginBottom:'12px', overflowX:'auto' }}>
        <select value={filterLocation} onChange={e=>setFilterLocation(e.target.value)} style={{ padding:'10px', borderRadius:'10px', border:'1px solid #ccc', background:'white', fontWeight:'bold' }}>
          <option value="All">All Locations 🌍</option>
          <option value="Ghana">Ghana 🇬🇭</option>
          <option value="Nigeria">Nigeria 🇳🇬</option>
          <option value="Accra">Accra</option>
          <option value="Abia">Abia</option>
          <option value="Makurdi">Makurdi</option>
          <option value="Lagos">Lagos</option>
          <option value="Benue">Benue</option>
        </select>
        <select value={filterSkill} onChange={e=>setFilterSkill(e.target.value)} style={{ padding:'10px', borderRadius:'10px', border:'1px solid #ccc', background:'white', fontWeight:'bold' }}>
          <option value="All">All Skills 🔧</option>
          <option value="Carpentry">Carpentry</option>
          <option value="Masonry">Masonry</option>
          <option value="Hair Styling">Hair Styling</option>
          <option value="Electrical">Electrical</option>
          <option value="Plumbing">Plumbing</option>
          <option value="Welding">Welding</option>
          <option value="Tailoring">Tailoring</option>
          <option value="General Artisan">General</option>
        </select>
      </div>

      <div style={{ display:'grid', gap:'12px' }}>
        {filtered.map(a=>(
          <div key={a._id} onClick={()=>viewPortfolio(a)} style={{ background:'white', padding:'14px', borderRadius:'12px', display:'flex', justifyContent:'space-between', alignItems:'center', boxShadow:'0 2px 8px rgba(0,0,0,0.06)', cursor:'pointer' }}>
            <div style={{ flex:1 }}>
              <b>{a.name}</b> <span style={{ fontSize:'10px', color:'#5a31f5', marginLeft:'6px' }}>👁️ View Works</span><br/>
              <span style={{ fontSize:'13px', color:'#5a31f5' }}>{a.skill || 'General Artisan'}</span><br/>
              <span style={{ fontSize:'12px', color:'#666' }}>📍{a.location || 'Nigeria'} | {a.phone}</span>
            </div>
            <button onClick={(e)=>{ e.stopPropagation(); chat(a); }} style={{ background:'#25D366', color:'white', border:'none', padding:'10px 16px', borderRadius:'8px', fontWeight:'bold' }}>WhatsApp</button>
          </div>
        ))}
      </div>

      {filtered.length === 0 && <p style={{ textAlign:'center', marginTop:'20px', color:'#666' }}>No artisans for {filterLocation} + {filterSkill}. Try All.</p>}

      {/* ARTISAN PROFILE MODAL WITH PORTFOLIO */}
      {selectedArtisan && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', zIndex:200, display:'flex', alignItems:'center', justifyContent:'center', padding:'15px' }} onClick={()=>setSelectedArtisan(null)}>
          <div style={{ background:'white', width:'100%', maxWidth:'450px', maxHeight:'85vh', borderRadius:'16px', overflow:'hidden', display:'flex', flexDirection:'column' }} onClick={e=>e.stopPropagation()}>
            <div style={{ background:'#5a31f5', color:'white', padding:'16px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div>
                <b style={{ fontSize:'18px' }}>{selectedArtisan.name}</b><br/>
                <span style={{ fontSize:'13px' }}>{selectedArtisan.skill} • 📍{selectedArtisan.location}</span>
              </div>
              <button onClick={()=>setSelectedArtisan(null)} style={{ background:'rgba(255,255,255,0.2)', border:'none', color:'white', fontSize:'20px', width:'32px', height:'32px', borderRadius:'50%' }}>✕</button>
            </div>
            
            <div style={{ padding:'16px', overflowY:'auto' }}>
              <div style={{ display:'flex', gap:'10px', marginBottom:'16px' }}>
                <button onClick={()=>chat(selectedArtisan)} style={{ flex:1, background:'#25D366', color:'white', border:'none', padding:'12px', borderRadius:'10px', fontWeight:'bold' }}>WhatsApp {selectedArtisan.name.split(' ')[0]}</button>
                <a href={`tel:${selectedArtisan.phone}`} style={{ background:'#eee', color:'#333', padding:'12px 16px', borderRadius:'10px', textDecoration:'none', fontWeight:'bold' }}>📞 Call</a>
              </div>

              <h4 style={{ margin:'0 0 10px' }}>Completed Works - {artisanWorks.length} 📸</h4>
              {artisanWorks.length === 0 ? (
                <div style={{ background:'#f5f7fb', padding:'20px', borderRadius:'12px', textAlign:'center', color:'#666' }}>
                  No portfolio yet.<br/>This artisan hasn't posted completed work.<br/><span style={{ fontSize:'12px' }}>But you can still WhatsApp!</span>
                </div>
              ) : (
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px' }}>
                  {artisanWorks.map(w=>(
                    <div key={w._id} style={{ background:'#f9f9ff', borderRadius:'12px', overflow:'hidden', border:'1px solid #eee' }}>
                      <img src={w.photoUrl} style={{ width:'100%', height:'120px', objectFit:'cover' }} />
                      <div style={{ padding:'8px' }}>
                        <b style={{ fontSize:'12px' }}>{w.title}</b><br/>
                        <span style={{ fontSize:'10px', color:'#5a31f5' }}>{w.category} - {w.location}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
      }
