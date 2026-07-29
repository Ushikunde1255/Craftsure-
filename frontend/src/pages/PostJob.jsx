import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function PostJob() {
  const [form, setForm] = useState({ title: '', category: 'Carpentry', description: '', location: '', budget: '' });
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  if(!user){
    return <div style={{ padding: '40px', textAlign: 'center' }}><h3>Please Login to Post Job</h3><Link to="/login" style={{ background: '#5a31f5', color: 'white', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none' }}>Login Now</Link></div>;
  }

  const submit = async (e) => {
    e.preventDefault();
    if(!photo){ alert('Photo REQUIRED! Take photo of work'); return; }
    setLoading(true);
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
      if(res.ok){ alert('✅ Job Posted! Real name & WhatsApp added!'); nav('/jobs'); }
      else alert(result.msg || 'Failed - try smaller photo <5MB');
    }catch(err){ alert('Network error'); }
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h2 style={{ color: '#5a31f5' }}>Post New Job 🇳🇬</h2>
      <p>Logged as {user.name} - {user.phone}</p>
      <form onSubmit={submit} style={{ display: 'grid', gap: '12px', marginTop: '15px' }}>
        <select value={form.category} onChange={e=>setForm({...form, category:e.target.value})} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }}>
          <option>Carpentry</option><option>Masonry</option><option>Hair Styling</option><option>Electrical</option><option>Plumbing</option><option>Welding</option><option>Tailoring</option><option>Painting</option><option>Other</option>
        </select>
        <input placeholder="Title e.g. Ghana weaving needed" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }} />
        <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', height: '80px' }} />
        <input placeholder="Location e.g. Umudike, Umuahia" value={form.location} onChange={e=>setForm({...form, location:e.target.value})} required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }} />
        <input type="number" placeholder="Budget e.g. 25000" value={form.budget} onChange={e=>setForm({...form, budget:e.target.value})} required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }} />
        <input type="file" accept="image/*" onChange={e=>setPhoto(e.target.files[0])} required style={{ padding: '12px' }} />
        {photo && <p style={{ color: 'green' }}>✅ {photo.name} - {(photo.size/1024/1024).toFixed(2)}MB</p>}
        <button type="submit" disabled={loading} style={{ background: '#5a31f5', color: 'white', padding: '16px', borderRadius: '12px', border: 'none', fontWeight: 'bold', fontSize: '16px' }}>{loading? 'Posting...' : 'Post Job Now'}</button>
      </form>
    </div>
  );
      }
