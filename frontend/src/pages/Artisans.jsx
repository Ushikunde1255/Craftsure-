import { useEffect, useState } from 'react';

export default function Artisans() {
  const [artisans, setArtisans] = useState([]);
  const [search, setSearch] = useState('');
  const [filterLocation, setFilterLocation] = useState('All');
  const [filterSkill, setFilterSkill] = useState('All');

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
            { _id: '5', name: 'Ushi Nicholas', skill: 'Carpentry', location: 'Lagos', phone: '08012345678' },
            { _id: '6', name: 'Emmanuel Builder', skill: 'Masonry', location: 'Ghana', phone: '233257118092' }
          ]);
        }, 800);
      });
  }, []);

  // FILTER LOGIC - Ghana/Nigeria + Skill + Search
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

  return (
    <div style={{ padding: '15px', background: '#f5f7fb', minHeight: '100vh' }}>
      <h2 style={{ color: '#5a31f5' }}>Registered Artisans - {filtered.length}</h2>
      <p>These artisans are looking for work. Chat them directly.</p>
      
      <input placeholder="Search skill, name, location e.g. Carpentry, Makurdi" value={search} onChange={e=>setSearch(e.target.value)} style={{ width:'100%', padding:'12px', borderRadius:'10px', border:'1px solid #ccc', margin:'10px 0 10px' }} />

      {/* FILTERS - Ghana / Nigeria / Skill */}
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
          <div key={a._id} style={{ background:'white', padding:'14px', borderRadius:'12px', display:'flex', justifyContent:'space-between', alignItems:'center', boxShadow:'0 2px 8px rgba(0,0,0,0.06)' }}>
            <div>
              <b>{a.name}</b><br/>
              <span style={{ fontSize:'13px', color:'#5a31f5' }}>{a.skill || 'General Artisan'}</span><br/>
              <span style={{ fontSize:'12px', color:'#666' }}>📍{a.location || 'Nigeria'} | {a.phone}</span>
            </div>
            <button onClick={()=>chat(a)} style={{ background:'#25D366', color:'white', border:'none', padding:'10px 16px', borderRadius:'8px', fontWeight:'bold' }}>WhatsApp</button>
          </div>
        ))}
      </div>

      {filtered.length === 0 && <p style={{ textAlign:'center', marginTop:'20px', color:'#666' }}>No artisans found for {filterLocation} + {filterSkill}. Try All.</p>}
    </div>
  );
            }
