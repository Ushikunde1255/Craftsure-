import { useState, useEffect } from 'react';
const API_URL = 'https://craftsure-1.onrender.com/api';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [location, setLocation] = useState('Makurdi, Benue');
  const [category, setCategory] = useState('Plumbing');
  const [customCategory, setCustomCategory] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchJobs = async () => {
    const res = await fetch(`${API_URL}/jobs`);
    const data = await res.json();
    setJobs(Array.isArray(data) ? data : data.jobs || []);
  };
  useEffect(() => { fetchJobs(); }, []);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handlePostJob = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) { alert('Login first!'); window.location.href='/login'; return; }
    const finalCategory = category === 'Other' ? customCategory.trim() : category;
    if (!title || !description || !budget) { alert('Fill all'); return; }

    setLoading(true);
    try {
      let imageUrl = '';
      if (image) {
        const form = new FormData();
        form.append('image', image);
        const upRes = await fetch(`${API_URL}/upload`, {
          method: 'POST',
          headers: { 'x-auth-token': token, 'Authorization': `Bearer ${token}` },
          body: form
        });
        const upData = await upRes.json();
        if (upRes.ok) imageUrl = upData.url;
      }

      const res = await fetch(`${API_URL}/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-auth-token': token, 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ title: title.trim(), description: description.trim(), budget: Number(budget), location, category: finalCategory, image: imageUrl })
      });
      const data = await res.json();
      if (res.ok) {
        alert('Job posted with photo! ✅');
        setTitle(''); setDescription(''); setBudget(''); setImage(null); setPreview(''); setCustomCategory('');
        fetchJobs();
      } else { alert(data.msg || 'Failed'); }
    } catch (err) { alert(err.message); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Jobs - Nigeria</h1>
      <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '10px', background: '#f9f9ff' }}>
        <h2>Post Job + Photo</h2>
        <form onSubmit={handlePostJob}>
          <input type="text" placeholder="Job Title" value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: '100%', padding: '12px', margin: '8px 0', borderRadius: '6px', border: '1px solid #ccc' }} required />
          <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', padding: '12px', margin: '8px 0', borderRadius: '6px', fontWeight: 'bold' }}>
            <option>Plumbing</option><option>Electrical</option><option>Carpentry</option><option>Painting</option><option>Tailoring / Fashion Design</option><option>Hair Dressing / Barbing</option><option>Mechanic</option><option>Cleaning</option><option>Bricklaying</option><option>Welding</option><option>Catering</option><option>Photography</option><option>Makeup</option><option>Phone Repair</option><option>Other</option>
          </select>
          {category === 'Other' && <input type="text" placeholder="Type your job e.g. Shoe Making..." value={customCategory} onChange={(e) => setCustomCategory(e.target.value)} style={{ width: '100%', padding: '12px', margin: '8px 0', borderRadius: '6px', border: '2px solid #5a31f5', background: '#fffbe6' }} required />}
          <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} style={{ width: '100%', padding: '12px', margin: '8px 0', borderRadius: '6px', border: '1px solid #ccc' }} />
          <input type="number" placeholder="Budget in Naira" value={budget} onChange={(e) => setBudget(e.target.value)} style={{ width: '100%', padding: '12px', margin: '8px 0', borderRadius: '6px', border: '1px solid #ccc' }} required />
          
          {/* PHOTO INPUT */}
          <label style={{ display: 'block', padding: '12px', border: '2px dashed #5a31f5', borderRadius: '8px', textAlign: 'center', margin: '8px 0', cursor: 'pointer' }}>
            📷 {preview ? 'Change Photo' : 'Add Photo of Work (Leaking pipe, broken roof...)'}
            <input type="file" accept="image/*" onChange={handleImage} style={{ display: 'none' }} />
          </label>
          {preview && <img src={preview} alt="preview" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '8px' }} />}

          <textarea placeholder="Describe work..." value={description} onChange={(e) => setDescription(e.target.value)} rows="4" style={{ width: '100%', padding: '12px', margin: '8px 0', borderRadius: '6px', border: '1px solid #ccc' }} required />
          <button type="submit" disabled={loading} style={{ width: '100%', padding: '14px', background: '#5a31f5', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold' }}>{loading? 'Uploading & Posting...' : `Post Job - ₦${budget || '0'}`}</button>
        </form>
      </div>

      <div style={{ marginTop: '30px' }}>
        <h2>All Jobs ({jobs.length})</h2>
        {jobs.map((job) => (
          <div key={job._id} style={{ border: '1px solid #eee', padding: '15px', borderRadius: '8px', marginBottom: '10px', background: 'white' }}>
            {job.image && <img src={job.image} alt="job" style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px', marginBottom: '8px' }} />}
            <h3 style={{ margin: '0' }}>{job.title}</h3>
            <p style={{ color: '#555' }}>{job.description}</p>
            <p style={{ fontWeight: 'bold', color: '#5a31f5' }}>₦{job.budget?.toLocaleString()} - {job.category} - {job.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
