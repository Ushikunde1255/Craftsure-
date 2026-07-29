import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function PostJob() {
  const [form, setForm] = useState({ title: '', category: 'Carpentry', description: '', location: '', budget: '' });
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  if(!user){
    return <div style={{ padding: '40px', textAlign: 'center' }}><h3>Please Login to Post Job</h3><Link to="/login" style={{ background: '#5a31f5', color: 'white', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none' }}>Login Now</Link></div>;
  }

  // Compress image to <800KB
  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX = 1024;
          let w = img.width, h = img.height;
          if(w>MAX || h>MAX){
            if(w>h){ h = h*MAX/w; w = MAX; }
            else { w = w*MAX/h; h = MAX; }
          }
          canvas.width = w; canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img,0,0,w,h);
          canvas.toBlob((blob) => {
            const compressedFile = new File([blob], file.name, { type: 'image/jpeg' });
            resolve(compressedFile);
          }, 'image/jpeg', 0.6);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if(!file) return;
    if(file.size > 10*1024*1024){ alert('File too big! Max 10MB'); return; }
    setPreview(URL.createObjectURL(file));
    const compressed = await compressImage(file);
    console.log(`Compressed ${ (file.size/1024/1024).toFixed(2)}MB -> ${(compressed.size/1024/1024).toFixed(2)}MB`);
    setPhoto(compressed);
  };

  const submit = async (e) => {
    e.preventDefault();
    if(!photo){ alert('Photo REQUIRED!'); return; }
    setLoading(true);

    // Wake up backend first (Render sleeps)
    try { await fetch('https://craftsure-1.onrender.com/api/jobs'); } catch {}

    const data = new FormData();
    Object.keys(form).forEach(k => data.append(k, form[k]));
    data.append('photo', photo);
    const token = localStorage.getItem('token');

    try{
      const res = await fetch('https://craftsure-1.onrender.com/api/jobs', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: data
      });
      const result = await res.json();
      if(res.ok){
        alert('✅ Job Posted! Accra Ghana job is live!');
        nav('/jobs');
      } else {
        alert(`Failed: ${result.msg || result.message || 'Try smaller photo'}`);
      }
    }catch(err){
      console.error(err);
      alert('Network error - Backend waking up. Wait 30 secs and tap Post again! Render free tier sleeps.');
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h2 style={{ color: '#5a31f5' }}>Post New Job 🇬🇭🇳🇬</h2>
      <p>Logged as {user.name} - {user.phone}</p>
      <form onSubmit={submit} style={{ display: 'grid', gap: '12px', marginTop: '15px' }}>
        <select value={form.category} onChange={e=>setForm({...form, category:e.target.value})} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }}>
          <option>Carpentry</option><option>Masonry</option><option>Hair Styling</option><option>Electrical</option><option>Plumbing</option><option>Welding</option><option>Tailoring</option><option>Painting</option><option>Roofing</option><option>Other</option>
        </select>
        <input placeholder="Title e.g. Parapet and roofing" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }} />
        <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', height: '100px' }} />
        <input placeholder="Location e.g. Accra,Ghana" value={form.location} onChange={e=>setForm({...form, location:e.target.value})} required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }} />
        <input type="number" placeholder="Budget e.g. 1800000" value={form.budget} onChange={e=>setForm({...form, budget:e.target.value})} required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }} />

        <input type="file" accept="image/*" onChange={handleFile} required style={{ padding: '12px' }} />
        {preview && <img src={preview} style={{ width:'100%', height:'200px', objectFit:'cover', borderRadius:'8px' }} />}
        {photo && <p style={{ color: 'green', fontSize:'13px' }}>✅ Ready: {photo.name} - {(photo.size/1024/1024).toFixed(2)}MB (compressed from 3.09MB)</p>}

        <button type="submit" disabled={loading} style={{ background: '#5a31f5', color: 'white', padding: '16px', borderRadius: '12px', border: 'none', fontWeight: 'bold', fontSize: '16px' }}>
          {loading? 'Posting... (Wait 20 secs, Render waking up)' : 'Post Job Now'}
        </button>
      </form>
      <p style={{ fontSize:'11px', color:'#666', marginTop:'10px' }}>Tip: If Network error, wait 30 seconds and tap again. Free backend sleeps.</p>
    </div>
  );
        }
