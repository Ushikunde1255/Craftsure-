import { useState, useEffect, useRef } from 'react';

const API_URL = 'https://craftsure-1.onrender.com/api';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [category, setCategory] = useState('Carpentry');
  const [location, setLocation] = useState('Makurdi, Benue');
  const [budget, setBudget] = useState('');
  const [desc, setDesc] = useState('');
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState('');
  const fileRef = useRef(null);

  const fetchJobs = async () => {
    try {
      const res = await fetch(`${API_URL}/jobs`);
      const data = await res.json();
      setJobs(Array.isArray(data) ? data.reverse() : []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024) {
      return alert('Photo too big! Max 5MB. Screenshot it first!');
    }
    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const postJob = async () => {
    if (desc.trim().length < 20) return alert('Describe work! Min 20 chars');
    if (!budget || Number(budget) < 1000) return alert('Budget min ₦1,000');
    if (!photo) return alert('Photo REQUIRED! Tap box!');

    const formData = new FormData();
    formData.append('category', category);
    formData.append('title', category);
    formData.append('location', location);
    formData.append('budget', budget);
    formData.append('description', desc);
    formData.append('photo', photo);

    const token = localStorage.getItem('token');
    if (!token) return alert('Please login again!');

    try {
      const res = await fetch(`${API_URL}/jobs`, {
        method: 'POST',
        headers: { Authorization: token },
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        alert('✅ Job with photo posted!');
        setDesc('');
        setBudget('');
        setPhoto(null);
        setPreview('');
        fetchJobs();
      } else {
        alert(data.msg || 'Failed');
      }
    } catch (err) {
      alert('Backend sleeping - wait 30s and try again');
    }
  };

  const deleteJob = async (id) => {
    if (!window.confirm('Delete?')) return;
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_URL}/jobs/${id}`, {
        method: 'DELETE',
        headers: { Authorization: token },
      });
      if (res.ok) setJobs(jobs.filter((j) => j._id !== id));
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '15px', background: '#f5f3ff', minHeight: '100vh' }}>
      <div style={{ background: 'white', padding: '20px', borderRadius: '12px' }}>
        <h2 style={{ margin: '0 0 15px 0' }}>📢 Post Real Job</h2>
        
        <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', padding: '14px', margin: '8px 0', borderRadius: '8px', border: '1px solid #ccc' }}>
          <option>Carpentry</option>
          <option>Electrical</option>
          <option>Plumbing</option>
          <option>Masonry</option>
          <option>Welding</option>
          <option>Painting</option>
          <option>Tailoring</option>
          <option>Other</option>
        </select>

        <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location e.g. Accra" style={{ width: '100%', padding: '14px', margin: '8px 0', borderRadius: '8px', border: '1px solid #ccc' }} />

        <input type="number" value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="Budget e.g. 800000" style={{ width: '100%', padding: '14px', margin: '8px 0', borderRadius: '8px', border: '1px solid #ccc' }} />

        <input type="file" ref={fileRef} accept="image/*" onChange={handlePhoto} style={{ display: 'none' }} />
        <div onClick={() => fileRef.current.click()} style={{ border: '2px dashed #5a31f5', padding: '20px', textAlign: 'center', borderRadius: '10px', margin: '10px 0', cursor: 'pointer', background: preview ? '#f0f0ff' : 'white' }}>
          {preview ? <img src={preview} alt="preview" style={{ width: '100%', maxHeight: '220px', objectFit: 'cover', borderRadius: '8px' }} /> : <b>📷 Tap to Add Photo - REQUIRED</b>}
          <div style={{ fontSize: '12px', marginTop: '6px' }}>{photo ? photo.name : 'Max 5MB'}</div>
        </div>

        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Describe work ONLY (don't add budget here)" style={{ width: '100%', padding: '14px', height: '110px', borderRadius: '8px', border: '1px solid #ccc' }}></textarea>

        <button onClick={postJob} style={{ width: '100%', padding: '16px', background: '#5a31f5', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', fontSize: '16px', marginTop: '12px' }}>
          Post Job - {budget ? `₦${Number(budget).toLocaleString()}` : '₦0'}
        </button>
      </div>

      <h2 style={{ margin: '25px 0 15px 0' }}>All Jobs ({jobs.length})</h2>

      {jobs.map((job) => (
        <div key={job._id} style={{ background: 'white', borderRadius: '12px', marginBottom: '15px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          {job.photoUrl && <img src={job.photoUrl} alt="job" style={{ width: '100%', height: '260px', objectFit: 'cover' }} />}
          {!job.photoUrl && job.image && <img src={job.image} alt="job" style={{ width: '100%', height: '260px', objectFit: 'cover' }} />}
          <div style={{ padding: '15px' }}>
            <h3 style={{ margin: 0 }}>{job.category}</h3>
            <p style={{ fontSize: '14px', margin: '8px 0' }}>{job.description}</p>
            <p style={{ color: '#5a31f5', fontWeight: 'bold' }}>₦{Number(job.budget).toLocaleString()} - User - {job.location}</p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
              <button onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(`Hello, I want to apply for your ${job.category} job in ${job.location} for ₦${job.budget} on CraftSure`)}`, '_blank')} style={{ flex: 1, padding: '12px', background: '#00a884', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold' }}>💬 Apply via WhatsApp</button>
              <button onClick={() => deleteJob(job._id)} style={{ padding: '12px 16px', background: '#ff3b30', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold' }}>🗑️</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
