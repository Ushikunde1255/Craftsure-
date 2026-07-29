import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  useEffect(() => {
    fetch('https://craftsure-1.onrender.com/api/jobs')
      .then(r => r.json())
      .then(d => {
        console.log('JOBS FROM BACKEND:', d);
        setJobs(Array.isArray(d) ? d : []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const applyWhatsApp = (job) => {
    const phone = (job.customerPhone || job.phone || '233').replace(/\D/g, '');
    const msg = `Hello ${job.customerName || 'Sir'}, I saw your job on CraftSure: ${job.title} Budget ₦${job.budget}`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const deleteJob = async (id) => {
    if (!confirm('Delete this job?')) return;
    const token = localStorage.getItem('token');
    await fetch(`https://craftsure-1.onrender.com/api/jobs/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    setJobs(jobs.filter(j => j._id !== id));
  };

  if (loading) return <div style={{ padding: '20px' }}>Loading jobs from Ghana & Nigeria...</div>;

  return (
    <div style={{ padding: '15px', background: '#f5f7fb', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ color: '#5a31f5' }}>All Jobs - {jobs.length}</h2>
        <Link to="/post" style={{ background: '#5a31f5', color: 'white', padding: '8px 16px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>+ Post Job</Link>
      </div>

      {jobs.length === 0 && (
        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', marginTop: '15px', textAlign: 'center' }}>
          No jobs found in frontend but backend has jobs!<br/>
          Check console. <br/><br/>
          <button onClick={() => window.location.reload()} style={{ background: '#5a31f5', color: 'white', padding: '10px 20px', borderRadius: '8px', border: 'none' }}>Reload</button>
        </div>
      )}

      <div style={{ display: 'grid', gap: '16px', marginTop: '15px' }}>
        {jobs.map(job => (
          <div key={job._id} style={{ background: 'white', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
            {job.photoUrl && <img src={job.photoUrl} style={{ width: '100%', height: '220px', objectFit: 'cover' }} alt={job.title} />}
            {!job.photoUrl && job.image && <img src={job.image} style={{ width: '100%', height: '220px', objectFit: 'cover' }} alt="" />}
            <div style={{ padding: '14px' }}>
              <h4 style={{ margin: '0 0 5px' }}>₦{job.budget} - {job.customerName || job.user?.name || 'Client'} - {job.location}</h4>
              <p style={{ fontSize: '14px', margin: '0 0 10px' }}><b>{job.title}</b> - {job.description}</p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => applyWhatsApp(job)} style={{ flex: 1, background: '#25D366', color: 'white', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: 'bold' }}>WhatsApp Client</button>
                {user && <button onClick={() => deleteJob(job._id)} style={{ background: '#ff3b30', color: 'white', border: 'none', padding: '12px 16px', borderRadius: '10px' }}>🗑️</button>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
            }
