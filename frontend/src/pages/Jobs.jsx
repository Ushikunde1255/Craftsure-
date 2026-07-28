import { useEffect, useState } from 'react';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const loadJobs = async () => {
    const res = await fetch('https://craftsure-1.onrender.com/api/jobs');
    const data = await res.json();
    setJobs(data);
  };

  useEffect(() => { loadJobs(); }, []);

  const applyWhatsApp = (job) => {
    const phone = job.customerPhone || '234';
    const msg = `Hello, I saw your job on CraftSure: ${job.title} - ${job.budget}`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const deleteJob = async (id) => {
    if(!confirm('Delete this job?')) return;
    const token = localStorage.getItem('token');
    const res = await fetch(`https://craftsure-1.onrender.com/api/jobs/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if(res.ok) loadJobs();
    else alert('Failed to delete - backend error');
  };

  return (
    <div style={{ padding: '15px', background: '#f5f5f5', minHeight: '100vh' }}>
      <h2 style={{ color: '#5a31f5' }}>All Jobs - {jobs.length}</h2>
      <div style={{ display: 'grid', gap: '15px' }}>
        {jobs.map(job => (
          <div key={job._id} style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <img src={job.photoUrl || job.image} style={{ width: '100%', height: '200px', objectFit: 'cover' }} alt="" />
            <div style={{ padding: '15px' }}>
              <h4 style={{ margin: 0 }}>₦{job.budget?.toLocaleString()} - {job.customerName} - {job.location}</h4>
              <p style={{ fontSize: '14px' }}>{job.description}</p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => applyWhatsApp(job)} style={{ flex: 1, background: '#25D366', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold' }}>WhatsApp</button>
                {user && (
                  <button onClick={() => deleteJob(job._id)} style={{ background: '#ff4444', color: 'white', border: 'none', padding: '12px 16px', borderRadius: '8px' }}>🗑️</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
