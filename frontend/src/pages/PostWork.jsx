import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
export default function PostWork() {
  const [form, setForm] = useState({ title:'', category:'Carpentry', location:'', description:'' });
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  if(!user) return <div style={{ padding:'40px', textAlign:'center' }}><h3>Login to post work</h3><Link to="/login" style={{ background:'#5a31f5', color:'white', padding:'12px 24px', borderRadius:'8px', textDecoration:'none' }}>Login</Link></div>;

  const handleFile = async (e) => {
    const file = e.target.files[0]; if(!file) return;
    setPreview(URL.createObjectURL(file));
    // compress
    const img = new Image(); const reader = new FileReader();
    reader.onload = (ev)=>{
      img.onload = ()=>{
        const canvas = document.createElement('canvas');
        const MAX=1024; let w=img.width, h=img.height;
        if(w>MAX||h>MAX){ if(w>h){h=h*MAX/w;w=MAX;}else{w=w*MAX/h;h=MAX;} }
        canvas.width=w; canvas.height=h;
        canvas.getContext('2d').drawImage(img,0,0,w,h);
        canvas.toBlob(b=>{ setPhoto(new File([b], file.name, {type:'image/jpeg'})); }, 'image/jpeg', 0.6);
      }; img.src=ev.target.result;
    }; reader.readAsDataURL(file);
  };

  const submit = async (e) => {
    e.preventDefault(); if(!photo){alert('Photo required'); return;} setLoading(true);
    const data = new FormData(); Object.keys(form).forEach(k=>data.append(k, form[k])); data.append('photo', photo);
    const token = localStorage.getItem('token');
    try{
      const res = await fetch('https://craftsure-1.onrender.com/api/portfolio', { method:'POST', headers:{ Authorization:`Bearer ${token}` }, body:data });
      if(res.ok){ alert('✅ Work posted to portfolio!'); nav('/portfolio'); } else { alert('Failed'); }
    }catch{ alert('Network error, backend waking, try again'); }
    setLoading(false);
  };

  return (
    <div style={{ padding:'20px', maxWidth:'500px', margin:'0 auto' }}>
      <h2 style={{ color:'#5a31f5' }}>Post Completed Work 📸</h2>
      <p>Show clients your real work! Logged as {user.name}</p>
      <form onSubmit={submit} style={{ display:'grid', gap:'12px', marginTop:'15px' }}>
        <input placeholder="Title e.g. Parapet roofing completed - Lekki" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} required style={{ padding:'12px', borderRadius:'8px', border:'1px solid #ccc' }} />
        <select value={form.category} onChange={e=>setForm({...form, category:e.target.value})} style={{ padding:'12px', borderRadius:'8px' }}><option>Carpentry</option><option>Masonry</option><option>Hair Styling</option><option>Electrical</option><option>Plumbing</option><option>Welding</option><option>Tailoring</option><option>Painting</option><option>Roofing</option></select>
        <input placeholder="Location e.g. Accra,Ghana" value={form.location} onChange={e=>setForm({...form, location:e.target.value})} required style={{ padding:'12px', borderRadius:'8px', border:'1px solid #ccc' }} />
        <textarea placeholder="Description e.g. Completed this Ghana weaving for bride, took 4 hours" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} style={{ padding:'12px', borderRadius:'8px', border:'1px solid #ccc', height:'80px' }} />
        <input type="file" accept="image/*" onChange={handleFile} required />
        {preview && <img src={preview} style={{ width:'100%', height:'200px', objectFit:'cover', borderRadius:'8px' }} />}
        <button disabled={loading} style={{ background:'#5a31f5', color:'white', padding:'16px', borderRadius:'12px', border:'none', fontWeight:'bold', fontSize:'16px' }}>{loading?'Posting...':'Post My Work 📸'}</button>
      </form>
    </div>
  );
        }
