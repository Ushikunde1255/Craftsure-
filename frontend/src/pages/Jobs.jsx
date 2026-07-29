import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PostJob() {
  const [form, setForm] = useState({ title: '', category: 'Carpentry', description: '', location: '', budget: '' });
  const [photo, setPhoto] = useState(null);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if(!photo){ alert('Photo REQUIRED!'); return; }
    const data = new FormData();
    Object.keys(form).forEach(k => data.append(k, form[k]));
    data.append('photo', photo);
    const token = localStorage.getItem('token');
    const res = await fetch('https://craftsure-1.onrender.com/api/jobs', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: data
    });
    if(res.ok){ alert('Job posted!'); nav('/jobs'); }
    else { const err = await res.json(); alert(err.msg || 'Failed'); }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h2 style={{ color: '#5a31f5' }}>Post New Job 🇳🇬</h2>
      <form onSubmit={submit} style={{ display: 'grid', gap: '12px' }}>
        <select value={form.category} onChange={e=>setForm({...form, category:e.target.value})} style={{ padding: '12px', borderRadius: '8px' }}>
          <option>Carpentry</option><option>Masonry</option><option>Hair Styling</option><option>Electrical</option><option>Plumbing</option><option>Welding</option><option>Tailoring</option><option>Painting</option>
        </select>
        <input placeholder="Title e.g. Bricklayer needed" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }} />
        <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', height: '80px' }} />
        <input placeholder="Location e.g. Makurdi, Benue" value={form.location} onChange={e=>setForm({...form, location:e.target.value})} required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }} />
        <input type="number" placeholder="Budget e.g. 70000" value={form.budget} onChange={e=>setForm({...form, budget:e.target.value})} required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }} />
        <input type="file" accept="image/*" onChange={e=>setPhoto(e.target.files[0])} required style={{ padding: '12px' }} />
        {photo && <p style={{ color: 'green' }}>✅ Photo selected: {photo.name} ({(photo.size/1024/1024).toFixed(1)}MB)</p>}
        <button type="submit" style={{ background: '#5a31f5', color: 'white', padding: '14px', borderRadius: '10px', border: 'none', fontWeight: 'bold', fontSize: '16px' }}>Post Job - Real Name & WhatsApp Auto</button>
      </form>
    </div>
  );
}
