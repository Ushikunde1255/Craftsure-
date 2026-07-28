import { useState, useEffect, useRef } from 'react';

const API_URL = 'https://craftsure-1.onrender.com/api';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [category, setCategory] = useState('Plumbing');
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

  // FIXED PHOTO LOGIC HERE
  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        return alert('Photo too big! Max 5MB - pick smaller photo from camera');
      }
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const postJob = async (e) => {
    e.preventDefault();
    if (!desc || desc.trim().length < 20) {
      return alert('Describe work well! At least 20 characters. Real jobs only!');
    }
    if (!budget || Number(budget) < 1000) {
      return alert('Budget must be at least ₦1,000!');
    }
    if (!photo) {
      return alert('Photo is REQUIRED! Tap the dashed box to add image!');
    }

    const formData = new FormData();
    formData.append('category', category);
    formData.append('title', category);
    formData.append('location', location);
    formData.append('budget', budget);
    formData.append('description', desc);
    formData.append('photo', photo);

    const token = localStorage.getItem('token');
    if (!token) {
      return alert('Please Login again to post job!');
    }

    try {
      const res = await fetch(`${API_URL}/jobs`, {
        method: 'POST',
        headers: {
          Authorization: token,
        },
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        alert('✅ Job with photo posted successfully!');
        setDesc('');
        setBudget('');
        setPhoto(null);
        setPreview('');
        fetchJobs();
      } else {
        alert(data.msg || 'Failed to post');
      }
    } catch (err) {
      alert('Network error: ' + err.message);
    }
  };

  const deleteJob = async (id) => {
    if (!window.confirm('Delete this job?')) return;
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_URL}/jobs/${id}`, {
        method: 'DELETE',
        headers: { Authorization: token },
      });
      if (res.ok) {
        alert('🗑️ Deleted!');
        setJobs(jobs.filter((j) => j._id !== id));
      } else {
        alert('Failed to delete. Login again!');
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '15px', background: '#ffe0ff', minHeight: '100vh' }}>
      {/* POST FORM */}
      <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <h2 style={{ margin: '0 0 15px 0' }}>📢 Post a Real Job (Open for All)</h2>
        <form onSubmit={postJob}>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ width: '100%', padding: '14px', margin: '8px 0', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px' }}
          >
            <option>Plumbing</option>
            <option>Electrical</option>
            <option>Carpentry</option>
            <option>Tailoring</option>
            <option>Hair Dressing</option>
            <option>Masonry</option>
            <option>Welding</option>
            <option>Painting</option>
            <option>Teaching</option>
            <option>Other</option>
          </select>

          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={{ width: '100%', padding: '14px', margin: '8px 0', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px' }}
            placeholder="Location e.g. Makurdi, Benue"
            required
          />

          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            style={{ width: '100%', padding: '14px', margin: '8px 0', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px' }}
            placeholder="Budget Naira - Min 1000"
            required
          />

          <input type="file" ref={fileRef} accept="image/*" onChange={handlePhoto} style={{ display: 'none' }} />

          <div
            onClick={() => fileRef.current.click()}
            style={{
              border: '2px dashed #5a31f5',
              padding: '20px',
              textAlign: 'center',
              borderRadius: '10px',
              margin: '12px 0',
              cursor: 'pointer',
              background: preview ? '#f0f0ff' : 'white',
            }}
          >
            {preview ? (
              <img src={preview} alt="preview" style={{ width: '100%', maxHeight: '220px', objectFit: 'cover', borderRadius: '8px' }} />
            ) : (
              <div style={{ fontSize: '16px' }}>📷 Tap to pick photo - REQUIRED</div>
            )}
            <p style={{ margin: '8px 0 0 0', fontSize: '13px', color: '#555' }}>
              {photo ? photo.name : 'Tap here to add house/hairstyle image'}
            </p>
          </div>

          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            style={{ width: '100%', padding: '14px', height: '110px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '15px' }}
            placeholder="Describe work... at least 20 chars. Real jobs only!"
            required
          ></textarea>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '16px',
              background: '#5a31f5',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontWeight: 'bold',
              fontSize: '16px',
              marginTop: '12px',
              cursor: 'pointer',
            }}
          >
            Post Job {budget ? `- ₦${Number(budget).toLocaleString()}` : '- ₦0'}
          </button>
        </form>
      </div>

      {/* ALL JOBS */}
      <h2 style={{ margin: '25px 0 15px 0' }}>All Jobs ({jobs.length})</h2>

      {jobs.map((job) => (
        <div
          key={job._id}
          style={{
            background: 'white',
            borderRadius: '12px',
            marginBottom: '15px',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          }}
        >
          {job.photoUrl || job.image ? (
            <img src={job.photoUrl || job.image} alt="job" style={{ width: '100%', height: '240px', objectFit: 'cover' }} />
          ) : (
            <div
              style={{
                background: '#eee',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#888',
                fontSize: '13px',
              }}
            >
              No photo - Old job (Delete it)
            </div>
          )}

          <div style={{ padding: '15px' }}>
            <h3 style={{ margin: 0 }}>{job.category || job.title}</h3>
            <p style={{ fontSize: '14px', margin: '8px 0', color: '#333' }}>{job.description}</p>
            <p style={{ color: '#5a31f5', fontWeight: 'bold', margin: '8px 0' }}>
              ₦{Number(job.budget).toLocaleString()} - {job.customerName || 'User'} - {job.location}
            </p>

            <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
              <button
                onClick={() => {
                  const text = `Hello, I want to apply for your ${job.category} job in ${job.location}. Budget ₦${job.budget}. I saw it on CraftSure!`;
                  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                }}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: '#00aa00',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                🔨 Apply via WhatsApp
              </button>

              <button
                onClick={() => deleteJob(job._id)}
                style={{
                  padding: '12px 16px',
                  background: '#ff3b30',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                🗑️
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
          }
