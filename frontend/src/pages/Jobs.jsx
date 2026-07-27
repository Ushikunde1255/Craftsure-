import { useState, useEffect } from 'react';

const API_URL = 'https://craftsure-1.onrender.com/api/jobs';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [location, setLocation] = useState('Makurdi, Benue');
  const [category, setCategory] = useState('Plumbing');
  const [loading, setLoading] = useState(false);

  // Fetch all jobs
  const fetchJobs = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      if (Array.isArray(data)) {
        setJobs(data);
      } else if (data.jobs) {
        setJobs(data.jobs);
      }
    } catch (err) {
      console.log('Fetch jobs error:', err.message);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Post new job - FIXED! This was calling /auth/register before
  const handlePostJob = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login first! Go to Login page');
      window.location.href = '/login';
      return;
    }

    if (!title ||!description ||!budget) {
      alert('Please fill Title, Description and Budget');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          budget: Number(budget),
          location: location,
          category: category
        })
      });

      const data = await res.json();
      console.log('Post job response:', data);

      if (res.ok) {
        alert('Job posted successfully! ✅');
        setTitle('');
        setDescription('');
        setBudget('');
        fetchJobs(); // Refresh list
      } else {
        // Show real backend error
        const errorMsg = data.errors? data.errors[0].msg : data.msg || data.message || 'Failed to post job';
        alert(errorMsg);
      }
    } catch (err) {
      alert('Network error: ' + err.message);
      console.log('Post error:', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold' }}>Jobs - Nigeria Marketplace</h1>
      <p style={{ color: '#666' }}>Post a job and connect with verified artisans in Nigeria</p>

      {/* POST JOB FORM */}
      <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '10px', marginTop: '20px', background: '#f9f9ff' }}>
        <h2>Post a New Job</h2>
        <form onSubmit={handlePostJob}>
          <input
            type="text"
            placeholder="Job Title e.g. Fix leaking pipe in Makurdi"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: '100%', padding: '12px', margin: '8px 0', borderRadius: '6px', border: '1px solid #ccc' }}
            required
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ width: '100%', padding: '12px', margin: '8px 0', borderRadius: '6px', border: '1px solid #ccc' }}
          >
            <option>Plumbing</option>
            <option>Electrical</option>
            <option>Carpentry</option>
            <option>Painting</option>
            <option>Tailoring</option>
            <option>Hair Dressing</option>
            <option>Mechanic</option>
            <option>Cleaning</option>
          </select>

          <input
            type="text"
            placeholder="Location e.g. Makurdi, Benue"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={{ width: '100%', padding: '12px', margin: '8px 0', borderRadius: '6px', border: '1px solid #ccc' }}
          />

          <input
            type="number"
            placeholder="Budget in Naira e.g. 10000"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            style={{ width: '100%', padding: '12px', margin: '8px 0', borderRadius: '6px', border: '1px solid #ccc' }}
            required
          />

          <textarea
            placeholder="Describe the work in detail..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            style={{ width: '100%', padding: '12px', margin: '8px 0', borderRadius: '6px', border: '1px solid #ccc' }}
            required
          />

          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', padding: '14px', background: '#5a31f5', color:
