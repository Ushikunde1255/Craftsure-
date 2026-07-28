import { useState, useEffect } from 'react';
const API_URL = 'https://craftsure-1.onrender.com/api';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({ category: 'Carpentry', title: '', description: '', location: 'Makurdi, Benue', budget: '' });
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const token = localStorage.getItem('token');

  useEffect(() => { fetchJobs(); }, []);
  const fetchJobs = async () => {
    try {
      const res = await fetch(`${API_URL}/jobs`);
      const data = await res.json();
      setJobs(Array.isArray(data) ? data : data.jobs || []);
    } catch {}
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) return alert('Photo too big! Max 5MB. Use smaller photo.');
    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const handlePost = async (e) => {
    e.preventDefault();
    if (!token) return alert('Please Login first!');
    if (!photo) return alert('📸 Photo REQUIRED!');
    if (form.description.length < 20) return alert('Describe work more (20 chars min)');
    if (Number(form.budget) < 1000) return alert('Budget min ₦1,000');
    const fd = new FormData();
    fd.append('category', form.category);
    fd.append('title', form.title || form.category + ' work');
    fd.append('description', form.description);
    fd.append('location', form.location);
    fd.append('budget', form.budget);
    fd.append('photo', photo);
    try {
      const res = await fetch(`${API_URL}/jobs`, { method: 'POST', headers: { 'Authorization': `Bearer ${token}` }, body: fd });
      const data = await res.json();
      if (res.ok) {
        alert(`✅ Posted as ${user?.name}!`);
        setForm({ category: 'Carpentry', title: '', description: '', location: 'Makurdi, Benue', budget: '' });
        setPhoto(null); setPreview(null);
        fetchJobs();
      } else alert(data.msg);
    } catch { alert('Backend waking, wait 30s'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete?')) return;
    await fetch(`${API_URL}/jobs/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
    fetchJobs();
  };

  const applyWhatsApp = (job) => {
    const msg = `Hello ${job.customerName}, I saw your ${job.category} job in ${job.location} for ₦${job.budget?.toLocaleString()} on CraftSure. I am ${user?.name || 'Artisan'}, I can do it.`;
    const phone = job.customerPhone ? `234${job.customerPhone.slice(1)}` : '2349035913363';
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div style={{ maxWidth: '700px', margin: '20px auto', padding: '10px' }}>
      <div style={{ background: 'white', padding: '20px', borderRadius: '12px', marginBottom: '20px' }}>
        <h3>Post Job</h3>
        {user && <p style={{ color: 'green', fontSize: '12px' }}>Posting as: {user.name}</p>}
        <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} style={inputStyle}>
          <option>Carpentry</option><option>Masonry</option><option>Electrical</option><option>Plumbing</option><option>Welding</option><option>Painting</option><option>Tailoring</option><option>Hair Dressing</option>
        </select>
        <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} style={inputStyle} />
        <textarea placeholder="Description - min 20 chars" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} style={{ ...inputStyle, height: '80px' }} />
        <input placeholder="Location" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} style={inputStyle} />
        <input type="number" placeholder="Budget" value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })} style={inputStyle} />
        <div style={{ border: '2px dashed #5a31f5', padding: '15px', borderRadius: '10px', textAlign: 'center' }}>
          <input type="file" accept="image/*" onChange={handlePhotoChange} />
          {preview && <img src={preview} style={{ width: '100%', maxHeight: '200px', marginTop: '10px', borderRadius: '8px' }} alt="preview" />}
        </div>
        <button onClick={handlePost} style={btnStyle}>Post Job as {user?.name || 'Guest'}</button>
      </div>

      <h3>All Jobs ({jobs.length})</h3>
      {jobs.map(job => (
        <div key={job._id} style={{ background: 'white', borderRadius: '12px', marginBottom: '15px', overflow: 'hidden' }}>
          {(job.photoUrl || job.image) && <img src={job.photoUrl || job.image} style={{ width: '100%', height: '220px', objectFit: 'cover' }} alt="job" />}
          <div style={{ padding: '15px' }}>
            <h4 style={{ margin: 0 }}>₦{job.budget?.toLocaleString()} - {job.customerName || 'User'} - {job.location}</h4>
            <p style={{ fontSize: '14px' }}>{job.description}</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => applyWhatsApp(job)} style={{ flex: 1, background: '#25D366', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold' }}>WhatsApp</button>
              {user && (
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
const inputStyle = { width: '100%', padding: '12px', margin: '6px 0', borderRadius: '8px', border: '1px solid #ddd', fontSize: '15px', boxSizing: 'border-box' };
const btnStyle = { width: '100%', padding: '15px', background: '#5a31f5', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', fontSize: '16px', marginTop: '10px' };
