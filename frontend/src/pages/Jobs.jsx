import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  useEffect(() => {
    fetch('https://craftsure-1.onrender.com/api/jobs')
     .then(r=>r.json())
     .then(d=>setJobs(d))
     .catch(()=>setJobs([]));
  }, []);

  const applyWhatsApp = (job) => {
    const phone = (job.customerPhone || '2348012345678').replace(/\D/g,'');
    const msg = `Hello ${job.customerName}, I saw your job on CraftSure: ${job.title} Budget ₦${job.budget}`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`,'_blank');
  };

  const deleteJob = async (id) => {
    if(!confirm('Delete?')) return;
    const token = localStorage.getItem('token');
    await fetch(`https://craftsure-1.onrender.com/api/jobs/${id}`, { method:'DELETE', headers:{ Authorization:`Bearer ${token}` } });
    window.location.reload();
  };

  return (
    <div style={{ padding:'15px', background:'#f5f7fb', minHeight:'100vh' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <h2 style={{ color:'#5a31f5' }}>All Jobs - {jobs.length}</h2>
        <Link to="/post" style={{ background:'#5a31f5', color:'white', padding:'8px 16px', borderRadius:'8px', textDecoration:'none', fontWeight:'bold' }}>+ Post Job</Link>
      </div>
      <div style={{ display:'grid', gap:'16px', marginTop:'15px' }}>
        {jobs.map(job=>(
          <div key={job._id} style={{ background:'white', borderRadius:'14px', overflow:'hidden', boxShadow:'0 4px 12px rgba(0,0,0,0.08)' }}>
            <img src={job.photoUrl} style={{ width:'100%', height:'220px', objectFit:'cover' }} alt="" />
            <div style={{ padding:'14px' }}>
              <h4>₦{job.budget} - {job.customerName} - {job.location}</h4>
              <p style={{ fontSize:'14px' }}>{job.title} - {job.description}</p>
              <div style={{ display:'flex', gap:'10px' }}>
                <button onClick={()=>applyWhatsApp(job)} style={{ flex:1, background:'#25D366', color:'white', border:'none', padding:'12px', borderRadius:'10px', fontWeight:'bold' }}>WhatsApp</button>
                {user && <button onClick={()=>deleteJob(job._id)} style={{ background:'#ff3b30', color:'white', border:'none', padding:'12px 16px', borderRadius:'10px' }}>🗑️</button>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
