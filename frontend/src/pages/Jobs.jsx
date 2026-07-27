import { useState, useEffect } from 'react';

const API_URL = 'https://craftsure-1.onrender.com/api/jobs';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [location, setLocation] = useState('Makurdi, Benue');
  const [category, setCategory] = useState('Plumbing');
  const [customCategory, setCustomCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchJobs = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      if (Array.isArray(data)) setJobs(data);
      else if (data.jobs) setJobs(data.jobs);
    } catch (err) {
      console.log('Fetch error:', err.message);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handlePostJob = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login first!');
      window.location.href = '/login';
      return;
    }
    if (!title ||!description ||!budget) {
      alert('Fill Title, Description and Budget');
      return;
    }

    // Use custom job if Other is selected
    const finalCategory = category === 'Other'? customCategory.trim() : category;

    if (category === 'Other' &&!customCategory.trim()) {
      alert('Please type your job type in "Other job" box');
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
          category: finalCategory
        })
      });

      const data = await res.json();
      if (res.ok) {
        alert(`Job posted! ✅ Category: ${finalCategory}`);
        setTitle(''); setDescription(''); setBudget(''); setCustomCategory('');
        setCategory('Plumbing');
        fetchJobs();
      } else {
        const errorMsg = data.errors? data.errors[0].msg : data.msg || 'Failed';
        alert(errorMsg);
      }
    } catch (err) {
      alert('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold' }}>Jobs - Nigeria Marketplace</h1>
      <p style={{ color: '#666' }}>Select a job or choose Other to write your own</p>

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

          {/* CATEGORY SELECT WITH OTHER OPTION */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ width: '100%', padding: '12px', margin: '8px 0', borderRadius: '6px', border: '1px solid #ccc', fontWeight: 'bold' }}
          >
            <option>Plumbing</option>
            <option>Electrical</option>
            <option>Carpentry</option>
            <option>Painting</option>
            <option>Tailoring / Fashion Design</option>
            <option>Hair Dressing / Barbing</option>
            <option>Mechanic / Vulcanizer</option>
            <option>Cleaning / Laundry</option>
            <option>Bricklaying / Tiling</option>
            <option>Welding / Fabrication</option>
            <option>Catering / Baking</option>
            <option>Photography / Videography</option>
            <option>Makeup Artist</option>
            <option>Phone Repair / Laptop Repair</option>
            <option>Other - Type Your Own Job 👇</option>
          </select>

          {/* SHOW THIS ONLY IF OTHER IS SELECTED */}
          {category === 'Other - Type Your Own Job 👇' || category === 'Other'? (
            <input
              type="text"
              placeholder="Type your job here e.g. Shoe Making, Farming, POP Ceiling..."
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              style={{ width: '100%', padding: '12px', margin: '8px 0', borderRadius: '6px', border: '2px solid #5a31f5', background: '#fffbe6' }}
              required
            />
          ) : null}

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
            style={{ width: '100%', padding: '14px', background: '#5a31f5', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold' }}
          >
            {loading? 'Posting...' : `Post Job - ₦${budget || '0'}`}
          </button>

          {category.includes('Other') && customCategory && (
            <p style={{ color: 'green', marginTop: '8px' }}>Posting as: <b>{customCategory}</b></p>
          )}
        </form>
      </div>

      <div style={{ marginTop: '30px' }}>
        <h2>All Jobs ({jobs.length})</h2>
        {jobs.map((job) => (
          <div key={job._id} style={{ border: '1px solid #eee', padding: '15px', borderRadius: '8px', marginBottom: '10px', background: 'white' }}>
            <h3 style={{ margin: '0 0 5px 0' }}>{job.title}</h3>
            <p style={{ margin: '5px 0', color: '#555' }}>{job.description}</p>
            <p style={{ fontWeight: 'bold', color: '#5a31f5' }}>₦{job.budget?.toLocaleString()} - {job.category} - {job.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
